import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { initialStateUser } from '../../app/initialVariable';
import { AppThunk, RootState } from '../../app/store';
import config from '../../config';

const api_rest = config['api_sql_url'];
export interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

interface IUser {
    idUser: number;
    mailUser: string;
    firstNameUser: string;
    lastNameUser: string;
    displayNameUser: string;
    stateUser: boolean;
  }

//Negocio
export const getAllUsers = (): AppThunk => async (dispatch) => {
    try {
      await axios
        .get(`${api_rest}/api/auth-role`)
        .then((response) => {
          dispatch(setUserListReducer(response.data));
            })
        .catch((err) => {
              console.log('Error::', err);
        });
    } catch (err) {
      console.log('Error::', err);
    }
  };

export const getUsers =
  (mail: string): AppThunk =>
  async (dispatch) => {
    try {
      console.log('mail::', mail);
      await axios
        .get(`${api_rest}/api/auth-role/${mail}`, {
          params: {
            id: mail,
          },
        })
        .then((response) => {
          dispatch(getUserReducer(response.data));
          console.log('response.data::', response.data);
            })
        .catch((err) => {
              console.log('Error::', err);
        });
    } catch (err) {
      console.log('Error::', err);
    }
  };

export const cleanUsers = () => (dispatch:any) => {
  console.log('cleanUsers:::', cleanUsers);
  dispatch(cleanUserListReducer());
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    ...initialStateUser,
  },
  reducers: {
    setUserListReducer: (state: any, action: PayloadAction<any>) => {
      state.listUsers = action.payload || [];
    },
    getUserReducer: (state: any, action: PayloadAction<IUser>) => {
      state.dataUser = action.payload;
    },
    cleanUserListReducer: (state: any = initialStateUser) => {
      state.listUsers = [];
    },
  },
});

//Action
export const {setUserListReducer, getUserReducer, cleanUserListReducer} = userSlice.actions;

//State-Reducer
export const selectUsers = (state: RootState) => state.user;
//Reducer
export default userSlice.reducer;
