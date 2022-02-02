import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetDishInfo,
  GetDishInfoVariables,
} from "../../../graphql/graphql-types";
import { getDishInfo } from "./queries.gql";
import { set } from "./";
import { useAppDispatch } from "../..";
import apolloClient from "../../../apolloClient";

export const getDish = createAsyncThunk(
  "dishes/get",
  async ({ id }: GetDishInfoVariables, { dispatch }) => {
    const result = await apolloClient.query<GetDishInfo>({
      query: getDishInfo,
      variables: {
        id: id,
      },
    });
    if (result.data.dish != null) {
      dispatch(set(result.data.dish));
    }
  }
);
