import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducers";
// STATE AND ITS VALUES
const reducers = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,
  cart: cartReducer,
});

const cartFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// INITAL STATE
const initalState = { cart: { cartItems: "hello" } };

// redux-thunk MIDDLEWARE FOR DEDUX DEVTOOL
const middleware = [thunk];

// MAIN STORE FOR STATE
const store = createStore(
  reducers,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
