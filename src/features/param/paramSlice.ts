import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { initialStateParam } from "../../app/initialVariable";
import { AppThunk, RootState } from "../../app/store";
import config from '../../config';

const api_rest = config['api_sql_url'];

export interface CounterState {
  value: number;
  status: "idle" | "loading" | "failed";
}

export const paramSlice = createSlice({
  name: "param",
  initialState: {
    ...initialStateParam,
  },
  reducers: {
    getAllCountryList: (state: any = initialStateParam, action: PayloadAction<[]>) => {
      state.listAllCountry = action.payload || [];
    },
    getAllBranchOfficeList: (state: any = initialStateParam, action: PayloadAction<[]>) => {
      state.listAllBranchOffice = action.payload || [];
    },
    getAllBusinessUnitList: (state: any = initialStateParam, action: PayloadAction<[]>) => {
      state.listAllBusinessUnit = action.payload || [];
    },
    getAllClacomList: (state: any = initialStateParam, action: PayloadAction<[]>) => {
      state.listAllClacom = action.payload || [];
    },
  },
});

//Action
export const {
  getAllCountryList,
  getAllBranchOfficeList,
  getAllBusinessUnitList,
  getAllClacomList,
} = paramSlice.actions;

//State-Reducer
export const selectParam = (state: RootState) => state.param;

//Reducer
export default paramSlice.reducer;

//Negocio
//Mantenedor Lista Paises
export const getAllCountries = () => (dispatch:any) => {
    axios
      .get(`${api_rest}/api/generic/country`)
      .then((response) => {
        dispatch(getAllCountryList(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Mantenedor Lista Unidad de Negocio
  export const getAllBusinessUnit = (): AppThunk => (dispatch) => {
    axios
      .get(`${api_rest}/api/generic/business-unit`)
      .then((response) => {
        dispatch(getAllBusinessUnitList(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Mantenedor Lista Tiendas
  export const getAllBranchOffice = (): AppThunk => (dispatch) => {
    axios
      .get(`${api_rest}/api/generic/branch-office`)
      .then((response) => {
        dispatch(getAllBranchOfficeList(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Mantenedor Lista Clacom
  export const getAllClacom = (): AppThunk => (dispatch) => {
    axios
      .get(`${api_rest}/api/generic/clacom`)
      .then((response) => {
        dispatch(getAllClacomList(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };