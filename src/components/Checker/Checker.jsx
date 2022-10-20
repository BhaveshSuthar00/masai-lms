import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const Checker = ({ element }) => {
  const { role } = useSelector((store) => store.loginInfo);
  if (role === "") {
    return <Navigate to="/login" />;
  }
  return <>{element}</>;
};
