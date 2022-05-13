import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material';

interface IBarraDeFerramentasProps {
  textoDaBusca?: string;
  mostrarInputBusca?: boolean;
  aoMudarTextoDaBusca?: (novoTexto: string) => void;
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarEmNovo?: () => void;
}

export const BarraDeFerramentas: React.FC<IBarraDeFerramentasProps> = ({
  aoMudarTextoDaBusca,
  textoDaBusca = '',
  mostrarInputBusca = false,
  textoBotaoNovo = 'Novo',
  mostrarBotaoNovo = true,
  aoClicarEmNovo,
}) => {
  const theme = useTheme();

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
      justifyContent="space-between"
    >
      {mostrarInputBusca && (
        <TextField
          size="small"
          placeholder="Pesquisar..."
          value={textoDaBusca}
          onChange={(event) => aoMudarTextoDaBusca?.(event.target.value)}
        />
      )}
      {mostrarBotaoNovo && (
        <Button
          variant="contained"
          onClick={aoClicarEmNovo}
          disableElevation
          endIcon={<Icon>add</Icon>}
        >
          {textoBotaoNovo}
        </Button>
      )}
    </Box>
  );
};
