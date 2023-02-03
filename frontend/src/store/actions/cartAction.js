import axios from "axios";
import { CART_ADD_FAIL, CART_ADD_REQUEST, CART_ADD_SUCCESS } from "../constant";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_ADD_REQUEST, payload: { loading: true } });

    const { data } = await axios.get(
      `http://127.0.0.1:5000/api/products/${id}`
    );
    console.log("cart item", data);

    dispatch({
      type: CART_ADD_SUCCESS,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: CART_ADD_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
