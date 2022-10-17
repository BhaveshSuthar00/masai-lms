import React, { useState } from "react";
import { Box, Input, Button } from "@chakra-ui/react";
import { registerWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginCheck } from "../../redux/Login";
export const SignUp = () => {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { id, value } = event.target;
    setData({ ...data, [id]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    registerWithEmailAndPassword(data.name, data.email, data.password).then(
      () => {
        dispatch(loginCheck());
        navigate("/");
      }
    );
  };
  return (
    <>
      <Box as="form" onSubmit={handleSubmit}>
        <Input
          placeholder="Enter your name"
          type="name"
          onChange={handleChange}
          id="name"
        />
        <Input
          placeholder="Enter your email Id"
          type="email"
          onChange={handleChange}
          id="email"
        />
        <Input
          placeholder="Enter your password"
          type="password"
          autoComplete="off"
          onChange={handleChange}
          id="password"
        />
        <Input type="submit" />
      </Box>
      <Button onClick={() => signInWithGoogle()}> Register with Google</Button>
    </>
  );
};
