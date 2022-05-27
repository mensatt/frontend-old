import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { GetOccurrenceByDateQuery } from '../../../graphql/graphql-types';
import type { RootState } from '../../store';

export * from './queries.gql';
export * from './getDishesOfDate';

type TodaysDishesState = GetOccurrenceByDateQuery['getOccurrencesByDate'];

const initialState: TodaysDishesState = [];

export const todaysDishesSlice = createSlice({
  name: 'todaysDishes',
  initialState: initialState,
  reducers: {
    setTodaysDishes: (
      _: TodaysDishesState,
      action: PayloadAction<TodaysDishesState>,
    ) => action.payload,
  },
});

export const { setTodaysDishes } = todaysDishesSlice.actions;

export const selectTodaysDishes = (state: RootState) => state.todaysDishes;

export default todaysDishesSlice.reducer;
