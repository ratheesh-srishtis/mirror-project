import React from "react";
import AdminSidebar from "./AdminSidebar";
import Footer from "../../Layout/Footer";
import "../css/adminlayout.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <main className="admin-main">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
