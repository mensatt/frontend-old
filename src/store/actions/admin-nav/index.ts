import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../store';

export * from './queries.gql';
export * from './getToken';

export enum Categories {
  Occurrences = 0,
  Pictures = 1,
  Comments = 2,
}

type AdminNavState = {
  categories: Array<{ name: string }>;
  activeCategoryIdx: Categories;
  token: string;
};

const initialState: AdminNavState = {
  categories: [
    {
      name: 'Gerichte',
    },
    {
      name: 'Bilder',
    },
    {
      name: 'Kommentare',
    },
  ],
  activeCategoryIdx: Categories.Occurrences,
  token: '',
};

export const adminNavSlice = createSlice({
  name: 'adminNav',
  initialState: initialState,
  reducers: {
    setActiveIndex: (state, action: { payload: Categories }) => {
      state.activeCategoryIdx = action.payload;
    },
  },
});

export const { setActiveIndex } = adminNavSlice.actions;

export const selectAdminNav = (state: RootState) => state.adminNav;

export default adminNavSlice.reducer;
