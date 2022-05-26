import { configureStore } from '@reduxjs/toolkit';

import adminNavSlice from './actions/admin-nav';
import adminPageSlice from './actions/admin-page';
import errorSlice from './actions/error';
import navigationSlice from './actions/navigation';
import todaysDishesSlice from './actions/todays-dishes';

export const store = configureStore({
  reducer: {
    todaysDishes: todaysDishesSlice,
    navigation: navigationSlice,
    error: errorSlice,
    adminNav: adminNavSlice,
    adminPage: adminPageSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
