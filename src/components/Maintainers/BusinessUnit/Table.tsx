import React, {useEffect, useState} from 'react';
import {DataGrid, GridValueGetterParams, esES} from '@mui/x-data-grid';
import {Box, Typography} from '@mui/material';
//Slice
import styles from "../Maintainers.module.css";
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getAllBusinessUnit, selectParam } from '../../../features/param/paramSlice';

const columns = [
  {
    field: 'idBusinessUnit',
    headerName: 'ID',
    width: 240,
  },
  {
    field: 'nameBusinessUnit',
    headerName: 'Nombre',
    width: 240,
  },
  {
    field: 'codeBusinessUnit',
    headerName: 'Código',
    width: 240,
  },
  {
    field: 'stateBusinessUnit',
    headerName: 'Estado país',
    width: 240,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.stateBusinessUnit ? 'Activado' : 'Desactivado',
  },
];

const Table = () => {
  const dispatch = useAppDispatch();
  const [businessUnitList, setBusinessUnitList] = useState([]);
  //Store
  const {listAllBusinessUnit: BRANCH_OFFICE} = useAppSelector(selectParam);

  useEffect(() => {
    setBusinessUnitList(BRANCH_OFFICE);
  }, [BRANCH_OFFICE]);

  useEffect(() => {
    dispatch(getAllBusinessUnit());
  }, [dispatch]);

  return (
    <>
      <Box className={styles.toolbar}>
        <Typography variant="h6" component="h2" color="primary">
          Lista de Unidades de Negocio
        </Typography>
      </Box>

      <Box style={{height: '60vh', width: '100%'}}>
        <DataGrid
          getRowId={(row) => row.idBusinessUnit}
          rows={businessUnitList}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
    </>
  );
};
export default Table;
