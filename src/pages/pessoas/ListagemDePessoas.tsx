import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import { PessoasServices } from '../../shared/services/api/pessoas/PessoaService';

export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    PessoasServices.getAll(1, busca).then((result) => {
      if (result instanceof Error) alert(result.message);
      else console.log(result);
    });
  }, [busca]);

  return (
    <LayoutBasePage
      titulo="Listagem de pessoas"
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoBotaoNovo="Nova"
          textoDaBusca={busca}
          aoMudarTextoDaBusca={(texto) =>
            setSearchParams({ busca: texto }, { replace: true })
          }
        />
      }
      // eslint-disable-next-line react/no-children-prop
      children={undefined}
    ></LayoutBasePage>
  );
};
