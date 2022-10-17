import { combineReducers, configureStore } from "@reduxjs/toolkit";
import Data from "./Data";
import Login from "./Login";

const reducer = combineReducers({
  data: Data,
  loginInfo: Login,
});
export const store = configureStore({ reducer });
