import { createSlice } from "@reduxjs/toolkit";

const initialState = { friend: [], comment: [], invite: [] };

const alarmSlice = createSlice({
  name: "alarm",
  initialState,
  reducers: {
    getFriendAlarm(state, action) {
      const newState = Object.assign({}, state, {
        friend: action.payload,
      });
      return newState;
    },
    getCommentAlarm(state, action) {
      const newState = Object.assign({}, state, { comment: action.payload });
      return newState;
    },
    getInviteAlarm(state, action) {
      const newState = Object.assign({}, state, {
        invite: action.payload,
      });
      return newState;
    },
  },
});

export const { getFriendAlarm, getCommentAlarm, getInviteAlarm } =
  alarmSlice.actions;
export default alarmSlice.reducer;
