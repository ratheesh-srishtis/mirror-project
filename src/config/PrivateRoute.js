// src/utils/PrivateRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import devConfig from "./devConfig";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken"); // Check for admin token
  const location = useLocation();

  // Check if this is an admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  // In development mode, bypass authentication for admin routes
  if (devConfig.isDevMode() && isAdminRoute) {
    devConfig.devLog(
      "Bypassing authentication for admin route:",
      location.pathname
    );
    return children;
  }

  if (!token) {
    // If no token and it's an admin route, redirect to admin login
    if (isAdminRoute) {
      return <Navigate to="/admin-login" replace />;
    }
    // Otherwise redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
