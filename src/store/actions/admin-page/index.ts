import { Occurrence } from 'src/graphql/graphql-types';
import { RootState } from 'src/store';
// NOTE: Importing from `src/store/types` instead of `src/store` as reexporting the enum does not seem to work
import { SortOrder, WithSorting } from 'src/store/types';

import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

export * from './getAdminPanelOccurrences';
export * from './queries.gql';

// TODO: This is a workaround until a proper query is available
type DemoOccurrence = {
  id: Occurrence['id'];
  dish: {
    id: Occurrence['dish']['id'];
    name: Occurrence['dish']['name'];
    sourceName: Occurrence['dish']['name'];
  };
  date: Occurrence['date'];
  reviewStatus: Occurrence['reviewStatus'];
};

type AdminPageState = {
  occurrences: WithSorting<DemoOccurrence>;
};

const initialState: AdminPageState = {
  occurrences: {
    data: [],
    sortOrder: SortOrder.None,
    sortBy: 'dish.name',
  },
};

export const adminPageSlice = createSlice({
  name: 'adminNav',
  initialState: initialState,
  reducers: {
    setOccurrences: (
      state,
      action: PayloadAction<AdminPageState['occurrences']['data']>,
    ) => {
      state.occurrences.data = [];
      state.occurrences.data = action.payload;
    },
    addOccurrence: (state, action: PayloadAction<DemoOccurrence>) => {
      state.occurrences.data.push(action.payload);
    },
    setOccurrenceSortOrder: (state, action: PayloadAction<SortOrder>) => {
      state.occurrences.sortOrder = action.payload;
    },
  },
});

export const { setOccurrences, addOccurrence, setOccurrenceSortOrder } =
  adminPageSlice.actions;

export const selectAdminPage = (state: RootState) => state.adminPage;

export const selectOccurrences = (state: RootState) =>
  state.adminPage.occurrences.data;
export const selectOccurrenceOrderType = (state: RootState) =>
  state.adminPage.occurrences.sortOrder;
// TODO: This code (and the approach towards which order to sort in) needs improvement
export const selectOccurrencesSortedByName = createSelector(
  [selectOccurrences, selectOccurrenceOrderType],
  (occurrences, orderType) => {
    if (orderType === SortOrder.None) return occurrences;
    const copy = occurrences.map((elem) => ({ ...elem }));
    copy.sort((a, b) => a.dish.name.localeCompare(b.dish.name));
    if (orderType === SortOrder.Asc) return copy.reverse();
    return copy;
  },
);

export default adminPageSlice.reducer;
