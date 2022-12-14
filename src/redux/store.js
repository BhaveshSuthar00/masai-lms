import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AssignmentData from "./AssignmentData";
import LecturesData from "./LecturesData";
import Login from "./Login";

const reducer = combineReducers({
  Lectures: LecturesData,
  Assignments: AssignmentData,
  loginInfo: Login,
});
export const store = configureStore({ reducer });
