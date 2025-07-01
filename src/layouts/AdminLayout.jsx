import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/admin/AdminNavbar';
import './AdminLayout.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminNavbar />
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
