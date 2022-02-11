import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import "dayjs/locale/de";
dayjs.extend(weekday);
dayjs.locale("de");

type NavigationState = {
  weekday: number;
};

const initialState: NavigationState = {
  weekday: dayjs().weekday(),
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState: initialState,
  reducers: {
    setWeekday: (state, action) => {
      state.weekday = action.payload;
    },
  },
});

export const { setWeekday } = navigationSlice.actions;

export const selectNavigation = (state: RootState) => state.navigation;

export default navigationSlice.reducer;
