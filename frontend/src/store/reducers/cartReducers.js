import {
  CART_ADD_FAIL,
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_REMOVE_REQUEST,
  CART_REMOVE_SUCCESS,
  CART_REMOVE_FAIL,
} from "../constant";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_REQUEST:
      return { loading: true, cartItems: [] };

    case CART_ADD_SUCCESS:
      const item = action.payload;
      // Check if product exist

      console.log("ri", item);
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.product === item.product
      );
      console.log(existingItem);
      if (existingItem) {
        // if product found in the cart items find and update it with new item with same product Id
        return {
          ...state,
          loading: false,
          // map through all item if product id match then update it with same product but differnt qty and price, mabye
          // if product id doesn't match then do nothing to that item
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product === existingItem.product ? item : cartItem
          ),
        };
      } else {
        // if product doesn't found then add the new item to cartItems
        console.log("sate", [...state.cartItems, item]);
        return {
          ...state,
          loading: false,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_ADD_FAIL:
      return { loading: false, error: action.payload };
    case CART_REMOVE_REQUEST:
      return { loading: true, cartItems: [] };
    case CART_REMOVE_SUCCESS:
      return { loading: false, cartItems: action.payload };
    case CART_REMOVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// export const cartRemoveReducer = (state = { cartItems: [] }, action) => {
//   switch (action.type) {
//     case CART_REMOVE_REQUEST:
//       return { loading: true, cartItems: [] };
//     case CART_REMOVE_SUCCESS:
//       return { loading: false, cartItems: action.payload };
//     case CART_REMOVE_FAIL:
//       return { loading: false, error: action.payload };
//   }
// };
