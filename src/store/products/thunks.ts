import { setList, setStartLoading } from "./productsSlice";
import { AppDispatch } from "../store";

import API_PATHS from "../../constants/apiPaths";

export const getProducts = (limit = 10, offset = 0) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setStartLoading());

    const res = await fetch(
      `${API_PATHS.product}/products?limit=${limit}&offset=${offset}`
    );
    const { data } = await res.json();

    setList(data);
  };
};
