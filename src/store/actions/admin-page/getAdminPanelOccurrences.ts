import { createAsyncThunk } from '@reduxjs/toolkit';

import apolloClient from '../../../apolloClient';
import {
  GetOccurrenceForAdminPanelQuery,
  GetOccurrenceForAdminPanelQueryVariables,
} from '../../../graphql/graphql-types';
import { setError } from '../error';

import { setOccurrences } from '.';
import { getOccurrenceForAdminPanel } from './queries.gql';

export const getAdminPanelOccurrences = createAsyncThunk(
  'adminPage/getOccurrences',
  async ({ date }: GetOccurrenceForAdminPanelQueryVariables, { dispatch }) => {
    try {
      const result = await apolloClient.query<GetOccurrenceForAdminPanelQuery>({
        query: getOccurrenceForAdminPanel,
        variables: {
          date: date,
        },
      });

      const transformedData = result.data.getOccurrencesByDate.map((elem) => ({
        ...elem,
        dish: {
          ...elem.dish,
          sourceName: elem.dish.name,
        },
      }));

      dispatch(setOccurrences(transformedData));
    } catch (e) {
      console.error(e);
      dispatch(setOccurrences([]));
      dispatch(setError(e));
    }
  },
);
