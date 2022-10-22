import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASICURL } from "../constants/constants";

const slice = createSlice({
  name: "assignments",
  initialState: {
    assignments: [],
    currentPage: 1,
    totalPages: 1,
    currentAssignment: {},
    loader: true,
    ListLoader: true,
    totalEntry: 0,
  },
  reducers: {
    addAssignments: (state, action) => {
      state.assignments = action.payload.assignment;
      state.totalPages = action.payload.totalPages;
      state.totalEntry = action.payload.totalEntry;
      state.ListLoader = false;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
      state.loader = false;
    },
    setCurrentAssignment: (state, action) => {
      state.currentAssignment = action.payload;
      state.loader = false;
    },
    setListLoader: (state, action) => {
      state.ListLoader = action.payload;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
  },
});

export const {
  addAssignments,
  setPage,
  setCurrentAssignment,
  setListLoader,
  setLoader,
} = slice.actions;

export const getAssignments = () => async (dispatch, getState) => {
  try {
    const { currentPage } = getState().Assignments;
    dispatch(setListLoader(true));
    const assignments = await axios.get(
      `${BASICURL}/assignment?size=3&page=${currentPage}`
    );
    dispatch(addAssignments(assignments.data));
  } catch (err) {
    console.log(err);
  }
};

export const getCurrentAssignment = (id) => async (dispatch, getState) => {
  try {
    dispatch(setLoader(true));
    const currentAssignment = await axios.get(
      `${BASICURL}/assignment/single/${id}`
    );
    dispatch(setCurrentAssignment(currentAssignment.data));
  } catch (err) {
    console.log(err);
  }
};
export default slice.reducer;
