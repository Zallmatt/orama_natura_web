import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";
import "./AdminLayout.css";

const AdminLayout = () => (
  <div className="admin-layout">
    <div className="admin-body">
      <Sidebar />
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  </div>
);

export default AdminLayout;
