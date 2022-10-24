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
const flexBox = {
  mt: 4,
  justifyContent: "space-between",
  display: "flex",
};
export const Filter = () => {
  return (
    <>
      <Box mb={6} p={6} boxShadow="md">
        <Box>
          <FormControl>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input type={"text"} placeholder="Search..." />
          </FormControl>
        </Box>
        <Box {...flexBox}>
          <FormControl w={"32%"}>
            <FormLabel htmlFor="title">Category</FormLabel>
            <Select placeholder="choose">
              {category &&
                category.map((item) => <option key={uuid()}>{item}</option>)}
            </Select>
          </FormControl>

          <FormControl w={"32%"}>
            <FormLabel htmlFor="title">Type</FormLabel>
            <Select placeholder={"choose"}>
              {type && type.map((item) => <option key={uuid()}>{item}</option>)}
            </Select>
          </FormControl>

          <FormControl w={"32%"}>
            <FormLabel htmlFor="title">Instructors</FormLabel>
            <Select placeholder={"choose"}>
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
            <Input type="date" id="scheduled" />
          </FormControl>

          <FormControl w={"32%"} ml={6}>
            <FormLabel htmlFor="optional">Optional</FormLabel>
            <Select placeholder={"choose"} id="optional">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box display={"flex"} justifyContent="flex-end" pr={6}>
        <Button
          backgroundColor={"#4f46e5"}
          textColor="white"
          _hover={{ backgroundColor: "#4f46e5", textColor: "white" }}
        >
          Reset Filters
        </Button>
      </Box>
    </>
  );
};
