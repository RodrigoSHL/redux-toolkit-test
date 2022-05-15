import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { initialStateShortening } from '../../app/initialVariable';
import { RootState } from '../../app/store';

const api_rest = 'http://localhost:3001'

export interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

//Negocio
export const getAllCountries = () => (dispatch:any) => {
  axios
    .get(`${api_rest}/api/generic/country`)
    .then((response) => {
      dispatch(setShorteningCountryList(response.data));
    })
    .catch((error) => console.log(error));
};

export const shorteningSlice = createSlice({
  name: 'shortening',
  initialState: {
    ...initialStateShortening,
  },
    reducers: {
    setShorteningCountryList: (state: any = initialStateShortening, action: any) => {
      state.listShorteningCountry = action.payload || [];
    },
  },
});

export const { setShorteningCountryList } = shorteningSlice.actions;

//State-Reducer
export const selectShortening = (state: RootState) => state.shortening;
//Reducer
export default shorteningSlice.reducer;
