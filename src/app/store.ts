import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import shorteningReducer from '../features/shortening/shorteningSlice';
import paramReducer from '../features/param/paramSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    shortening: shorteningReducer,
    param: paramReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
