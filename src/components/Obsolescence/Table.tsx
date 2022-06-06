import React, {useState} from 'react';
import {DataGrid, GridCellEditCommitParams, esES} from '@mui/x-data-grid';
import {Alert, AlertProps, Box, Paper, Typography} from '@mui/material';
import Filters from './Filters';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import styles from "./Obsolescence.module.css";
import config from '../../config';


const api_rest = config['api_sql_url'];

const Table = () => {
  const [clacomsList, setClacomsList] = useState<any>([]);
  const [clacomsFilterList, setClacomsFilterList] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);

  const columns = [
    {
      field: 'nameClacom',
      headerName: 'Clacom',
      width: 150,
    },
    {
      field: 'descriptionClacom',
      headerName: 'Descripción',
      width: 210,
    },
    {
      field: 'baseValue',
      headerName: 'Base',
      width: 150,
    },
    {
      field: 'periodValue',
      headerName: 'Periodo',
      width: 150,
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
            console.log(response);
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
      <Box className={styles.toolbar}>
        <Typography variant="h6" component="h2" color="primary">
          Obsolecencia
        </Typography>
      </Box>
      <Box className={styles.toolbar}>
        <Filters
          clacomsList={clacomsList}
          setClacomsList={setClacomsList}
          clacomsFilterList={clacomsFilterList}
          setClacomsFilterList={setClacomsFilterList}
          filterApplied={filterApplied}
          setFilterApplied={setFilterApplied}
        />
      </Box>
      <Box style={{height: '60vh', width: '100%'}}>
        <DataGrid
          rows={filterApplied ? clacomsFilterList : clacomsList}
          columns={columns}
          checkboxSelection
          onCellEditCommit={handleCellEditCommit}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
        {!!snackbar && (
          <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={3000}>
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </Box>
    </Paper>
  );
};
export default Table;
