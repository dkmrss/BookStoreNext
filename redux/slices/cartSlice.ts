import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = { totalItem: 0, totalPrice: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (state, action: PayloadAction<any>) => {
      state.totalItem = action.payload.totalItem;
      state.totalPrice = action.payload.totalPrice;
    },
  },
});

export const { updateCart } = cartSlice.actions;
export default cartSlice.reducer;
