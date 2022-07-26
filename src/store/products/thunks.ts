import { setList, setStartLoading } from "./productsSlice";
import { AppDispatch } from "../store";
import { getAllProducts } from "../../services/productsService";

export const getProducts = (limit = 10, offset = 0) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setStartLoading());

    const products = await getAllProducts(limit, offset);
    dispatch(setList(products));
  };
};
