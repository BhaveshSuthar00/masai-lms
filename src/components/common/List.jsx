import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import moment from "moment";
import { colorFun } from "../../constants/common";
export const List = ({ item }) => {
  return (
    <Box key={uuid()} p={3} w={"100%"} border="1px solid black">
      <Box>
        <Box
          as={Link}
          to={`/${item.link}/${item._id}`}
          color={"blue.700"}
          fontSize="xl"
        >
          {item.headers}
        </Box>
        &nbsp; &nbsp;
        <Text
          as="span"
          borderRadius={"md"}
          background={colorFun(item.category)}
          color={"white"}
          fontSize="sm"
        >
          &nbsp; {item.category.toUpperCase()} &nbsp;
        </Text>
      </Box>
      <Box>
        <Text as="span" fontWeight="medium" fontSize={"xs"}>
          {item.instructor.split(" ")[0].toLowerCase()} &nbsp;
        </Text>
        <Text as="span" fontSize={"xs"}>
          Created &nbsp;
        </Text>
        <Text as="strong" fontSize={"sm"}>
          as {item.type} problem's at &nbsp;
        </Text>
        <Text as="span" fontSize={"xs"}>
          {moment(item.scheduled).format("d MMM, yyyy - hh:mm")}
        </Text>
      </Box>
    </Box>
  );
};