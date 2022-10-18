import React from "react";
import { Route, Routes } from "react-router-dom";
import { Admin } from "./Admin/Admin";
import { Assignments } from "./Assignments/Assignments";
import { Lectures } from "./Lectures/Lectures";
import { Login } from "./SignIn-SIgnup/Login";
import { SignUp } from "./SignIn-SIgnup/Signup";
import { useSelector } from "react-redux";
import { SingleLecture } from "./Lectures/SingleLecture";
import { SingleAssignment } from "./Assignments/SingleAssignment";
export const Router = () => {
  const { role } = useSelector((store) => store.loginInfo);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/lectures" element={<Lectures />} />
      <Route path="/lectures/:id" element={<SingleLecture />} />
      <Route path="/assignments" element={<Assignments />} />
      <Route path="/assignments/:id" element={<SingleAssignment />} />
      {role && role === "admin" && <Route path="/admin" element={<Admin />} />}
    </Routes>
  );
};
