import React from "react"
import {
  SHIPPING_ADDRESS_FAIL,
  SHIPPING_ADDRESS_REQUEST,
  SHIPPING_ADDRESS_SUCCESS,
} from "../constant"

const shippingReducers = (state = { shippingInfo: {} }, action) => {
  switch (action.type) {
    case SHIPPING_ADDRESS_REQUEST:
      return { ...state, loading: true }
    case SHIPPING_ADDRESS_SUCCESS:
      return { ...state, loading: false, shippingInfo: action.payload }
    case SHIPPING_ADDRESS_FAIL:
      return { ...state, error: action.payload }
    default:
      return state
  }
}

export default shippingReducers
