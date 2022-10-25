import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Textarea,
  FormLabel,
  useToast,
  Input,
  Select,
} from "@chakra-ui/react";
import { v4 as uuid } from "uuid";
import {
  category,
  instructorListLecture,
  options,
  typeLectures,
} from "../../constants/constants";
import { Post } from "../../constants/common";
export const Lecture = () => {
  const [assignmentData, setAssignmentData] = useState({
    headers: "",
    title: "",
    description: "",
    fromdate: "",
    toDate: "",
    instructor: "",
  });
  const [instructor, setInstructor] = useState("");
  const [typeIs, setType] = useState("");
  const toast = useToast();
  const [optional, setOptional] = useState(false);
  const [theDate, setTheDate] = useState("");
  const [categoryIs, setCategoryIs] = useState("");
  const handleChange = (event) => {
    const { id, value } = event.target;
    setAssignmentData({ ...assignmentData, [id]: value.toLowerCase() });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let obj = {
      ...assignmentData,
      instructor,
      type: typeIs,
      optional,
      category: categoryIs,
      scheduled: theDate,
    };
    Post(obj, "lecture").then((res) => {
      toast({
        title: "Success.",
        description: "Lecture is added successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    });
    setAssignmentData({
      headers: "",
      title: "",
      description: "",
      instructor: "",
    });
  };
  useEffect(() => {
    return () => {
      setAssignmentData({
        headers: "",
        title: "",
        description: "",
        instructor: "",
      });
      setTheDate("");
      setCategoryIs("");
      setOptional(false);
      setType("");
      setInstructor("");
    };
  }, []);
  return (
    <Box w="85%" m={"auto"} justifyContent="center" display="flex">
      <Box as="form" flex={1} onSubmit={handleSubmit}>
        <FormControl mt={4} isRequired>
          <FormLabel>Header</FormLabel>
          <Input
            id="headers"
            type="text"
            value={assignmentData.headers}
            onChange={handleChange}
            placeholder="Header of the lecture"
          />
        </FormControl>

        <FormControl mt={4} isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            id="title"
            type="text"
            value={assignmentData.title}
            onChange={handleChange}
            placeholder="Title of the lecture"
          />
        </FormControl>

        <FormControl mt={4} isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            id="description"
            type="text"
            value={assignmentData.description}
            onChange={handleChange}
            placeholder="Enter Description"
          />
        </FormControl>

        <FormControl mt={4} isRequired>
          <FormLabel>Date</FormLabel>
          <Input
            id="scheduled"
            type="datetime-local"
            onChange={(e) => setTheDate(e.target.value)}
          />
        </FormControl>
        <Box
          display={"flex"}
          mt={4}
          letterSpacing={2}
          justifyContent="space-between"
          flexWrap={"wrap"}
        >
          <FormControl mt={4} isRequired w={"20%"}>
            <FormLabel>Instructor</FormLabel>
            <Select
              placeholder="Choose"
              id="instructor"
              onChange={(e) => setInstructor(e.target.value)}
              value={instructor}
            >
              {instructorListLecture &&
                instructorListLecture.map((item) => (
                  <option key={uuid()}>{item}</option>
                ))}
            </Select>
          </FormControl>

          <FormControl mt={4} isRequired w={"20%"}>
            <FormLabel>Type</FormLabel>
            <Select
              placeholder="Choose"
              id="type"
              value={typeIs}
              onChange={(e) => setType(e.target.value)}
            >
              {typeLectures &&
                typeLectures.map((item) => (
                  <option key={uuid()}>{item}</option>
                ))}
            </Select>
          </FormControl>

          <FormControl mt={4} isRequired w={"20%"}>
            <FormLabel>Optional</FormLabel>
            <Select
              placeholder="Choose"
              value={optional ? "Yes" : "No"}
              id="optional"
              onChange={(e) => setOptional(e.target.value)}
            >
              {options &&
                options.map((item) => (
                  <option key={uuid()}>{item ? "Yes" : "No"}</option>
                ))}
            </Select>
          </FormControl>

          <FormControl mt={4} isRequired w={"20%"}>
            <FormLabel>Category</FormLabel>
            <Select
              placeholder="Choose"
              id="category"
              value={categoryIs}
              onChange={(e) => setCategoryIs(e.target.value)}
            >
              {category &&
                category.map((item) => <option key={uuid()}>{item}</option>)}
            </Select>
          </FormControl>
        </Box>

        <FormControl mb={4} mt={4}>
          <Input type={"submit"} />
        </FormControl>
      </Box>
    </Box>
  );
};
