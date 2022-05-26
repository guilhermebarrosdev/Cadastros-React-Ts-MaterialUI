import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from '@unform/web';

import { FerramentasDeDetalhes } from '../../shared/components';
import { VTextField } from '../../shared/forms';
import { LayoutBasePage } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoaService';
import { FormHandles } from '@unform/core';

interface IFormData {
  nomeCompleto: string;
  cidadeId: number;
  email: string;
}

export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);
      PessoasService.getById(+id).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate('/pessoas');
        } else {
          setName(result.nomeCompleto);
          formRef.current?.setData(result);
        }
      });
    }
  }, [id]);

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      PessoasService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('Registro apagado com sucesso!');
          navigate('/pessoas');
        }
      });
    }
  };

  const handleSave = (dados: IFormData) => {
    setIsLoading(true);
    if (id === 'nova') {
      PessoasService.create(dados).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          navigate(`/pessoa/detalhe/${result}`);
        }
      });
    } else {
      PessoasService.updateById(+id, { id: +id, ...dados }).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        }
      });
    }
  };

  return (
    <LayoutBasePage
      titulo={id === 'nova' ? 'Nova Pessoa' : name}
      barraDeFerramentas={
        <FerramentasDeDetalhes
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoApagar={id !== 'nova'}
          mostrarBotaoNovo={id !== 'nova'}
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
          aoClicarEmApagar={() => handleDelete(+id)}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
          aoClicarEmVoltar={() => navigate('/pessoas')}
        />
      }
    >
      <Form ref={formRef} onSubmit={handleSave}>
        <VTextField placeholder="Nome Completo" name="nomeCompleto" />
        <VTextField placeholder="Email" name="email" />
        <VTextField placeholder="Cidade" name="cidadeId" />

        {/* {['casa', 'trabalho', 'outro'].map((_, index) => (
          <Scope key="" path={`endereco[${index}]`}>
            <VTextField name="rua" />
            <VTextField name="numero" />
            <VTextField name="estado" />
            <VTextField name="cidade" />
            <VTextField name="pais" />
          </Scope>
        ))} */}
      </Form>
    </LayoutBasePage>
  );
};
