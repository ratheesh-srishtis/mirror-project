import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const UserLayout = ({ children }) => {
  return (
    <div className="user-layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default UserLayout;
