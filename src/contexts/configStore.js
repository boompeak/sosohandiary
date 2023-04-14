import { configureStore } from "@reduxjs/toolkit";
import currentUserInfoSlice from "./currentUserInfoSlice";
import curDiaryPageSlice from "./curDiaryPageSlice";
import alarmSlice from "./alarmSlice";
import curNavbarModeSlice from "./curNavbarModeSlice";

const rootReducer = {
  currentUserInfoSlice,
  curDiaryPageSlice,
  alarmSlice,
  curNavbarModeSlice,
};

const store = configureStore({ reducer: rootReducer });

export default store;
