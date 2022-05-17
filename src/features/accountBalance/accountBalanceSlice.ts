import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { initialStateAccountBalance } from '../../app/initialVariable';
import { RootState } from '../../app/store';


const api_rest = 'http://localhost:3001'

export const accountBalanceSlice = createSlice({
  name: 'accountBalance',
  initialState: {
    ...initialStateAccountBalance,
  },
  reducers: {
    setDataAccountBalanceList: (state: any = initialStateAccountBalance, action: any) => {
      state.listDataAccountBalance = action.payload || [];
    },
  },
});

//Reducer
export default accountBalanceSlice.reducer

//Action
export const {
    setDataAccountBalanceList
} = accountBalanceSlice.actions;

//State-Reducer
export const selectAccountBalance = (state: RootState) => state.accountBalance;


//Negocio
export const getDataAccountBalance = (inputObject:any) => (dispatch:any) => {
    axios
      .post(`${api_rest}/api/account-balance`, inputObject)
      .then((response) => {
        dispatch(setDataAccountBalanceList(response.data));
      })
      .catch((error) => console.log(error));
  };