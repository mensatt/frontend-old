import { createAsyncThunk } from '@reduxjs/toolkit';

import apolloClient from '../../../apolloClient';
import '../../../graphql/graphql-types';
import {
  SetReviewStatusMutation,
  SetReviewStatusMutationVariables,
} from '../../../graphql/graphql-types';
import { setError } from '../error';

import { setOccurrences } from '.';
import { setReviewStatus } from './mutations.gql';

export const updateReviewStatus = createAsyncThunk(
  'adminPage/updateReviewStatus',
  async (variables: SetReviewStatusMutationVariables, { dispatch }) => {
    console.log(variables);

    try {
      await apolloClient.mutate<SetReviewStatusMutation>({
        mutation: setReviewStatus,
        variables: variables,
      });
    } catch (e) {
      console.error(e);
      dispatch(setOccurrences([]));
      dispatch(setError(e));
    }
  },
);
