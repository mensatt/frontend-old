import { createAsyncThunk } from '@reduxjs/toolkit';

import apolloClient from '../../../apolloClient';
import {
  GetOccurrenceByDateQuery,
  GetOccurrenceByDateQueryVariables,
} from '../../../graphql/graphql-types';
import { setError } from '../error';

import { setTodaysDishes } from '.';
import { getOccurrenceByDate } from './queries.gql';

export const getDishesOfDate = createAsyncThunk(
  'dishes/get',
  async ({ date }: GetOccurrenceByDateQueryVariables, { dispatch }) => {
    try {
      const result = await apolloClient.query<GetOccurrenceByDateQuery>({
        query: getOccurrenceByDate,
        variables: {
          date: date,
        },
      });
      dispatch(setTodaysDishes(result.data.getOccurrencesByDate));
    } catch (e) {
      console.error(e);
      dispatch(setTodaysDishes([]));
      dispatch(setError(e));
    }
  },
);
