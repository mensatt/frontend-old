import { configureStore } from '@reduxjs/toolkit';

import errorSlice from './actions/error';
import navigationSlice from './actions/navigation';
import todaysDishesSlice from './actions/todays-dishes';

export const store = configureStore({
  reducer: {
    todaysDishes: todaysDishesSlice,
    navigation: navigationSlice,
    error: errorSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
