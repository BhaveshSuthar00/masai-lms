import React from "react";
import { chakra, Box, Text } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getLectures, setCurrentPage } from "../../redux/LecturesData";
const Pagination = () => {
  const { totalPages, lectures, ListLoader, totalEntry, currentPage } =
    useSelector((state) => state.Lectures);
  const dispatch = useDispatch();
  const handlePageChange = (page, changePage) => {
    if (changePage) {
      dispatch(setCurrentPage(changePage));
      dispatch(getLectures());
      return;
    } else if (currentPage === 1 && page === -1) {
      return;
    } else if (currentPage === totalPages && page === 1) {
      return;
    } else {
      dispatch(setCurrentPage(currentPage + page));
      dispatch(getLectures());
    }
  };
  if (ListLoader) {
    return <></>;
  }
  return (
    <Box
      display="flex"
      direction={{ base: "column", sm: "row" }}
      justify={"space-between"}
      p={3}
      py={4}
      alignItems="center"
      boxShadow={"sm"}
      border="0 solid #e5e7eb"
    >
      <Box display="flex" flex={1}>
        <Text>
          Showing{" "}
          {totalPages !== currentPage
            ? lectures.length * currentPage - 2
            : totalEntry - lectures.length}
          &nbsp;to&nbsp;
          {totalPages !== currentPage
            ? lectures.length * currentPage
            : totalEntry}
          &nbsp;of {totalEntry} results
        </Text>
      </Box>
      <Box
        display={"flex"}
        aria-label="Pagination"
        justifySelf={"flex-end"}
        alignItems="center"
      >
        <Box>
          <PaginationButton
            isDisabled={currentPage - 1 === 0}
            onClick={() => currentPage > 1 && handlePageChange(-1)}
          >
            <AiOutlineLeft size={21} />
          </PaginationButton>
        </Box>
        <Box display={"flex"}>
          {Array(totalPages)
            .fill("")
            .map((_, index) => (
              <PaginationButton
                isDisabled={currentPage === index + 1 ? true : false}
                onClick={() =>
                  currentPage !== index + 1 && handlePageChange("", index + 1)
                }
                isActive={currentPage === index + 1 ? true : false}
                key={uuid()}
              >
                {index + 1}
              </PaginationButton>
            ))}
        </Box>
        <Box>
          <PaginationButton
            isDisabled={totalPages === currentPage}
            onClick={() => currentPage < totalPages && handlePageChange(1)}
          >
            <AiOutlineRight size={21} />
          </PaginationButton>
        </Box>
      </Box>
    </Box>
  );
};
const PaginationButton = ({ children, onClick, isDisabled, isActive }) => {
  const activeStyle = {
    bg: "darkblue",
    color: "white",
  };
  return (
    <chakra.button
      py={1}
      px={3}
      onClick={onClick}
      border="1px solid"
      borderColor={"blue.100"}
      rounded="md"
      _hover={!isDisabled && activeStyle}
      cursor={isDisabled && "not-allowed"}
      {...(isActive && activeStyle)}
    >
      {children}
    </chakra.button>
  );
};

export default Pagination;
