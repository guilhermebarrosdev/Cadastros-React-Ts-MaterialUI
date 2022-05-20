import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableFooter,
  LinearProgress,
} from '@mui/material';

import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import { useDebounce } from '../../shared/hooks';
import {
  IListagemPessoa,
  PessoasService,
} from '../../shared/services/api/pessoas/PessoaService';
import { environment } from '../../shared/environments';

export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const [rows, setRows] = useState<IListagemPessoa[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);

    debounce(() => {
      PessoasService.getAll(1, busca).then((result) => {
        setLoading(false);
        if (result instanceof Error) alert(result.message);
        else {
          setTotalCount(result.totalCount);
          setRows(result.data);
          console.log(result);
        }
      });
    });
  }, [busca]);

  return (
    <>
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
      >
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ m: 1, width: 'auto' }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ações</TableCell>
                <TableCell>Nome completo</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>Ações</TableCell>
                  <TableCell>{row.nomeCompleto}</TableCell>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>

            {totalCount === 0 && !loading && (
              <caption>{environment.LISTAGEM_VAZIA}</caption>
            )}

            <TableFooter>
              {loading && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <LinearProgress variant="indeterminate" />
                  </TableCell>
                </TableRow>
              )}
            </TableFooter>
          </Table>
        </TableContainer>
      </LayoutBasePage>
    </>
  );
};
