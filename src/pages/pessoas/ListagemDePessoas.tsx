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
} from '@mui/material';

import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import { useDebounce } from '../../shared/hooks';
import {
  IListagemPessoa,
  PessoasServices,
} from '../../shared/services/api/pessoas/PessoaService';

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
      PessoasServices.getAll(1, busca).then((result) => {
        setLoading(false);
        if (result instanceof Error) alert(result.message);
        else {
          setRows(result.data);
          setTotalCount(result.totalCount);
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
          </Table>
        </TableContainer>
      </LayoutBasePage>
    </>
  );
};
