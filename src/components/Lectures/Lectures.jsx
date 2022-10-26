import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLectures,
  resetLecutres,
  setCurrentPage,
} from "../../redux/LecturesData";
import {
  category,
  instructorListLecture,
  type,
  typeLectures,
} from "../../constants/constants";
import { v4 as uuid } from "uuid";
import { List } from "../common/List";
import { useNavigate } from "react-router-dom";
import { PP } from "../common/PP";
import CommonPag from "../common/CommonPag";
import { Filter } from "../common/Filter";
export const Lectures = () => {
  const { totalPages, lectures, ListLoader, totalEntry, currentPage } =
    useSelector((state) => state.Lectures);
  const { role } = useSelector((store) => store.loginInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setCurrentFun = (value) => dispatch(setCurrentPage(value));
  const getListFun = (value) => {
    if (value) {
      dispatch(getLectures(value));
      return;
    }
    dispatch(getLectures());
  };

  useEffect(() => {
    dispatch(getLectures());
  }, []);
  useEffect(() => {
    if (role === "") {
      dispatch(resetLecutres());
      navigate("/login");
    }
  }, [role]);
  return (
    <Box>
      <PP title={"Lectures"} />
      <Box w={"80%"} ml="auto" mr="auto" boxShadow={"md"} mt={16}>
        <Filter
          getListFun={getListFun}
          category={category}
          type={typeLectures}
          instructor={instructorListLecture}
          listItem={lectures}
        />
        {lectures &&
          lectures.map((item) => (
            <List key={uuid()} item={{ ...item, link: "lectures" }} />
          ))}
        <CommonPag
          totalEntry={totalEntry}
          itemList={lectures}
          ListLoader={ListLoader}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentFun={setCurrentFun}
          getListFun={getListFun}
        />
      </Box>
    </Box>
  );
};
