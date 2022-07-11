import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "store/counterSlice";
import cartReducer from "store/cartSlice";
import { productsSlice } from "store/products";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    products: productsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch;
