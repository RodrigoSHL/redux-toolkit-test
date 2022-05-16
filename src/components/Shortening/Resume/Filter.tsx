import React, {useEffect, useState} from 'react';

//Mui Material-Style
import {Button, Grid, MenuItem, TextField, InputAdornment, Box} from '@mui/material';
//Mui Icon
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CancelIcon from '@mui/icons-material/Cancel';
//Mui Calendar
import {DatePicker, LocalizationProvider} from '@mui/lab';
import AdapterMoment from '@mui/lab/AdapterMoment';
import MomentUtils from '@date-io/moment';
import 'moment/locale/es';
//Slice


import styles from "./Resume.module.css";
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {getResumeDataByParameters, selectShortening } from '../../../features/shortening/shorteningSlice';
import {
  getAllCountries,
  getAllBusinessUnit,
  getAllBranchOffice,
  selectParam,
} from '../../../features/param/paramSlice';

const Filter = ({setResumeDataList, setFilterApplied}:any) => {
  const dispatch = useAppDispatch();

  const [filterObject, setFilterObject] = useState<any>({
    country: '',
    businessUnit: '',
    branchOffice: '',
    date: {},
  });

  const [countryList, setCountryList] = useState<any>([]);
  const [buList, setBuList] = useState<any>([]);
  const [boList, setBoList] = useState<any>([]);
  const [countryIdSelect, setCountryIdSelect] = useState('');
  const [businessUnitIdSelect, setBusinessUnitIdSelect] = useState('');
  const [branchOfficeIdSelect, setBranchOfficeIdSelect] = useState('');

  const [valueInitialDate, setValueInitialDate] = useState<Date | null>(new Date());
  const [openInitialDate, setOpenInitialDate] = useState(false);

  //Store
  const {
    listAllCountry: COUNTRIES,
    listAllBusinessUnit: BUSINESS_UNIT,
    listAllBranchOffice: BRANCH_OFFICE,
  } = useAppSelector(selectParam);

  const {
    listShorteningResumeData: RESUME_DATA
  } = useAppSelector(selectShortening);

  const cleanFilter = () => {
    setFilterApplied(false);
    setCountryIdSelect('');
    setBusinessUnitIdSelect('');
    setBranchOfficeIdSelect('');
    setValueInitialDate(null);
  };

  const transformDateToString = (dateSelected: any) => {
    let month = dateSelected._d.getUTCMonth() + 1; //months from 1-12
    let day = dateSelected._d.getUTCDate();
    let year = dateSelected._d.getUTCFullYear();
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    return year + '-' + month + '-' + day;
  };

  const filterTable = async (e:any) => {
    e.preventDefault();
    // const dateParse = transformDateToString(valueInitialDate);
    // filterObject.country = countryIdSelect;
    // filterObject.businessUnit = businessUnitIdSelect;
    // filterObject.branchOffice = branchOfficeIdSelect;
    // filterObject.date = dateParse;
    filterObject.country = 'CL';
    filterObject.businessUnit = 'IKS';
    filterObject.branchOffice = '637';
    filterObject.date = '2022-04-06';
    setFilterApplied(true);
    dispatch(getResumeDataByParameters(filterObject));
  };

  useEffect(() => {
    setCountryList(COUNTRIES);
  }, [COUNTRIES]);

  useEffect(() => {
    setBuList(BUSINESS_UNIT);
  }, [BUSINESS_UNIT]);

  useEffect(() => {
    setBoList(BRANCH_OFFICE);
  }, [BRANCH_OFFICE]);

  useEffect(() => {
    setResumeDataList(RESUME_DATA || []);
  }, [RESUME_DATA]);

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getAllBusinessUnit());
    dispatch(getAllBranchOffice());
  }, [dispatch]);

  const handleChangeCountry = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let idCountry: string = event.target.value;
    setCountryIdSelect(idCountry);
  };

  const handleChangeBusinessUnit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let idBusinessUnit: string = event.target.value;
    setBusinessUnitIdSelect(idBusinessUnit);
  };

  const handleChangeBranchOffice = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let idBranchOffice: string = event.target.value;
    setBranchOfficeIdSelect(idBranchOffice);
  };

  return (
    <Grid className={styles.toolbar} container spacing={2}>
      <Grid item xs={12} md={3}>
        <TextField
          id="outlined-basic"
          label="Seleccione País"
          variant="outlined"
          fullWidth
          select
          size="small"
          name="idCountry"
          onChange={handleChangeCountry}
          value={countryIdSelect}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilterAltIcon />
              </InputAdornment>
            ),
          }}>
          {countryList.map((option:any) => (
            <MenuItem key={option.idCountry} value={option.codeCountry}>
              {option.nameCountry} - ({option.codeCountry})
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          id="outlined-basic"
          label="Seleccione Unidad de Negocio"
          variant="outlined"
          fullWidth
          select
          size="small"
          name="idBusinessUnit"
          onChange={handleChangeBusinessUnit}
          value={businessUnitIdSelect}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilterAltIcon />
              </InputAdornment>
            ),
          }}>
          {buList.map((option:any) => (
            <MenuItem key={option.idBusinessUnit} value={option.codeBusinessUnit}>
              {option.nameBusinessUnit} - ({option.codeBusinessUnit})
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          id="outlined-basic"
          label="Seleccione Sucursal"
          variant="outlined"
          fullWidth
          select
          size="small"
          name="idBranchOffice"
          onChange={handleChangeBranchOffice}
          value={branchOfficeIdSelect}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilterAltIcon />
              </InputAdornment>
            ),
          }}>
          {boList.map((option:any) => (
            <MenuItem key={option.idBranchOffice} value={option.nameBranchOffice}>
              {option.nameBranchOffice}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} md={3}>
        <LocalizationProvider dateAdapter={AdapterMoment} locale="es" utils={MomentUtils}>
          <DatePicker
            views={['year', 'month']}
            open={openInitialDate}
            onOpen={() => setOpenInitialDate(true)}
            onClose={() => setOpenInitialDate(false)}
            label="Seleccione Período"
            value={valueInitialDate}
            onChange={(newValue) => {
              setValueInitialDate(newValue);
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  size="small"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onClick={() => setOpenInitialDate(true)}
                />
              );
            }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} md={12}>
        <Box className={styles.filter}>
          <Button
            onClick={filterTable}
            color="primary"
            variant="contained"
            sx={{borderRadius: 8, minWidth: '110px'}}
            startIcon={<SearchIcon />}>
            Buscar
          </Button>

          <Button
            onClick={cleanFilter}
            color="primary"
            variant="outlined"
            sx={{borderRadius: 8, minWidth: '110px', ml: 1}}
            startIcon={<CancelIcon />}>
            Limpiar
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Filter;
