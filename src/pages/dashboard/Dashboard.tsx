import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts/LayoutBasePage';

export const Dashboard: React.FC = () => {
  return (
    <LayoutBasePage
      titulo="Página inicial"
      barraDeFerramentas={
        <FerramentasDaListagem mostrarInputBusca textoBotaoNovo="Nova" />
      }
    >
      Testando
    </LayoutBasePage>
  );
};
