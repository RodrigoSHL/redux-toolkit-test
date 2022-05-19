import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DataGrid, GridValueGetterParams, esES} from '@mui/x-data-grid';
import {Box, Typography} from '@mui/material';
//Slice
import styles from "../Maintainers.module.css";
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getAllCountries, selectParam } from '../../../features/param/paramSlice';

const columns = [
  {
    field: 'idCountry',
    headerName: 'ID',
    width: 240,
  },
  {
    field: 'nameCountry',
    headerName: 'Nombre',
    width: 240,
  },
  {
    field: 'codeCountry',
    headerName: 'Código de país',
    width: 240,
  },
  {
    field: 'stateCountry',
    headerName: 'Estado país',
    width: 240,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.stateCountry ? 'Activado' : 'Desactivado',
  },
];

const Table = () => {
  const dispatch = useAppDispatch();
  const [countryList, setCountryList] = useState([]);
  //Store
  const {listAllCountry: COUNTRIES} = useAppSelector(selectParam);

  useEffect(() => {
    setCountryList(COUNTRIES);
  }, [COUNTRIES]);

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  return (
    <>
      <Box className={styles.toolbar}>
        <Typography variant="h6" component="h2" color="primary">
          Lista de Países
        </Typography>
      </Box>
      <Box style={{height: '60vh', width: '100%'}}>
        <DataGrid
          getRowId={(row) => row.idCountry}
          rows={countryList}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
    </>
  );
};
export default Table;
