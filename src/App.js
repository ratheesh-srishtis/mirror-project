// src/App.js
import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import UserLayout from "./Layout/UserLayout";
import UserRoutes from "./config/routes";
import AdminRoutes from "./config/adminRoutes";
import AdminLogin from "./admin/auth/AdminLogin";
import { useLoader } from "./contest/LoaderContext";
import { setLoaderSetter } from "./config/api";
import { setLoaderSetter as setPublicLoaderSetter } from "./config/publicApi"; // Add this import

function App() {
    const { loading, setLoading } = useLoader();

  // connect loader to both axios instances
  useEffect(() => {
    setLoaderSetter(setLoading);
    setPublicLoaderSetter(setLoading); // Add this line
  }, [setLoading]);
  return (
    <>
     {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
      
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
    
    </>
  
  );
}

export default App;
