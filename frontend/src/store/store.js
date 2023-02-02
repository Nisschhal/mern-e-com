import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducer";
// STATE AND ITS VALUES
const reducers = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,
});

// INITAL STATE
const initalState = {};

// redux-thunk MIDDLEWARE FOR DEDUX DEVTOOL
const middleware = [thunk];

// MAIN STORE FOR STATE
const store = createStore(
  reducers,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
