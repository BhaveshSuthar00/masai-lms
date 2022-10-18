import axios from "axios";
import { BASICURL } from "./constants";

export const Post = async (body, route) => {
  try {
    await axios.post(`${BASICURL}/${route}/create`, body);
    return true;
  } catch (err) {
    console.log(err);
  }
};

export const colorFun = (category) => {
  switch (category.toLowerCase()) {
    case "coding": {
      return "gray.500";
    }
    case "frontend": {
      return "green.300";
    }
    case "backend": {
      return "green.400";
    }
    case "oj": {
      return "pink.500";
    }
    case "full-stack": {
      return "blue.300";
    }
    default:
      return "gray";
  }
};
