import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = { userInfo: "" };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUserInfo: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
    },
    removeUserInfo: (state) => {
      state.userInfo = "";
    },
  },
});

export const { getUserInfo, removeUserInfo } = authSlice.actions;
export default authSlice.reducer;
