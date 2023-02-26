import {
  SHIPPING_ADDRESS_FAIL,
  SHIPPING_ADDRESS_REQUEST,
  SHIPPING_ADDRESS_SUCCESS,
} from "../constant"
export const saveShippingAddress =
  (address, city, postalCode, country) => async (dispatch, getState) => {
    try {
      dispatch({ type: SHIPPING_ADDRESS_REQUEST })

      dispatch({
        type: SHIPPING_ADDRESS_SUCCESS,
        payload: { address, city, postalCode, country },
      })
    } catch (error) {
      dispatch({
        type: SHIPPING_ADDRESS_FAIL,
        payload:
          (error.response && error.response.data.message) || error.message,
      })
    }
  }

// export default saveShippingAddress
