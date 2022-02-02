import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Reducer } from "react";
import { GetDishInfo_dish } from "../../../graphql/graphql-types";
import type { RootState } from "../../store";
export { getDish as getDishes } from "./getDish";

type DishesState = Omit<GetDishInfo_dish, "__typename">;

const initialState: DishesState = {
  id: null,
  name: "",
  allergies: [],
};

export const dishesSlice = createSlice({
  name: "selectedDish",
  initialState: initialState,
  reducers: {
    set: (state: DishesState, action: PayloadAction<DishesState>) => {
      state.id = action.payload.id;
      state.allergies = action.payload.allergies;
      state.name = action.payload.name;
    },
  },
});

export const { set } = dishesSlice.actions;

export const selectSelectedDish = (state: RootState) => state.selectedDish;

export default dishesSlice.reducer;
