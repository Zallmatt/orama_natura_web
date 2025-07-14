import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";
import "./AdminLayout.css";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      <div className="admin-header-mobile">
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
      </div>
      <div className="admin-body">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
