import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./actions/counter";
import dishesSlice from "./actions/dishes";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    selectedDish: dishesSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
