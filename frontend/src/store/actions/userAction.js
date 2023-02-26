import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
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

export const signpu = (email, name, password) => async (dispatch) => {
  try {
    dispatch({
      type: SIGNUP_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://127.0.0.1:5000/api/users/signup",
      { email, name, password },
      config
    );
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: data,
    });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIGNUP_FAIL,
      payload: (error.response && error.response.data.message) || error.message,
    });
  }
};

export const getUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/users/${id}`,
      config
    );
    console.log(data);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      error: (error.response && error.response.data.message) || error.message,
    });
  }
};

export const update = (email, name) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_UPDATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:5000/api/users/updateProfile`,
      {
        name,
        email,
      },
      config
    );
    console.log(data);

    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data,
    });

    // alert("Profile updated!");

    // localStorage.set("userInfo", JSON.stringify(user));
  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload:
        (error.response &&
          error.response.data.message &&
          error.response.data.message) ||
        error.message,
    });
  }
};
