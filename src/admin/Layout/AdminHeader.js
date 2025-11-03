import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Css/Layout/header.css";
import devConfig from "../../config/devConfig";

const AdminHeader = () => {
  const Logo = require("../../assets/images/mirrorLogo.png");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Check if we're in development mode
  const isDevMode = devConfig.isDevMode();

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <span>
            <img className="logo" src={Logo} alt="Mirror Project Logo" />
          </span>
          <span className="footer__company-name">
            Mirror Project - Admin
            {isDevMode && (
              <span
                style={{
                  color: "#ff6b35",
                  fontSize: "0.8em",
                  marginLeft: "8px",
                  fontWeight: "bold",
                }}
              >
                [DEV MODE]
              </span>
            )}
          </span>
        </div>
        <nav className={`header__nav ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/admin/dashboard");
                }}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/admin/add-voices");
                }}
              >
                Add Voices
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/admin/add-blogs");
                }}
              >
                Add Blogs
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/admin/manage-content");
                }}
              >
                Manage Content
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
                style={{ color: "#ff4444" }}
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>
        <button
          className={`header__burger ${menuOpen ? "open" : ""}`}
          onClick={handleMenuToggle}
          aria-label="Toggle menu"
        >
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
