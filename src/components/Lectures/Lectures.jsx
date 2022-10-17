import { Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const Lectures = () => {
  let [lec, setLec] = useState([]);
  let getLectures = async () => {
    try {
      const lectures = await axios.get(``);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    // getLectures();
  }, []);
  return (
    <>
      <Box></Box>
    </>
  );
};
