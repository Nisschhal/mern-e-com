import React from "react"
import {
  PAYMENT_METHOD_REQUEST,
  PAYMENT_METHOD_SUCCESS,
  PAYMENT_METHOD_FAIL,
} from "../constant"

const SavePaymentMethodAction = (data) => (dispatch) => {
  try {
    dispatch({
      type: PAYMENT_METHOD_REQUEST,
    })
    dispatch({
      type: PAYMENT_METHOD_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: PAYMENT_METHOD_FAIL,
      payload: (err.response && err.response.message.data) || err.response,
    })
  }
}

export default SavePaymentMethodAction
