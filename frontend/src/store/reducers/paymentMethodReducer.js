import {
  PAYMENT_METHOD_REQUEST,
  PAYMENT_METHOD_SUCCESS,
  PAYMENT_METHOD_FAIL,
} from "../constant"

import React from "react"

const PaymentMethodReducer = (state = { paymentMethod: "" }, action) => {
  switch (action.type) {
    case PAYMENT_METHOD_REQUEST:
      return { ...state }
    case PAYMENT_METHOD_SUCCESS:
      return { ...state, paymentMethod: action.payload }
    case PAYMENT_METHOD_FAIL:
      return { ...state }
    default:
      return state
  }
}

export default PaymentMethodReducer
