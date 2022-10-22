import React, { useEffect, useState } from "react";
import { Box, Text, Center } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getCurrentLecture, setLoader } from "../../redux/LecturesData";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from "moment";
import { v4 as uuid } from "uuid";
import { colorFun } from "../../constants/common";
export const SingleLecture = () => {
  const { currentLecture, loader } = useSelector((store) => store.Lectures);

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentLecture(id));
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
                {currentLecture.headers}
              </Text>
              &nbsp;
              <Text
                as="span"
                backgroundColor={colorFun(currentLecture.type)}
                borderRadius="lg"
              >
                &nbsp; {currentLecture.type} &nbsp;
              </Text>
              &nbsp;
              <Text
                as="span"
                borderRadius="lg"
                backgroundColor={colorFun(currentLecture.category)}
              >
                &nbsp; {currentLecture.category} &nbsp;
              </Text>
            </Text>
            <Text as="span" fontWeight="bold" color={"gray"} fontSize={"sm"}>
              {currentLecture.instructor.toUpperCase()} &nbsp;
            </Text>
            <Text as="span" fontSize={"sm"}>
              {moment(currentLecture.scheduled).format(
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
          {currentLecture.description.split("/n").map((item) => (
            <Text key={uuid()} fontSize="2xl" lineHeight={"200%"}>
              {item}
            </Text>
          ))}
        </Box>
      </Box>
    </>
  );
};
