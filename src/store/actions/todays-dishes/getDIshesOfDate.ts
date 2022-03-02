import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOccurrenceByDate } from './queries.gql';
import { setTodaysDishes } from '.';
import apolloClient from '../../../apolloClient';
import {
  GetOccurrenceByDateQuery,
  GetOccurrenceByDateQueryVariables,
} from '../../../graphql/graphql-types';

export const getDishesOfDate = createAsyncThunk(
  'dishes/get',
  async ({ date }: GetOccurrenceByDateQueryVariables, { dispatch }) => {
    const result = await apolloClient.query<GetOccurrenceByDateQuery>({
      query: getOccurrenceByDate,
      variables: {
        date: date,
      },
    });
    dispatch(setTodaysDishes(result.data.getOccurrencesByDate));
  }
);
