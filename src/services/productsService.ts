import API_PATHS from "../constants/apiPaths";

const url = API_PATHS.product;

const errorResponse = {
  statusCode: 500,
  message: "Error from server",
};

export const getAllProducts = async (
  limit: number = 10,
  offset: number = 0
) => {
  try {
    const res = await fetch(`${url}/products?limit=${limit}&offset=${offset}`);
    const { data } = await res.json();

    return data;
  } catch (err) {
    console.log(err);
    return errorResponse;
  }
};

export const getProductById = async (id: number) => {
  try {
    const res = await fetch(`${url}/products/${id}`);
    const { data } = await res.json();

    console.log(res);

    return data;
  } catch (err) {
    console.log(err);
    return errorResponse;
  }
};
