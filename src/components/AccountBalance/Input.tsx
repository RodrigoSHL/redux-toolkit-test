import React, {useEffect, useState} from 'react';

import {
  Button,
  Grid,
  MenuItem,
  TextField,
  Checkbox,
  Autocomplete,
  InputAdornment,
  Box,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import {DatePicker, LocalizationProvider} from '@mui/lab';
import AdapterMoment from '@mui/lab/AdapterMoment';
import MomentUtils from '@date-io/moment';
import styles from "./AccountBalance.module.css";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllCountries, selectShortening } from '../../features/shortening/shorteningSlice';
import { getDataAccountBalance, selectAccountBalance } from '../../features/accountBalance/accountBalanceSlice';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const clacomes = [
  {id: '1', clacom: '6011010001'},
  {id: '2', clacom: '6011010002'},
  {id: '3', clacom: '6011010006'},
  {id: '4', clacom: '6011010012'},
];

const Filters = ({
  clacomsList,
  setClacomsList,
  setClacomsFilterList,
  setFilterApplied,
}:any) => {
  const dispatch = useAppDispatch();

  const {listShorteningCountry: COUNTRIES} = useAppSelector(selectShortening);
  const {listDataAccountBalance: ACCOUNT_BALANCE} = useAppSelector(selectAccountBalance);

  const [selectedGLAccount, setSelectedGLAccount] = useState<any[]>([]);
  const [clacomList, setClacomList] = useState(clacomes);

  const [countryList, setCountryList] = useState<any>([]);

  const [valueMonth, setValueMonth] = useState<Date | null>(new Date());
  const [openMonth, setOpenMonth] = useState(false);

  const [valueYear, setValueYear] = useState<Date | null>(new Date());
  const [openYear, setOpenYear] = useState(false);

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  useEffect(() => {
    setCountryList(COUNTRIES);
  }, [COUNTRIES]);

  const [countryIdSelect, setCountryIdSelect] = useState('');

  const handleChangeCountry = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let idCountry: string = event.target.value;
    setCountryIdSelect(idCountry);
  };

  const cleanFilter = () => {
    setFilterApplied(false);
    setClacomList([]);
    setSelectedGLAccount([]);
    setCountryIdSelect('');
    setClacomsList([]);
  };

  const [inputRequest, setInputRequest] = useState({
    country: '',
    companyCode: '',
    monthYear: '',
    Ledger: '',
    currencyType: '',
    segment: '',
    glAccounts: {},
  });

  const ingresarValoresMemoria = (e:any) => {
    const {name, value} = e.target;
    setInputRequest((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const getOnlyMonth = (monthSelected: any) => {
    let month = monthSelected._d.getUTCMonth() + 1; //months from 1-12
    (month < 10) ? month = ('00' + month) : month = ('0' + month);
    return month
  };

  const getOnlyYear = (yearSelected: any) => {
    return yearSelected._d.getUTCFullYear()
  };

  const sendRequest = (e:any) => {
    e.preventDefault();
    const month = getOnlyMonth(valueMonth);
    const year = getOnlyYear(valueYear);
    const fullDate = month + '.' + year;
    const newObject = {
      country: 'CL',
      monthYear: fullDate,
      glAccounts: selectedGLAccount
    }
    dispatch(getDataAccountBalance(newObject))
    console.log('first', newObject);
  };

  return (
    <Grid className={styles.toolbar} container spacing={2}>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Seleccionar pais"
          variant="outlined"
          fullWidth
          select
          size="small"
          name="idBusinessUnit"
          onChange={handleChangeCountry}
          value={countryIdSelect}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilterAltIcon />
              </InputAdornment>
            ),
          }}>
          {countryList &&
            countryList.map((option:any) => (
              <MenuItem key={option.idCountry} value={option.idCountry}>
                {option.nameCountry} - ({option.codeCountry})
              </MenuItem>
            ))}
        </TextField>
      </Grid>
      <Grid item xs={12} md={4}>
        <LocalizationProvider dateAdapter={AdapterMoment} locale="es" utils={MomentUtils}>
          <DatePicker
            inputFormat="MMMM"
            views={['month']}
            open={openMonth}
            onOpen={() => setOpenMonth(true)}
            onClose={() => setOpenMonth(false)}
            label="Seleccione Mes"
            value={valueMonth}
            onChange={(newValue) => {
              setValueMonth(newValue);
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
                  onClick={() => setOpenMonth(true)}
                />
              );
            }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} md={4}>
        <LocalizationProvider dateAdapter={AdapterMoment} locale="es" utils={MomentUtils}>
          <DatePicker
            views={['year']}
            open={openYear}
            onOpen={() => setOpenYear(true)}
            onClose={() => setOpenYear(false)}
            label="Seleccione Año"
            value={valueYear}
            onChange={(newValue) => {
              setValueYear(newValue);
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
                  onClick={() => setOpenYear(true)}
                />
              );
            }}
          />
        </LocalizationProvider>
      </Grid>
      {/* <Grid item xs={12} md={3}>
        <TextField
          id="outlined-basic"
          label="Saldo contable"
          variant="outlined"
          size="small"
          fullWidth
          onChange={ingresarValoresMemoria}
          value={inputRequest.Ledger}
          name="Ledger"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          id="outlined-basic"
          label="Tipo de cambio"
          variant="outlined"
          size="small"
          fullWidth
          onChange={ingresarValoresMemoria}
          value={inputRequest.currencyType}
          name="currencyType"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          id="outlined-basic"
          label="Código empresa"
          variant="outlined"
          size="small"
          fullWidth
          onChange={ingresarValoresMemoria}
          value={inputRequest.segment}
          name="segment"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          id="outlined-basic"
          label="Segmento"
          variant="outlined"
          size="small"
          fullWidth
          onChange={ingresarValoresMemoria}
          value={inputRequest.companyCode}
          name="companyCode"   
        />
      </Grid> */}
      <Grid item xs={12} md={9}>
        <Box className={styles.filter}>
          <Autocomplete
            size="small"
            onChange={(e, value) => {
              setSelectedGLAccount(value);
            }}
            multiple
            id="checkboxes-tags-demo"
            options={clacomes}
            disableCloseOnSelect
            getOptionLabel={(option) => option.clacom}
            renderOption={(props, option, {selected}) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{marginRight: 8}}
                  checked={selected}
                />
                {option.clacom}
              </li>
            )}
            style={{width: 500}}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Seleccionar GLAccounts"
                placeholder="seleccionar uno o varios"
              />
            )}
          />
          <Button
            onClick={(e) => sendRequest(e)}
            color="primary"
            variant="contained"
            sx={{borderRadius: 8, minWidth: '110px', ml: 2}}
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

export default Filters;
