// src/routes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "../Components/About";
import JoinUs from "../Components/JoinUs";
import Voices from "../Components/Voices";
import Blogs from "../Components/Blogs";
import Home from "../Components/Home";
// Admin Components
import AddVoices from "../admin/Components/AddVoices";
import AddBlogs from "../admin/Components/AddBlogs";
import AdminLogin from "../admin/auth/AdminLogin";
// Protected Route Wrapper
import PrivateRoute from "../config/PrivateRoute";
import Videos from "../Components/Videos";
import FAQ from "../Components/FAQ";
const AppRoutes = () => {
  return (
    <Routes basename="">
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/admin-login" element={<AdminLogin />} />

      <Route path="/about" element={<About />} />
      <Route path="/join-us" element={<JoinUs />} />
      <Route path="/voices" element={<Voices />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/videos/:region" element={<Videos />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/faq" element={<FAQ />} />

      {/* Protected routes */}
      <Route
        path="/add-voices"
        element={
          <PrivateRoute>
            <AddVoices />
          </PrivateRoute>
        }
      />
      <Route
        path="/add-blogs"
        element={
          <PrivateRoute>
            <AddBlogs />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
