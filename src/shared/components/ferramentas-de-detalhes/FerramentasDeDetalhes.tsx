import { Box, Button, Divider, Icon, Paper, useTheme } from '@mui/material';

export const FerramentasDeDetalhes: React.FC = () => {
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
      <Button
        variant="contained"
        disableElevation
        startIcon={<Icon>save</Icon>}
      >
        Salvar
      </Button>
      <Button variant="outlined" disableElevation startIcon={<Icon>save</Icon>}>
        Salvar e voltar
      </Button>
      <Button
        variant="outlined"
        disableElevation
        startIcon={<Icon>delete</Icon>}
      >
        Apagar
      </Button>
      <Button variant="outlined" disableElevation startIcon={<Icon>add</Icon>}>
        Novo
      </Button>

      <Divider variant="middle" orientation="vertical" />

      <Button
        variant="outlined"
        disableElevation
        startIcon={<Icon>arrow_back</Icon>}
      >
        Voltar
      </Button>
    </Box>
  );
};
