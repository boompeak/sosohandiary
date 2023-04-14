import { createSlice } from "@reduxjs/toolkit";

const initialState = { curMode: "HOME" };

const curNavbarModeSlice = createSlice({
  name: "curNavbarMode",
  initialState,
  reducers: {
    changeCurNavbarMode(state, action) {
      state.curMode = action.payload;
      // state.curMode = action.payload;
    },
  },
});

export const { changeCurNavbarMode } = curNavbarModeSlice.actions;
export default curNavbarModeSlice.reducer;
