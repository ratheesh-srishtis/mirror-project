import React from "react";
import "../css/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="admin-content-container">
        <div className="admin-card">
          <div className="admin-card-header">
            <h1 className="admin-card-title">Admin Dashboard</h1>
            <p className="admin-card-subtitle">
              Welcome to the Mirror Project Admin Panel
            </p>
          </div>
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>Total Voices</h3>
              <p>Coming soon...</p>
            </div>
            <div className="dashboard-card">
              <h3>Total Blogs</h3>
              <p>Coming soon...</p>
            </div>
            <div className="dashboard-card">
              <h3>Recent Activity</h3>
              <p>Coming soon...</p>
            </div>
            <div className="dashboard-card">
              <h3>Quick Actions</h3>
              <p>Coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
