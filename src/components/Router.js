import React from "react";
import { Route, Routes } from "react-router-dom";
import { Admin } from "./Admin/Admin";
import { Assignments } from "./Assignments/Assignments";
import { Home } from "./Home/Home";
import { Lectures } from "./Lectures/Lectures";
import { Login } from "./SignIn-SIgnup/Login";
import { SignUp } from "./SignIn-SIgnup/Signup";
import { v4 as uuid } from "uuid";
export const Router = () => {
  return (
    <Routes>
      {["/", "/home"].map((path) => (
        <Route key={uuid()} path={path} element={<Home />} />
      ))}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/lectures" element={<Lectures />} />
      <Route path="/assignments" element={<Assignments />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};
