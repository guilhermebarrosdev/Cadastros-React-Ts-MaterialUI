import { useNavigate, useParams } from 'react-router-dom';

import { FerramentasDeDetalhes } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';

export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  return (
    <LayoutBasePage
      titulo="Detalhe de pessoas"
      barraDeFerramentas={
        <FerramentasDeDetalhes
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoApagar={id !== 'nova'}
          mostrarBotaoNovo={id !== 'nova'}
          aoClicarEmSalvar={() => {}}
          aoClicarEmSalvarEFechar={() => {}}
          aoClicarEmApagar={() => {}}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
          aoClicarEmVoltar={() => navigate('/pessoas')}
        />
      }
    >
      <p>DetalheDePessoas {id}</p>
    </LayoutBasePage>
  );
};
