import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAssignments } from "../../redux/AssignmentData";
import { List } from "../common/List";
import { v4 as uuid } from "uuid";
import AssignmentPagination from "./AssignmentPagination";
export const Assignments = () => {
  const dispatch = useDispatch();
  const { assignments } = useSelector((store) => store.Assignments);
  useEffect(() => {
    dispatch(getAssignments());
  }, []);
  return (
    <>
      <Box>
        {assignments &&
          assignments.map((item) => (
            <List key={uuid()} item={{ ...item, link: "assignments" }} />
          ))}
        <AssignmentPagination />
      </Box>
    </>
  );
};
