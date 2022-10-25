import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Input,
  FormControl,
  Button,
  Select,
  FormLabel,
} from "@chakra-ui/react";
import { v4 as uuid } from "uuid";
import {
  category,
  instructorListLecture,
  type,
} from "../../constants/constants";
import { useDispatch } from "react-redux";
import { getAssignments } from "../../redux/AssignmentData";
const flexBox = {
  mt: 4,
  justifyContent: "space-between",
  display: "flex",
};
export const Filter = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const interval = useRef();
  const [objSet, setObjState] = useState({
    category: "",
    scheduled: "",
    type: "",
    search: "",
    instructor: "",
    optional: "",
  });
  const resetFun = () => {
    setObjState({
      category: "",
      scheduled: "",
      type: "",
      search: "",
      instructor: "",
      optional: "",
    });
    setSearch("");
    dispatch(getAssignments());
  };
  const setSearchFun = (value) => {
    if (interval.current) {
      clearInterval(interval.current);
    }

    interval.current = setTimeout(() => {
      setSearch(value);
    }, 2000);
  };
  useEffect(() => {
    let bodySet = "";
    for (let key in objSet) {
      if (objSet[key] !== "") {
        bodySet += `${key}=${objSet[key].toLowerCase()}&`;
      }
    }
    dispatch(getAssignments(bodySet));
  }, [objSet, search]);

  return (
    <>
      <Box mb={6} p={6} boxShadow="md">
        <Box>
          <FormControl>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              id="title"
              type={"text"}
              defaultValue={search}
              onChange={(e) => setSearchFun(e.target.value)}
              placeholder="Search..."
            />
          </FormControl>
        </Box>
        <Box {...flexBox}>
          <FormControl w={"32%"}>
            <FormLabel htmlFor="category">Category</FormLabel>
            <Select
              id="category"
              type={"text"}
              value={objSet.category}
              onChange={(e) =>
                setObjState({ ...objSet, category: e.target.value })
              }
              placeholder="choose"
            >
              {category &&
                category.map((item) => <option key={uuid()}>{item}</option>)}
            </Select>
          </FormControl>

          <FormControl w={"32%"}>
            <FormLabel htmlFor="type">Type</FormLabel>
            <Select
              id="type"
              type={"text"}
              placeholder={"choose"}
              value={objSet.type}
              onChange={(e) => setObjState({ ...objSet, type: e.target.value })}
            >
              {type && type.map((item) => <option key={uuid()}>{item}</option>)}
            </Select>
          </FormControl>

          <FormControl w={"32%"}>
            <FormLabel htmlFor="instructors">Instructors</FormLabel>
            <Select
              id="instructors"
              type={"text"}
              placeholder={"choose"}
              value={objSet.instructor}
              onChange={(e) =>
                setObjState({ ...objSet, instructor: e.target.value })
              }
            >
              {instructorListLecture &&
                instructorListLecture.map((item) => (
                  <option key={uuid()}>{item}</option>
                ))}
            </Select>
          </FormControl>
        </Box>
        <Box display={"flex"} mt={4}>
          <FormControl w={"32%"}>
            <FormLabel htmlFor="scheduled">Scheduled</FormLabel>
            <Input
              type="date"
              onChange={(e) =>
                setObjState({ ...objSet, scheduled: e.target.value })
              }
              id="scheduled"
            />
          </FormControl>

          <FormControl w={"32%"} ml={6}>
            <FormLabel htmlFor="optional">Optional</FormLabel>
            <Select
              placeholder={"choose"}
              id="optional"
              type={"text"}
              value={objSet.optional}
              onChange={(e) =>
                setObjState({ ...objSet, optional: e.target.value })
              }
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box display={"flex"} justifyContent="flex-end" pr={6}>
        <Button
          backgroundColor={"#4f46e5"}
          textColor="white"
          onClick={resetFun}
          _hover={{ backgroundColor: "#4f46e5", textColor: "white" }}
        >
          Reset Filters
        </Button>
      </Box>
    </>
  );
};
