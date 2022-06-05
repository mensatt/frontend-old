import { setToken } from 'src/store';

import { createAsyncThunk } from '@reduxjs/toolkit';

import apolloClient from '../../../apolloClient';
import {
  GetTokenQuery,
  GetTokenQueryVariables,
} from '../../../graphql/graphql-types';
import { setError } from '../error';

import { getToken } from './queries.gql';

export const login = createAsyncThunk(
  'navigation/login',
  async ({ email, password }: GetTokenQueryVariables, { dispatch }) => {
    try {
      const result = await apolloClient.query<GetTokenQuery>({
        query: getToken,
        variables: {
          email: email,
          password: password,
        },
      });
      // Note: Setting to localStorage here for apollo client
      localStorage.setItem('token', result.data?.login);
      dispatch(setToken(result.data?.login));
    } catch (e) {
      console.error(e);
      dispatch(setError(e));
    }
  },
);
