import React, {useEffect, useState} from 'react';
import {DataGrid, GridValueGetterParams, esES} from '@mui/x-data-grid';
import {Box, Typography} from '@mui/material';
//Slice
import styles from "../Maintainers.module.css";
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getAllBranchOffice, selectParam } from '../../../features/param/paramSlice';

const columns = [
  {
    field: 'idBranchOffice',
    headerName: 'ID',
    width: 240,
  },
  {
    field: 'nameBranchOffice',
    headerName: 'Nombre',
    width: 240,
  },
  {
    field: 'stateBranchOffice',
    headerName: 'Estado',
    width: 240,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.stateBranchOffice ? 'Activado' : 'Desactivado',
  },
];

const Table = () => {
  const dispatch = useAppDispatch();
  const [branchOfficeList, setBranchOfficeList] = useState([]);
  //Store
  const {listAllBranchOffice: BRANCH_OFFICE} = useAppSelector(selectParam);

  useEffect(() => {
    setBranchOfficeList(BRANCH_OFFICE);
  }, [BRANCH_OFFICE]);

  useEffect(() => {
    dispatch(getAllBranchOffice());
  }, [dispatch]);

  return (
    <>
      <Box className={styles.toolbar}>
        <Typography variant="h6" component="h2" color="primary">
          Lista de Tiendas
        </Typography>
      </Box>

      <Box style={{height: '60vh', width: '100%'}}>
        <DataGrid
          getRowId={(row) => row.idBranchOffice}
          rows={branchOfficeList}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
    </>
  );
};
export default Table;
