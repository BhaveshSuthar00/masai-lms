import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASICURL } from "../constants/constants";

const slice = createSlice({
  name: "assignments",
  initialState: {
    assignments: [],
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    addAssignments: (state, action) => {
      state.assignments = action.payload.assignments;
      state.totalPages = action.payload.totalPages;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

const { addAssignments, setCurrentPage } = slice.actions;

export const getAssignments = () => async (dispatch, getState) => {
  try {
    const { currentPage } = getState().assignments;
    console.log(currentPage);
    const assignments = await axios.get(
      `${BASICURL}/assignment?size=3&page=${currentPage}`
    );
    // console.log(assignments);
    dispatch(addAssignments(assignments.data));
  } catch (err) {
    console.log(err);
  }
};

export default slice.reducer;
