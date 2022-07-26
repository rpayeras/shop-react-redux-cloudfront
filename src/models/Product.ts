import * as Yup from "yup";

export type Product = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  count: number;
};

export type ProductState = {
  list: Product[];
  isLoading: boolean;
};

export const ProductSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  image: Yup.string().url().nullable(),
  price: Yup.number().required(),
  count: Yup.number().required(),
});
