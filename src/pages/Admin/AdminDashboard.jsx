import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import { FaBoxOpen, FaTags, FaGift } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h1>Panel de Administración</h1>

      {/* Tarjetas de estadísticas */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <FaBoxOpen size={28} color="#a97c50" />
          <h3>120</h3>
          <p>Productos publicados</p>
        </div>
        <div className="stat-card">
          <FaTags size={28} color="#a97c50" />
          <h3>8</h3>
          <p>Categorías activas</p>
        </div>
        <div className="stat-card">
          <FaGift size={28} color="#a97c50" />
          <h3>15</h3>
          <p>Ofertas vigentes</p>
        </div>
      </div>

      {/* Atajos rápidos */}
      <div className="dashboard-actions">
        <button onClick={() => navigate("/admin/productos")}>
          Gestionar Productos
        </button>
        <button onClick={() => navigate("/admin/categorias")}>
          Gestionar Categorías
        </button>
        <button onClick={() => navigate("/admin/ofertas")}>
          Gestionar Ofertas
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
