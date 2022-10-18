import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASICURL } from "../constants/constants";

const slice = createSlice({
  name: "lectures",
  initialState: {
    lectures: [],
    currentPage: 1,
    totalPages: 1,
    currentLecture: {},
  },
  reducers: {
    addLectures: (state, action) => {
      state.totalPages = action.payload.totalPages;
      state.lectures = action.payload.lectures;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCurrentLecture: (state, action) => {
      state.currentLecture = action.payload;
    },
  },
});

export const { addLectures, setCurrentPage, setCurrentLecture } = slice.actions;

export const getLectures = () => async (dispatch, getState) => {
  try {
    const { currentPage } = getState().Lectures;
    const data = await axios.get(
      `${BASICURL}/lecture?size=3&page=${currentPage}`
    );
    console.log(data.data);
    dispatch(addLectures(data.data));
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentLecture = (id) => async (dispatch) => {
  try {
    const lecture = await axios.get(`${BASICURL}/lecture/${id}`);
    dispatch(setCurrentLecture(lecture.data));
  } catch (error) {
    throw new Error(error);
  }
};

// https://masai-lms-lpg.herokuapp.com/assignment
export default slice.reducer;
