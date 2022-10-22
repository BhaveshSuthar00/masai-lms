import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Stack,
  Image,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import Masai from "../../Assets/Masai.svg";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { registerWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { loginCheck } from "../../redux/Login";
export const SignUp = () => {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
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
    <Box display={"flex"} justifyContent="center" h="80vh">
      <Box
        p={4}
        boxShadow="md"
        borderRadius={"lg"}
        width={"30%"}
        display="flex"
        mt={"auto"}
        mb={"auto"}
        height={"auto"}
        flexDir={"column"}
        justifyContent={"center"}
      >
        <Box margin={"auto"}>
          <Image src={Masai} boxSize="120px" />
        </Box>
        <Stack as="form" spacing={4} letterSpacing={2} onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              placeholder="Enter your name"
              type="name"
              onChange={handleChange}
              id="name"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">E-Mail</FormLabel>
            <Input
              placeholder="Enter your email Id"
              type="email"
              onChange={handleChange}
              id="email"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
              <Input
                placeholder="Enter your password"
                type={visible ? "password" : "text"}
                autoComplete="off"
                onChange={handleChange}
                id="password"
              />
              <InputRightElement>
                <Button
                  backgroundColor="transparent"
                  variant="ghost"
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            type="submit"
            backgroundColor="#1f2937"
            _hover={{ backgroundColor: "#1f2937" }}
            textColor={"white"}
          >
            Sign up
          </Button>
        </Stack>
        <Box w="100%" mt={3} textAlign="center">
          <Button
            w={"100%"}
            textColor="blackAlpha.800"
            colorScheme="google"
            onClick={() => signInWithGoogle()}
            _hover={{
              textColor: "white",
              backgroundColor: "#1f2937",
              transition: "0.6s all",
            }}
            leftIcon={<FcGoogle />}
          >
            Register with Google
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
