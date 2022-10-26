import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Textarea,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { v4 as uuid } from "uuid";
import {
  category,
  instructorList,
  options,
  type,
} from "../../constants/constants";
import { Post } from "../../constants/common";
export const Assignment = () => {
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
    };
    Post(obj, "assignment").then((res) => {
      toast({
        title: "Success.",
        description: "Assignment is added successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    });
    setAssignmentData({
      headers: "",
      title: "",
      description: "",
      fromdate: "",
      toDate: "",
      instructor: "",
    });
  };
  useEffect(() => {
    return () => {
      setAssignmentData({
        headers: "",
        title: "",
        description: "",
        fromdate: "",
        toDate: "",
        instructor: "",
      });
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
            placeholder="Header of the assignment"
          />
        </FormControl>

        <FormControl mt={4} isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            id="title"
            type="text"
            value={assignmentData.title}
            onChange={handleChange}
            placeholder="Title of the assignment"
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
        <Box display={"flex"} justifyContent="space-between">
          <FormControl mt={4} isRequired w={"45%"}>
            <FormLabel>From Date</FormLabel>
            <Input
              id="fromDate"
              type="datetime-local"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={4} isRequired w={"45%"}>
            <FormLabel>To Date</FormLabel>
            <Input id="toDate" type="datetime-local" onChange={handleChange} />
          </FormControl>
        </Box>
        <Box
          display={"flex"}
          mt={4}
          letterSpacing={2}
          justifyContent="space-between"
          flexWrap={"wrap"}
        >
          <FormControl isRequired w={"20%"}>
            <FormLabel>Instructor</FormLabel>
            <Select
              placeholder="Choose"
              id="instructor"
              onChange={(e) => setInstructor(e.target.value.toLowerCase())}
              value={instructor}
            >
              {instructorList &&
                instructorList.map((item) => (
                  <option key={uuid()} value={item.toLowerCase()}>
                    {item}
                  </option>
                ))}
            </Select>
          </FormControl>

          <FormControl isRequired w={"20%"}>
            <FormLabel>Type</FormLabel>
            <Select
              placeholder="Choose"
              id="type"
              value={typeIs}
              onChange={(e) => setType(e.target.value.toLowerCase())}
            >
              {type &&
                type.map((item) => (
                  <option key={uuid()} value={item.toLowerCase()}>
                    {item}
                  </option>
                ))}
            </Select>
          </FormControl>

          <FormControl isRequired w={"20%"}>
            <FormLabel>Optional</FormLabel>
            <Select
              placeholder="Choose"
              value={optional ? "Yes" : "No"}
              id="optional"
              onChange={(e) => setOptional(e.target.value.toLowerCase())}
            >
              {options &&
                options.map((item) => (
                  <option key={uuid()}>{item ? "Yes" : "No"}</option>
                ))}
            </Select>
          </FormControl>

          <FormControl isRequired w={"20%"}>
            <FormLabel>Category</FormLabel>
            <Select
              placeholder="Choose"
              id="category"
              value={categoryIs}
              onChange={(e) => setCategoryIs(e.target.value.toLowerCase())}
            >
              {category &&
                category.map((item) => (
                  <option key={uuid()} value={item.toLowerCase()}>
                    {item}
                  </option>
                ))}
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
