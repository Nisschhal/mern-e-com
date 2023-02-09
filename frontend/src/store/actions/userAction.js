import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
} from "../constant";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Contet-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://127.0.0.1:5000/api/users/login",
      { email, password },
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    // localStorage.set("userInfo", JSON.stringify(user));
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        (error.response &&
          error.response.data.message &&
          error.response.data.message) ||
        error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    console.log("dispatch logout");

    // localStorage.set("userInfo", JSON.stringify(user));
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload:
        (error.response &&
          error.response.data.message &&
          error.response.data.message) ||
        error.message,
    });
  }
};
