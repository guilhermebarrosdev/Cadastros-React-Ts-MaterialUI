import { FerramentasDeDetalhes } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts/LayoutBasePage';

export const Dashboard: React.FC = () => {
  return (
    <LayoutBasePage
      titulo="Página inicial"
      barraDeFerramentas={
        <FerramentasDeDetalhes
          mostrarBotaoNovo
          mostrarBotaoSalvarEFechar
          mostrarBotaoSalvarEFecharCarregando
        />
      }
    >
      Testando
    </LayoutBasePage>
  );
};
