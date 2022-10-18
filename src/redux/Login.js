import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";

const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
  name: "login",
  initialState: {
    email: "",
    status: false,
    role: "",
    name: "",
    uid: "",
  },
  reducers: {
    getLoginInfo: (state, action) => {
      state.status = true;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.uid = action.payload.uid;
      state.name = action.payload.name;
    },
    reset: (state, action) => {
      state.role = "";
      state.uid = "";
      state.status = false;
      state.name = "";
      state.email = "";
      state.status = "";
    },
  },
});

export const { getLoginInfo, reset } = slice.actions;

export const loginCheck = () => async (dispatch) => {
  try {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        let q = query(collection(db, "users"), where("uid", "==", user.uid));
        const data = await getDocs(q);
        data.forEach((doc) => {
          const { role, uid, name, email } = doc.data();
          dispatch(getLoginInfo({ role, uid, name, email }));
        });
      } else dispatch(reset());
    });
  } catch (e) {
    console.log(e);
  }
};

export const logOut = () => async (dispatch) => {
  try {
    signOut(auth);
    dispatch(reset());
  } catch (e) {
    console.log(e);
  }
};

export default slice.reducer;
