import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAssignments, setPage } from "../../redux/AssignmentData";
import { List } from "../common/List";
import { v4 as uuid } from "uuid";
import { PP } from "../common/PP";
import CommonPag from "../common/CommonPag";
import { Filter } from "../common/Filter";
import { category, instructorList, type } from "../../constants/constants";
export const Assignments = () => {
  const dispatch = useDispatch();
  const getListFun = (value) => {
    if (value) {
      dispatch(getAssignments());
      return;
    }
    dispatch(getAssignments());
  };
  const setCurrentFun = (value) => dispatch(setPage(value));
  const { totalPages, assignments, ListLoader, totalEntry, currentPage } =
    useSelector((state) => state.Assignments);
  useEffect(() => {
    dispatch(getAssignments());
  }, []);
  return (
    <Box boxShadow="lg">
      <PP title={"Assignments"} />
      <Box w={"80%"} ml="auto" mr="auto" mt={16} boxShadow={"md"}>
        <Filter
          category={category}
          type={type}
          instructor={instructorList}
          getListFun={getListFun}
        />
        {assignments &&
          assignments.map((item) => (
            <List key={uuid()} item={{ ...item, link: "assignments" }} />
          ))}
        <CommonPag
          totalPages={totalPages}
          itemList={assignments}
          ListLoader={ListLoader}
          totalEntry={totalEntry}
          currentPage={currentPage}
          getListFun={getListFun}
          setCurrentFun={setCurrentFun}
        />
      </Box>
    </Box>
  );
};
