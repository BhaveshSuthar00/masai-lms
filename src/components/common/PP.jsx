import { Box, Text } from "@chakra-ui/react";
export const PP = ({ title }) => {
  return (
    <Box
      ml="auto"
      mr="auto"
      p={2}
      boxShadow={"md"}
      fontWeight={"semibold"}
      fontSize={"2xl"}
    >
      <Text w={"90%"} ml="auto">
        {title}
      </Text>
    </Box>
  );
};
