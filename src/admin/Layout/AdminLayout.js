import React from "react";
import AdminHeader from "./AdminHeader";
import Footer from "../../Layout/Footer";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <AdminHeader />
      <main className="admin-main">{children}</main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
