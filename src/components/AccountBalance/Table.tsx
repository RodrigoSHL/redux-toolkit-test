import React, {useState} from 'react';
import {DataGrid,  esES,  GridCellEditCommitParams} from '@mui/x-data-grid';
import {Alert, AlertProps, Paper, Typography} from '@mui/material';
import Input from './Input';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import styles from "./AccountBalance.module.css";
import config from '../../config';

const api_rest = config['api_sql_url'];

const Table = () => {
  const [clacomsList, setClacomsList] = useState<any>([]);
  const [clacomsFilterList, setClacomsFilterList] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);

  const columns = [
    {
      field: 'nameClacom',
      headerName: 'Descripción',
      width: 300,
    },
    {
      field: 'codeClacom',
      headerName: 'Clacom',
      width: 230,
    },
    {
      field: 'factorValue',
      headerName: 'Factor',
      type: 'number',
      editable: true,
      width: 230,
    },
  ];

  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleCellEditCommit = React.useCallback(
    async (params: GridCellEditCommitParams) => {
      try {
        const objFactor = {
          factorValue: params.value,
        };
        const url = `${api_rest}/api/prv-factor/${params.id}`;
        await axios
          .put(url, objFactor)
          .then((response) => {
            setSnackbar({
              children: 'Factor editado correctamente',
              severity: 'success',
            });
          })
          .catch((error) => {
            setSnackbar({
              children: error.message,
              severity: 'error',
            });
          });
        clacomsList((prev:any) => prev.map((row:any) => (row.id === params.id ? {...row} : row)));
      } catch (error) {
        clacomsList((prev:any) => [...prev]);
      }
    },
    []
  );

  return (
    <Paper className={styles.content}>
      <div className={styles.toolbar}>
        <Typography variant="h6" component="h2" color="primary">
          Saldo Contable
        </Typography>
      </div>
      <div className={styles.toolbar}>
        <Input
          clacomsList={clacomsList}
          setClacomsList={setClacomsList}
          setClacomsFilterList={setClacomsFilterList}
          setFilterApplied={setFilterApplied}
        />
      </div>
      <div style={{height: '60vh', width: '100%'}}>
        <DataGrid
          rows={filterApplied ? clacomsFilterList : clacomsList}
          columns={columns}
          onCellEditCommit={handleCellEditCommit}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
        {!!snackbar && (
          <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={3000}>
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </div>
    </Paper>
  );
};

export default Table;
