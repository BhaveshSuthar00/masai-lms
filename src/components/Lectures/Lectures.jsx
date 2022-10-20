import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLectures } from "../../redux/LecturesData";
import { v4 as uuid } from "uuid";
import { List } from "../common/List";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pangination";
export const Lectures = () => {
  const { currentPage, lectures } = useSelector((store) => store.Lectures);
  const { role } = useSelector((store) => store.loginInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLectures());
  }, []);
  // useEffect(() => {
  //   if (role === "") navigate("/login");
  // }, [role]);
  return (
    <Box>
      <Box w={"80%"} ml="auto" mr="auto">
        {lectures &&
          lectures.map((item) => (
            <List key={uuid()} item={{ ...item, link: "lectures" }} />
          ))}
        <Pagination />
      </Box>
    </Box>
  );
};
