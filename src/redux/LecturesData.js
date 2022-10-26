import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASICURL } from "../constants/constants";

const slice = createSlice({
  name: "lectures",
  initialState: {
    lectures: [],
    currentPage: 1,
    totalPages: 1,
    loader: true,
    ListLoader: true,
    currentLecture: {},
    totalEntry: 0,
    searchQuery: "",
  },
  reducers: {
    addLectures: (state, action) => {
      state.totalPages = action.payload.totalPages;
      state.lectures = action.payload.lectures;
      state.totalEntry = action.payload.totalEntry;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCurrentLecture: (state, action) => {
      state.currentLecture = action.payload;
      state.loader = false;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setListLoader: (state, action) => {
      state.ListLoader = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    resetLecutres: (state, action) => {
      state.lectures = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.loader = true;
      state.ListLoader = true;
      state.currentLecture = {};
      state.totalEntry = 0;
      state.searchQuery = "";
    },
  },
});

export const {
  addLectures,
  setCurrentPage,
  setListLoader,
  setLoader,
  setCurrentLecture,
  resetLecutres,
} = slice.actions;

export const getLectures = (body) => async (dispatch, getState) => {
  try {
    dispatch(setListLoader(true));
    const { currentPage } = getState().Lectures;
    let data;
    if (body) {
      data = await axios.get(
        `${BASICURL}/lecture/api?size=3&page=${currentPage}&${body}`
      );
    } else {
      data = await axios.get(`${BASICURL}/lecture?size=3&page=${currentPage}`);
    }
    dispatch(addLectures(data.data));
    dispatch(setListLoader(false));
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentLecture = (id) => async (dispatch) => {
  try {
    dispatch(setLoader(true));
    const lecture = await axios.get(`${BASICURL}/lecture/${id}`);
    dispatch(setCurrentLecture(lecture.data));
  } catch (error) {
    throw new Error(error);
  }
};

export default slice.reducer;
