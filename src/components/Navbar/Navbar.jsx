import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../firebase";
import { logOut } from "../../redux/Login";

export const Navbar = () => {
  const { status } = useSelector((store) => store.loginInfo);
  const dispatch = useDispatch();
  console.log(status);
  return (
    <Box m={3}>
      <ButtonGroup spacing={2} colorScheme="blackAlpha" variant={"ghost"}>
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
        <Button as={Link} to="/home">
          Home
        </Button>
        <Button as={Link} to="/lectures">
          Lectures
        </Button>
        <Button as={Link} to="/assignments">
          Assignments
        </Button>
        <Button as={Button} to="/admin">
          Admin
        </Button>
      </ButtonGroup>
    </Box>
  );
};
