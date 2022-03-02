import { Reducer } from 'react';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { GetDishInfo_dish } from '../../../graphql/graphql-types';
import type { RootState } from '../../store';

export { getDish as getDishes } from './getDish';

type DishesState = Omit<GetDishInfo_dish, '__typename'>;

const initialState: DishesState = {
  id: null,
  name: '',
  allergies: [],
};

export const dishesSlice = createSlice({
  name: 'selectedDish',
  initialState: initialState,
  reducers: {
    setSelectedDish: (
      state: DishesState,
      action: PayloadAction<DishesState>,
    ) => {
      state.id = action.payload.id;
      state.allergies = action.payload.allergies;
      state.name = action.payload.name;
    },
  },
});

export const { setSelectedDish } = dishesSlice.actions;

export const selectSelectedDish = (state: RootState) => state.selectedDish;

export default dishesSlice.reducer;
