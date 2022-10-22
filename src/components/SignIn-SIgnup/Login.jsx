import React, { useEffect, useState } from "react";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Input,
  Stack,
  InputGroup,
  InputRightElement,
  Button,
  Image,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import Masai from "../../Assets/Masai.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { loginCheck } from "../../redux/Login";
export const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
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
    <Box display={"flex"} justifyContent="center" h="80vh">
      <Box
        p={4}
        boxShadow="md"
        borderRadius={"lg"}
        width={"30%"}
        display="flex"
        mt={"auto"}
        mb={"auto"}
        flexDir={"column"}
        justifyContent={"center"}
      >
        <Box margin={"auto"}>
          <Image src={Masai} boxSize="120px" />
        </Box>
        <Stack as="form" spacing={4} letterSpacing={2} onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              placeholder="Enter your email address"
              id="email"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
              <Input
                placeholder="Enter your password"
                id="password"
                type={visible ? "password" : "text"}
                autoComplete={"true"}
                onChange={handleChange}
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
            LOG IN
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
