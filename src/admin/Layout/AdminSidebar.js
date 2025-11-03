import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../admin/css/sidebar.css";
import devConfig from "../../config/devConfig";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PublicIcon from '@mui/icons-material/Public';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const AdminSidebar = () => {
  const Logo = require("../../assets/images/mirrorLogo.png");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're in development mode
  const isDevMode = devConfig.isDevMode();

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <DashboardIcon fontSize="medium" />,
      path: "/admin/dashboard",
      onClick: () => navigate("/admin/dashboard"),
    },
    {
      id: "continents",
      label: "Continents",
      icon: <PublicIcon fontSize="medium" />,
      path: "/admin/continents",
      onClick: () => navigate("/admin/continents"),
    },
    {
  id: "manage-videos",
  label: "Manage Videos",
  icon: <ArticleIcon fontSize="medium" />, // You can use a more suitable icon, e.g. VideoLibraryIcon
  path: "/admin/manage-videos",
  onClick: () => navigate("/admin/manage-videos"),
},
    {
      id: "add-videos",
      label: "Add Videos",
      icon: <RecordVoiceOverIcon fontSize="medium" />,
      path: "/admin/add-videos",
      onClick: () => navigate("/admin/add-videos"),
    },
    {
      id: "add-blogs",
      label: "Add Blogs",
      icon: <ArticleIcon fontSize="medium" />,
      path: "/admin/add-blogs",
      onClick: () => navigate("/admin/add-blogs"),
    },
    {
      id: "manage-content",
      label: "Manage Content",
      icon: <SettingsIcon fontSize="medium" />,
      path: "/admin/manage-content",
      onClick: () => navigate("/admin/manage-content"),
    },
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Header with Menu Toggle */}
      <div className="admin-mobile-header">
        <div className="admin-mobile-header__content">
          <div className="admin-mobile-header__logo">
            <img className="logo" src={Logo} alt="Mirror Project Logo" />
            <span className="admin-mobile-header__title">
              Mirror Project - Admin
              {isDevMode && <span className="dev-mode-badge">[DEV MODE]</span>}
            </span>
          </div>
          <button
            className={`sidebar-toggle ${sidebarOpen ? "open" : ""}`}
            onClick={handleSidebarToggle}
            aria-label="Toggle sidebar"
          >
            <span className="toggle-bar"></span>
            <span className="toggle-bar"></span>
            <span className="toggle-bar"></span>
          </button>
        </div>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* Desktop Logo Section */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img className="logo" src={Logo} alt="Mirror Project Logo" />
            <div className="sidebar-title">
              <span className="sidebar-title-main">Mirror Project</span>
              <span className="sidebar-title-sub">
                Admin Panel
                {isDevMode && <span className="dev-mode-badge">[DEV]</span>}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li key={item.id} className="sidebar-menu-item">
                <a
                  className={`sidebar-menu-link ${
                    isActiveRoute(item.path) ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    item.onClick();
                    setSidebarOpen(false); // Close sidebar on mobile after navigation
                  }}
                >
                  <span className="sidebar-menu-icon">{item.icon}</span>
                  <span className="sidebar-menu-text">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Section */}
        <div className="sidebar-footer">
          <button
            className="sidebar-logout-btn"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <span className="sidebar-menu-icon"><LogoutIcon fontSize="medium" /></span>
            <span className="sidebar-menu-text">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
