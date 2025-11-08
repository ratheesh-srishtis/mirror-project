// src/config/adminRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../admin/Layout/AdminLayout";
import Dashboard from "../admin/Components/Dashboard";
import AddVoices from "../admin/Components/AddVoices";
import AddBlogs from "../admin/Components/AddBlogs";
import ManageContent from "../admin/Components/ManageContent";
import PrivateRoute from "./PrivateRoute";
import Continents from "../admin/Components/Continents";
import ManageVideos from "../admin/Components/ManageVideos";
import ManageBlogs from "../admin/Components/ManageBlogs";
import AddAdminBlogs from "../admin/Components/AddAdminBlogs";
import ManageFaqs from "../admin/Components/ManageFaqs";
const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        {/* Protected admin routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              {" "}
              <Dashboard />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/continents"
          element={
            <PrivateRoute>
              {" "}
              <Continents />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-videos"
          element={
            <PrivateRoute>
              {" "}
              <ManageVideos />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/add-videos"
          element={
            <PrivateRoute>
              {" "}
              <AddVoices />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/add-blogs"
          element={
            <PrivateRoute>
              <AddAdminBlogs />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-content"
          element={
            <PrivateRoute>
              {" "}
              <ManageContent />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-blogs"
          element={
            <PrivateRoute>
              {" "}
              <ManageBlogs />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-faqs"
          element={
            <PrivateRoute>
              {" "}
              <ManageFaqs />{" "}
            </PrivateRoute>
          }
        />
        {/* Default admin route redirects to dashboard */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              {" "}
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
