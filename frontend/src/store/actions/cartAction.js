import axios from "axios";
import {
  CART_ADD_FAIL,
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_REMOVE_REQUEST,
  CART_REMOVE_SUCCESS,
  CART_REMOVE_FAIL,
} from "../constant";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_ADD_REQUEST });

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
export const removeFromCart = (id) => async (dispatch, getState) => {
  // console.log(getState().cart.cartItems);
  try {
    dispatch({
      type: CART_REMOVE_REQUEST,
    });

    dispatch({
      type: CART_REMOVE_SUCCESS,
      payload: id,
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: CART_REMOVE_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
