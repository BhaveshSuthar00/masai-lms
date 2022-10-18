import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Lecture } from "./Lecture";
import { Assignment } from "./Assignment";
export const Admin = () => {
  const [toggle, setTogggle] = useState(false);
  const handleToggle = (value) => {
    if (toggle === value) return;
    setTogggle(value);
  };
  return (
    <>
      <Box
        display={"flex"}
        justifyContent="space-evenly"
        textAlign={"center"}
        m={4}
        w={"97%"}
      >
        <Text
          cursor="pointer"
          letterSpacing={2}
          borderBottom={!toggle && "1px solid black"}
          flex={1}
          p={2}
          onClick={() => handleToggle(false)}
        >
          Assignment
        </Text>
        <Text
          letterSpacing={2}
          cursor="pointer"
          p={2}
          borderBottom={toggle && "1px solid black"}
          flex={1}
          onClick={() => handleToggle(true)}
        >
          Lecture
        </Text>
      </Box>
      {toggle ? <Lecture /> : <Assignment />}
    </>
  );
};
