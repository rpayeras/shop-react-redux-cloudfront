import * as Yup from "yup";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

export type ProductState = {
  list: Product[];
  isLoading: boolean;
};

export const ProductSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string(),
  price: Yup.number().required(),
  image: Yup.string().url().nullable(),
  category: Yup.string().url().nullable(),
});
