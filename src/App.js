// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import UserLayout from "./Layout/UserLayout";
import UserRoutes from "./config/routes";
import AdminRoutes from "./config/adminRoutes";
import AdminLogin from "./admin/auth/AdminLogin";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin login route - no layout */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Admin routes with admin layout */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* User routes with user layout */}
        <Route
          path="/*"
          element={
            <UserLayout>
              <UserRoutes />
            </UserLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
