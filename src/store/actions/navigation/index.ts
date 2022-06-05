import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../store';

export * from './queries.gql';
export * from './getToken';

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
  token: string;
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
  token: '',
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
    setToken: (state, action: { payload: string }) => {
      state.token = action.payload;
    },
  },
});

export const { setWeekday, setActiveMensaIdx, setToken } =
  navigationSlice.actions;

export const selectNavigation = (state: RootState) => state.navigation;
export const selectToken = (state: RootState) => state.navigation.token;

export default navigationSlice.reducer;
