import { createAsyncThunk } from '@reduxjs/toolkit';

import { useAppDispatch } from '../..';
import apolloClient from '../../../apolloClient';
import {
  GetDishInfo,
  GetDishInfoVariables,
} from '../../../graphql/graphql-types';

import { setSelectedDish } from './';
import { getDishInfo } from './queries.gql';

export const getDish = createAsyncThunk(
  'dishes/get',
  async ({ id }: GetDishInfoVariables, { dispatch }) => {
    const result = await apolloClient.query<GetDishInfo>({
      query: getDishInfo,
      variables: {
        id: id,
      },
    });
    if (result.data.dish != null) {
      dispatch(setSelectedDish(result.data.dish));
    }
  },
);
