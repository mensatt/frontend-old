import { configureStore } from '@reduxjs/toolkit';
import navigationSlice from './actions/navigation';
import dishesSlice from './actions/dishes';

export const store = configureStore({
  reducer: {
    selectedDish: dishesSlice,
    navigation: navigationSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
