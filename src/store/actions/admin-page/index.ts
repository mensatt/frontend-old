import { Occurrence, ReviewStatus } from 'src/graphql/graphql-types';

import { createSelector, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../store';

// TODO: This is a workaround until a proper query is available
type DemoOccurrence = {
  dish: {
    name: Occurrence['dish']['name'];
    sourceName: Occurrence['dish']['name'];
  };
  date: Occurrence['date'];
  reviewStatus: Occurrence['reviewStatus'];
};

type AdminPageState = {
  occurrences: Array<DemoOccurrence>;
  occurrencesOrderType: 'none' | 'asc' | 'desc';
};

const initialState: AdminPageState = {
  // TODO: This array should be empty initially. This is a workaround until there is support from the backend
  occurrences: [
    {
      dish: {
        name: 'Suppe',
        sourceName: 'Suhppeh',
      },
      date: '',
      reviewStatus: ReviewStatus.Approved,
    },
    {
      dish: {
        name: 'Nudeln',
        sourceName: 'Nuhdeln',
      },
      date: '',
      reviewStatus: ReviewStatus.Updated,
    },
    {
      dish: {
        name: 'Pommes',
        sourceName: 'Poms',
      },
      date: '',
      reviewStatus: ReviewStatus.AwaitingApproval,
    },
  ],
  occurrencesOrderType: 'none',
};

export const adminPageSlice = createSlice({
  name: 'adminNav',
  initialState: initialState,
  reducers: {
    setOccurrences: (state, action) => {
      state.occurrences = action.payload;
    },
    addOccurrence: (state, action: { payload: DemoOccurrence }) => {
      state.occurrences.push(action.payload);
    },
    setOccurrenceSortOrder: (
      state,
      action: { payload: 'asc' | 'desc' | 'none' },
    ) => {
      state.occurrencesOrderType = action.payload;
    },
  },
});

export const { setOccurrences, addOccurrence, setOccurrenceSortOrder } =
  adminPageSlice.actions;

export const selectAdminPage = (state: RootState) => state.adminPage;

export const selectOccurrences = (state: RootState) =>
  state.adminPage.occurrences;
export const selectOccurrenceOrderType = (state: RootState) =>
  state.adminPage.occurrencesOrderType;
// TODO: This code (and the approach towards which order to sort in) needs improvement
export const selectOccurrencesSortedByName = createSelector(
  [selectOccurrences, selectOccurrenceOrderType],
  (occurrences, orderType) => {
    if (orderType === 'none') return occurrences;
    const copy = occurrences.map((elem) => ({ ...elem }));
    copy.sort((a, b) => a.dish.name.localeCompare(b.dish.name));
    if (orderType === 'desc') return copy.reverse();
    return copy;
  },
);

export default adminPageSlice.reducer;
