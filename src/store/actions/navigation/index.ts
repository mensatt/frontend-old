import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../store';

type NavigationState = {
  weekday: number;
};

const initialState: NavigationState = {
  weekday: 0,
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: initialState,
  reducers: {
    setWeekday: (state, action) => {
      state.weekday = action.payload;
    },
  },
});

export const { setWeekday } = navigationSlice.actions;

export const selectNavigation = (state: RootState) => state.navigation;

export default navigationSlice.reducer;
