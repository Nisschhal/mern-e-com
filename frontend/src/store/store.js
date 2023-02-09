import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducer } from "./reducers/userReducers";
// STATE AND ITS VALUES
const reducers = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
});

const cartFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userFromStroage =
  (localStorage.getItem("userInfo") &&
    JSON.parse(localStorage.getItem("userInfo"))) ||
  null;
// INITAL STATE
const initalState = {
  cart: { cartItems: cartFromStorage },
  userLogin: { userInfo: userFromStroage },
};

// redux-thunk MIDDLEWARE FOR DEDUX DEVTOOL
const middleware = [thunk];

// MAIN STORE FOR STATE
const store = createStore(
  reducers,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
