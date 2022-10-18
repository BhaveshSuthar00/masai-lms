import { Navbar } from "./components/Navbar/Navbar";
import { Router } from "./components/Router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginCheck } from "./redux/Login";
import { getAssignments } from "./redux/AssignmentData";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginCheck());
    // dispatch(getAssignments());
  }, []);

  return (
    <>
      <Navbar />
      <Router />
    </>
  );
}

export default App;
