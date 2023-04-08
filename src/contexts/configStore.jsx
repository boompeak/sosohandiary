import { configureStore } from "@reduxjs/toolkit";
import sampleSlice from "./sampleSlice";
import currentUserInfoSlice from "./currentUserInfoSlice";
import curDiaryPageSlice from "./curDiaryPageSlice";
import alarmSlice from "./alarmSlice";

const rootReducer = { currentUserInfoSlice, curDiaryPageSlice, alarmSlice };

const store = configureStore({ reducer: rootReducer });

export default store;
