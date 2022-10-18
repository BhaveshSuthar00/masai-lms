import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../redux/Login";

export const Navbar = () => {
  const { status, role } = useSelector((store) => store.loginInfo);
  const dispatch = useDispatch();
  return (
    <Box mt={3} mb={3} borderBottom={"1px solid black"}>
      <ButtonGroup spacing={2} colorScheme="transparant" variant={"ghost"}>
        {status && <Button onClick={() => dispatch(logOut())}>SignOut</Button>}
        {!status && (
          <Button as={Link} to="/login">
            Login
          </Button>
        )}
        {!status && (
          <Button as={Link} to="/signup">
            Signup
          </Button>
        )}
        <Button as={Link} to="/lectures">
          Lectures
        </Button>
        <Button as={Link} to="/assignments">
          Assignments
        </Button>
        {role && role === "admin" && (
          <Button as={Link} to="/admin">
            Admin
          </Button>
        )}
      </ButtonGroup>
    </Box>
  );
};
