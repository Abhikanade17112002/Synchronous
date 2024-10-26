import { getUser } from "@/store/userSlice/userSlice";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AuthRoutes = ({ children }) => {
  const location = useLocation();
  const user = useSelector((state) => state.user);


  if (!user.authenticated && !location.pathname.includes("/auth")) {
    return <Navigate to={"/auth"}></Navigate>;
  }
  if (user.authenticated && location.pathname.includes("/auth")) {
    return <Navigate to={"/chat"}></Navigate>;
  }
  return children;
};

export default AuthRoutes;
