import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import saleOrderSlice from "./slices/saleOrderSlice";
import completeOrderSlice from "./slices/completeOrder";
import authSlice from "./slices/authSlice";
import orderReducer from "@/redux/slices/orderSlice";
export const store = configureStore({
  reducer: {
    cart: cartSlice,
    saleOrder: saleOrderSlice,
    completeOrder: completeOrderSlice,
    auth: authSlice,
    order: orderReducer,
  },
});
