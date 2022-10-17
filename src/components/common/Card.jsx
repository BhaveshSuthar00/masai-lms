import { Box } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Card = ({ item, link, status }) => {
  return (
    <>
      <Box display={"flex"}>
        <Box>
          <Link to={link}>{item}</Link>
        </Box>
        <Box>{status}</Box>
      </Box>
    </>
  );
};
