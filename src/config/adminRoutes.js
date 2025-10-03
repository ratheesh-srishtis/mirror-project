// src/config/adminRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../admin/Layout/AdminLayout";
import Dashboard from "../admin/Components/Dashboard";
import AddVoices from "../admin/Components/AddVoices";
import AddBlogs from "../admin/Components/AddBlogs";
import ManageContent from "../admin/Components/ManageContent";
import PrivateRoute from "./PrivateRoute";

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        {/* Protected admin routes */}
        <Route
          path="/dashboard"
          element={<PrivateRoute>{/* <Dashboard /> */}</PrivateRoute>}
        />
        <Route
          path="/add-voices"
          element={<PrivateRoute>{/* <AddVoices /> */}</PrivateRoute>}
        />
        <Route
          path="/add-blogs"
          element={
            <PrivateRoute>
              <AddBlogs />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-content"
          element={<PrivateRoute>{/* <ManageContent /> */}</PrivateRoute>}
        />
        {/* Default admin route redirects to dashboard */}
        <Route
          path="/"
          element={<PrivateRoute>{/* <Dashboard /> */}</PrivateRoute>}
        />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
