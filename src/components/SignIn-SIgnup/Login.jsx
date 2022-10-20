import React, { useEffect, useState } from "react";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginCheck } from "../../redux/Login";
export const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    logInWithEmailAndPassword(data.email, data.password);
  };
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      dispatch(loginCheck());
      navigate("/lectures");
    }
  }, [user, loading]);
  return (
    <>
      <Box as="form" onSubmit={handleSubmit}>
        <Input
          placeholder="Enter your email address"
          id="email"
          onChange={handleChange}
        />
        <Input
          placeholder="Enter your password"
          id="password"
          type="password"
          autoComplete={"true"}
          onChange={handleChange}
        />
        <Input type="submit" />
      </Box>
      <Button onClick={() => signInWithGoogle()}> Register with Google</Button>
    </>
  );
};
