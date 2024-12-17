import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = { data: [] };

const completeOrderSlice = createSlice({
  name: "completeOrder",
  initialState,
  reducers: {
    addCompleteOrder: (state, action: PayloadAction<any>) => {
      state.data = action.payload.data;
    },
  },
});

export const { addCompleteOrder } = completeOrderSlice.actions;
export default completeOrderSlice.reducer;
