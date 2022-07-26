import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Product, ProductState } from "../../models/Product";

const initialState: ProductState = {
  list: [],
  isLoading: false,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setStartLoading: (state: ProductState) => {
      state.isLoading = true;
    },
    setList: (state: ProductState, action: PayloadAction<Product[]>) => {
      state.list = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setStartLoading, setList } = productsSlice.actions;
