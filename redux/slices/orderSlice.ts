import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
  order: any | null;
}

const initialState: OrderState = {
  order: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<any>) => {
      state.order = action.payload;
    },
    clearOrder: (state) => {
      state.order = null;
    },
  },
});

export const { setOrder, clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
