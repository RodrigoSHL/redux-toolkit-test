import { Autocomplete, Box, Button, Checkbox, Grid, InputAdornment, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { 
  getAllCountries,
  getBusinessUnitByCountry,
  getBranchOfficeByBusinessUnit,
  getClacomDataByParameters,
  selectShortening } from '../../../features/shortening/shorteningSlice';
import styles from "./Factor.module.css";

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CancelIcon from '@mui/icons-material/Cancel';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const clacomes = [{id: '1', clacom: 'default'}];

const Filters = ({
  clacomsList,
  setClacomsList,
  setClacomsFilterList,
  setFilterApplied
}: any) => {  
  const dispatch = useAppDispatch();

  const {    
    listShorteningCountry: COUNTRIES,
    listShorteningBusinessUnit: BUSINESS_UNIT,
    listShorteningBranchOffice: BRANCH_OFFICE,
    listShorteningClacomData: CLACOM_DATA
  } = useAppSelector(selectShortening);

  const [selectedClacom, setSelectedClacom] = useState<any[]>([]);
  const [showClacomFilter, setShowClacomFilter] = useState(false);
  const [clacomList, setClacomList] = useState(clacomes);

  const [countryList, setCountryList] = useState<any>([]);
  const [buList, setBuList] = useState<any>([]);
  const [boList, setBoList] = useState<any>([]);
  
  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

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
    setClacomsList(CLACOM_DATA);
    setClacomInCheckBox(CLACOM_DATA);
  }, [CLACOM_DATA]);

  const [countryIdSelect, setCountryIdSelect] = useState('');
  const [businessUnitIdSelect, setBusinessUnitIdSelect] = useState('');
  const [branchOfficeIdSelect, setBranchOfficeIdSelect] = useState('');

  const handleChangeCountry = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let idCountry: string = event.target.value;
    setCountryIdSelect(idCountry);
    dispatch(getBusinessUnitByCountry(idCountry));
  };

  const handleChangeBusinessUnit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let idBusinessUnit: string = event.target.value;
    setBusinessUnitIdSelect(idBusinessUnit);
    dispatch(getBranchOfficeByBusinessUnit(countryIdSelect, idBusinessUnit));
  };

  const handleChangeBranchOffice = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowClacomFilter(true);
    let idBranchOffice: string = event.target.value;
    setBranchOfficeIdSelect(idBranchOffice);
    dispatch(
      getClacomDataByParameters(countryIdSelect, businessUnitIdSelect, idBranchOffice)
    );
  };

  const setClacomInCheckBox = (clacomListForCheckBox:any) => {
    const arrayGetClacom: IClacom[] = [];
    interface IClacom {
      id: string;
      clacom: string;
    }
    clacomListForCheckBox.forEach((element:any) => {
      let objTemp = {id: element.idClacom, clacom: element.codeClacom};
      arrayGetClacom.push(objTemp);
    });

    setClacomList(arrayGetClacom);
  };

  const cleanFilter = () => {
    setFilterApplied(false);
    setClacomList([]);
    setSelectedClacom([]);
    setCountryIdSelect('');
    setBusinessUnitIdSelect('');
    setBranchOfficeIdSelect('');
    setClacomsList([]);
  };

  const filterTable = async (e:any) => {
    e.preventDefault();
    const factorFilterByClacom: Array<string> = []; //create empty array of clacoms data
    selectedClacom.forEach((element) => factorFilterByClacom.push(element.clacom)); //push only clacom parameter to array
    let filterClacomData = clacomsList.filter(
      (clacom:any) => factorFilterByClacom.indexOf(clacom.codeClacom) !== -1
    ); //filter original array by array of clacoms
    setClacomsFilterList(filterClacomData); //set data in new useState
    setFilterApplied(true); //with this useState, dataGrid component chooses between original or filter data
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
      <TextField
        id="outlined-basic"
        label="Seleccionar unidad de negocio"
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
          <MenuItem key={option.idBusinessUnit} value={option.idBusinessUnit}>
            {option.nameBusinessUnit} - ({option.codeBusinessUnit})
          </MenuItem>
        ))}
      </TextField>
    </Grid>
    <Grid item xs={12} md={4}>
      <TextField
        id="outlined-basic"
        label="Seleccionar tienda"
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
          <MenuItem key={option.idBranchOffice} value={option.idBranchOffice}>
            {option.nameBranchOffice}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
    {showClacomFilter && (
      <Grid item xs={12} md={9}>
        <Box className={styles.filter}>
          <Autocomplete
            size="small"
            onChange={(e, value) => {
              setSelectedClacom(value);
            }}
            multiple
            id="checkboxes-tags-demo"
            options={clacomList}
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
                label="Seleccionar clacom"
                placeholder="Ej: 9283"
              />
            )}
          />
          <Button
            onClick={filterTable}
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
    )}
    {clacomList.length > 0 && !showClacomFilter ? (
      <Grid item xs={12} md={9}>
        <Box className={styles.filter}>
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
    ) : (
      ''
    )}
  </Grid>  )
}

export default Filters