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
    <Box
      mt={3}
      mb={3}
      textUnderlineOffset={13}
      borderBottom={"1px solid black"}
      display="flex"
      justifyContent={"space-between"}
    >
      <ButtonGroup spacing={1} colorScheme="transparant" variant={"ghost"}>
        <Button
          as={Link}
          to="/lectures"
          _hover={{
            textDecoration: "underline",
            textDecorationColor: "gray.300",
          }}
        >
          Lectures
        </Button>
        <Button
          as={Link}
          to="/assignments"
          _hover={{
            textDecoration: "underline",
            textDecorationColor: "gray.300",
          }}
        >
          Assignments
        </Button>
        {role && role === "admin" && (
          <Button
            as={Link}
            to="/admin"
            _hover={{
              textDecoration: "underline",
              textDecorationColor: "gray.300",
            }}
          >
            Admin
          </Button>
        )}
        {status && (
          <Button
            onClick={() => dispatch(logOut())}
            _hover={{
              textDecoration: "underline",
              textDecorationColor: "gray.300",
            }}
          >
            SignOut
          </Button>
        )}
        {!status && (
          <Button
            as={Link}
            to="/login"
            _hover={{
              textDecoration: "underline",
              textDecorationColor: "gray.300",
            }}
          >
            Login
          </Button>
        )}
        {!status && (
          <Button
            as={Link}
            to="/signup"
            _hover={{
              textDecoration: "underline",
              textDecorationColor: "gray.300",
            }}
          >
            Signup
          </Button>
        )}
      </ButtonGroup>
    </Box>
  );
};
