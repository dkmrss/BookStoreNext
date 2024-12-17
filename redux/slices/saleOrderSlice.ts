import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = { saleOrderDetail: [], totalAmount: 0 };

const saleOrderSlice = createSlice({
  name: "saleOrder",
  initialState,
  reducers: {
    addSaleOrder: (state, action: PayloadAction<any>) => {
      state.saleOrderDetail = action.payload.saleOrderDetail;
      state.totalAmount = action.payload.totalAmount;
    },
  },
});

export const { addSaleOrder } = saleOrderSlice.actions;
export default saleOrderSlice.reducer;
