import React from "react";
import "../css/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="container">
        <h1>Admin Dashboard</h1>
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
  );
};

export default Dashboard;
