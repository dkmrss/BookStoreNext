import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: any[]; // Danh sách sản phẩm trong giỏ
  itemCount: number; // Số lượng sản phẩm trong giỏ
}

const initialState: CartState = {
  items: [],
  itemCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
      state.itemCount = action.payload.length;
    },
    clearCart: (state) => {
      state.items = [];
      state.itemCount = 0;
    },
  },
});

export const { setCartItems, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
