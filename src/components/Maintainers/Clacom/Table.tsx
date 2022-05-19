import React, {useEffect, useState} from 'react';
import {DataGrid, GridValueGetterParams, esES} from '@mui/x-data-grid';
import {Box, Typography} from '@mui/material';
//Slice
import styles from "../Maintainers.module.css";
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getAllClacom, selectParam } from '../../../features/param/paramSlice';

const columns = [
  {
    field: 'idClacom',
    headerName: 'ID',
    width: 240,
  },
  {
    field: 'nameClacom',
    headerName: 'Nombre',
    width: 240,
  },
  {
    field: 'codeClacom',
    headerName: 'Código',
    width: 240,
  },
  {
    field: 'stateClacom',
    headerName: 'Estado',
    width: 240,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.stateClacom ? 'Activado' : 'Desactivado',
  },
];

const Table = () => {
  const dispatch = useAppDispatch();
  const [clacomList, setClacomList] = useState([]);
  //Store
  const {listAllClacom: CLACOMS} = useAppSelector(selectParam);

  useEffect(() => {
    setClacomList(CLACOMS);
  }, [CLACOMS]);

  useEffect(() => {
    dispatch(getAllClacom());
  }, [dispatch]);

  return (
    <>
      <Box className={styles.toolbar}>
        <Typography variant="h6" component="h2" color="primary">
          Lista de CLACOM
        </Typography>
      </Box>

      <Box style={{height: '60vh', width: '100%'}}>
        <DataGrid
          getRowId={(row) => row.idCountry}
          rows={clacomList}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
    </>
  );
};
export default Table;
