import {
  Box,
  Flex,
  MenuList,
  MenuItem,
  MenuDivider,
  Menu,
  MenuButton,
  Avatar,
  Image,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../redux/Login";
import Masai from "../../Assets/Masai.svg";
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
  const { status, name, role } = useSelector((store) => store.loginInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Box
      position={"sticky"}
      w="100%"
      top={0}
      zIndex={3000}
      backgroundColor="white"
      textUnderlineOffset={19}
      border={"0px solid #e5e7eb"}
      borderBottom={"1px solid #e5e7eb"}
      display="flex"
      alignItems="center"
    >
      <Box ml={10} mr={4}>
        <Image
          src={Masai}
          _hover={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
          boxSize="50px"
        />
      </Box>
      <ButtonGroup colorScheme="transparant" variant={"ghost"}>
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
      </ButtonGroup>
      <Flex alignItems={"center"} ml="auto" mr={4}>
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
          >
            <Avatar size={"sm"} name={name === "" ? "M S" : name} />
          </MenuButton>
          <MenuList>
            {role && role === "admin" && (
              <MenuItem as={Link} to="/admin">
                Admin
              </MenuItem>
            )}
            <MenuDivider />
            {status && (
              <MenuItem onClick={() => dispatch(logOut())}>Log Out</MenuItem>
            )}
            {!status && (
              <>
                <MenuItem as={Link} to="/login">
                  Login
                </MenuItem>
                <MenuDivider />
                <MenuItem as={Link} to="/signup">
                  Signup
                </MenuItem>
              </>
            )}
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};
