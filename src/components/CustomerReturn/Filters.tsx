import React, { useEffect, useState } from "react";
//Reduxjs
import {
  getAllCountries,
  getBranchOfficeByBusinessUnit,
  getBusinessUnitByCountry,
  getClacomDataByParameters,
  selectShortening,
} from "../../features/shortening/shorteningSlice";

//Mui Calendar
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterMoment from "@mui/lab/AdapterMoment";
import MomentUtils from "@date-io/moment";
import "moment/locale/es";
import { Grid, MenuItem, TextField, InputAdornment } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "./CustomerReturn.module.css";

const Filters = ({
  clacomsList,
  setClacomsList,
  setClacomsFilterList,
  setFilterApplied,
}: any) => {
  const dispatch = useAppDispatch();

  const {
    listShorteningCountry: COUNTRIES,
    listShorteningBusinessUnit: BUSINESS_UNIT,
    listShorteningBranchOffice: BRANCH_OFFICE,
  } = useAppSelector(selectShortening);

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

  const [countryIdSelect, setCountryIdSelect] = useState("");
  const [businessUnitIdSelect, setBusinessUnitIdSelect] = useState("");
  const [branchOfficeIdSelect, setBranchOfficeIdSelect] = useState("");
  const [valueInitialDate, setValueInitialDate] = useState<Date | null>(
    new Date()
  );
  const [openInitialDate, setOpenInitialDate] = useState(false);

  const handleChangeCountry = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let idCountry: string = event.target.value;
    setCountryIdSelect(idCountry);
    dispatch(getBusinessUnitByCountry(idCountry));
  };

  const handleChangeBusinessUnit = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let idBusinessUnit: string = event.target.value;
    setBusinessUnitIdSelect(idBusinessUnit);
    dispatch(getBranchOfficeByBusinessUnit(countryIdSelect, idBusinessUnit));
  };

  const handleChangeBranchOffice = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let idBranchOffice: string = event.target.value;
    setBranchOfficeIdSelect(idBranchOffice);
    dispatch(
      getClacomDataByParameters(
        countryIdSelect,
        businessUnitIdSelect,
        idBranchOffice
      )
    );
  };

  return (
    <Grid className={styles.toolbar} container spacing={2}>
      <Grid item xs={12} md={3}>
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
          }}
        >
          {countryList &&
            countryList.map((option: any) => (
              <MenuItem key={option.idCountry} value={option.idCountry}>
                {option.nameCountry} - ({option.codeCountry})
              </MenuItem>
            ))}
        </TextField>
      </Grid>
      <Grid item xs={12} md={3}>
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
          }}
        >
          {buList.map((option: any) => (
            <MenuItem key={option.idBusinessUnit} value={option.idBusinessUnit}>
              {option.nameBusinessUnit} - ({option.codeBusinessUnit})
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} md={3}>
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
          }}
        >
          {boList.map((option: any) => (
            <MenuItem key={option.idBranchOffice} value={option.idBranchOffice}>
              {option.nameBranchOffice}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} md={3}>
        <LocalizationProvider
          dateAdapter={AdapterMoment}
          locale="es"
          utils={MomentUtils}
        >
          <DatePicker
            views={["year", "month"]}
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
                  onClick={(e) => setOpenInitialDate(true)}
                />
              );
            }}
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
};

export default Filters;
