import React, { useEffect } from "react";
import { Box, Text, Center } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCurrentAssignment, setLoader } from "../../redux/AssignmentData";
import { useParams } from "react-router-dom";
import { colorFun } from "../../constants/common";
import moment from "moment";
import { v4 as uuid } from "uuid";
export const SingleAssignment = () => {
  const { currentAssignment, loader } = useSelector(
    (store) => store.Assignments
  );
  const dispatch = useDispatch();
  console.log(currentAssignment);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getCurrentAssignment(id));
    return () => {
      dispatch(setLoader(true));
    };
  }, [id]);
  if (loader) return <></>;
  return (
    <>
      <Box>
        <Box boxShadow="xl" p={3}>
          <Box width={"80%"} ml="auto" mr="auto">
            <Text fontSize={"xl"}>
              <Text as="span" color="blackAlpha" fontWeight={"bold"}>
                {currentAssignment.headers}
              </Text>
              &nbsp;
              <Text
                as="span"
                backgroundColor={colorFun(currentAssignment.type)}
                borderRadius="lg"
              >
                &nbsp; {currentAssignment.type} &nbsp;
              </Text>
              &nbsp;
              <Text
                as="span"
                borderRadius="lg"
                backgroundColor={colorFun(currentAssignment.category)}
              >
                &nbsp; {currentAssignment.category} &nbsp;
              </Text>
            </Text>
            <Text as="span" fontWeight="bold" color={"gray"} fontSize={"sm"}>
              {currentAssignment.instructor.toUpperCase()} &nbsp;
            </Text>
            <Text as="span" fontSize={"sm"}>
              {moment(currentAssignment.scheduled).format(
                "( d MMM, yyyy - hh:mm )"
              )}
            </Text>
          </Box>
        </Box>
        <Box
          w={"75%"}
          p={"5%"}
          boxShadow="md"
          mt={4}
          borderRadius="md"
          ml={"auto"}
          mr={"auto"}
        >
          <Center mb={4} mt={2}>
            <Text as={"strong"} fontSize="2xl" alignContent={"center"}>
              NOTES
            </Text>
          </Center>
          {currentAssignment.description.split("/n").map((item) => (
            <Text key={uuid()} fontSize="2xl" lineHeight={"200%"}>
              {item}
            </Text>
          ))}
        </Box>
      </Box>
    </>
  );
};
