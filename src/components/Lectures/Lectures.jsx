import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLectures } from "../../redux/LecturesData";
import { v4 as uuid } from "uuid";
import moment from "moment";
import { Link } from "react-router-dom";
import { List } from "../common/List";
export const Lectures = () => {
  const { currentPage, lectures } = useSelector((store) => store.Lectures);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLectures());
  }, []);
  return (
    <Box>
      <Box w={"80%"} ml="auto" mr="auto">
        {lectures &&
          lectures.map((item) => <List item={{ ...item, link: "lectures" }} />)}
      </Box>
    </Box>
  );
};
