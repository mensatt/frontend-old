import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../store';

type ErrorState = {
  message: string;
};

const initialState: ErrorState = {
  message: '',
};

export const errorSlice = createSlice({
  name: 'error',
  initialState: initialState,
  reducers: {
    setError: (state, action) => {
      state.message = action.payload.message;
    },
  },
});

export const { setError } = errorSlice.actions;

export const selectError = (state: RootState) => state.error;

export default errorSlice.reducer;
