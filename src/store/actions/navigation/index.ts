import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../store';

// As of writing each mensa had its own backend-URL. This was done so you can switch to the dev-backend on the fly.
// TODO: In the future this should not be done this way, but rather by using a query parameter (where necessary)
type Mensa = {
  name: string;
  url: string;
};

type NavigationState = {
  weekday: number;
  activeMensaIdx: number;
  mensas: Mensa[];
};

const initialState: NavigationState = {
  weekday: -1,
  activeMensaIdx: 0,
  mensas: [
    {
      name: 'Südmensa',
      url: 'https://api.mensatt.de/v1/graphql',
    },
    {
      name: 'Devmensa',
      url: 'https://dev-api.mensatt.de/v1/graphql',
    },
  ],
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: initialState,
  reducers: {
    setWeekday: (state, action) => {
      state.weekday = action.payload;
    },
    setActiveMensaIdx: (state, action) => {
      state.activeMensaIdx = action.payload;
    },
  },
});

export const { setWeekday, setActiveMensaIdx } = navigationSlice.actions;

export const selectNavigation = (state: RootState) => state.navigation;

export default navigationSlice.reducer;
