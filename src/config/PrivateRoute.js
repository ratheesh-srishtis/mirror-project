// src/utils/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // or use context/api check

  if (!token) {
    return <Navigate to="/" replace />; // redirect if no token
  }

  return children;
};

export default PrivateRoute;
