import React, {useState} from 'react';
import {
  DataGrid,
  esES,
  GridColDef,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import {Paper, Typography, LinearProgress, Box} from '@mui/material';
import Filter from './Filter';
import moment from 'moment';
import styles from "./Resume.module.css";


const columns: GridColDef[] = [
  {
    field: 'date',
    headerName: 'Fecha',
    width: 250,
    valueGetter: (params: GridValueGetterParams) =>
      moment(`${params.row.date || ''}`).format('DD-MM-YYYY'),
  },
  {
    field: 'store',
    headerName: 'Tienda',
    width: 250,
  },
  {
    field: 'saleAmount',
    headerName: 'Monto de venta',
    type: 'number',
    width: 150,
  },
  {
    field: 'prvAmount',
    headerName: 'Valor de provisión',
    type: 'number',
    width: 150,
  },
];

const Table = () => {
  const [resumeDataList, setResumeDataList] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);

  return (
    <Paper className={styles.content}>
      <Box className={styles.toolbar}>
        <Typography variant="h6" component="h2" color="primary">
          Resumen de Acortamiento
        </Typography>
      </Box>
      <Box className={styles.toolbar}>
        <Filter
          setResumeDataList={setResumeDataList}
          setFilterApplied={setFilterApplied}
        />
      </Box>
      <Box style={{height: '60vh', width: '100%'}}>
        <DataGrid
          rows={filterApplied ? resumeDataList : []}
          columns={columns}
          density="compact"
          getRowId={(row) => row.date}
          components={{
            LoadingOverlay: LinearProgress,
          }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
    </Paper>
  );
};
export default Table;
