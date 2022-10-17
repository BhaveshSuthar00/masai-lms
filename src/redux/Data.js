import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
  name: "data",
  initialState: {
    data: [],
  },
  reducers: {
    addData: (state, action) => {},
  },
});

export const { addData } = slice.actions;

export const getAllData = () => async (disapatch) => {
  try {
    const data = await axios.get(``);
  } catch (error) {
    console.log(error);
  }
};
export default slice.reducer;
