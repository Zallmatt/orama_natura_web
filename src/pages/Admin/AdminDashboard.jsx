import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import { FaBoxOpen, FaTags, FaGift } from "react-icons/fa";

import { getProducts } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { getPromotions } from "../../services/promotionService";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    promotions: 0,
  });
  const [loading, setLoading] = useState(true);

  const actions = [
    { label: "Gestionar Productos", path: "/admin/productos" },
    { label: "Gestionar Categorías", path: "/admin/categorias" },
    { label: "Gestionar Fragancias", path: "/admin/fragancias" },
    { label: "Gestionar Promociones", path: "/admin/promociones" },
    { label: "Gestionar Órdenes", path: "/admin/ordenes" },
    { label: "Gestionar Estadísticas", path: "/admin/estadisticas" },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, categoriesRes, promotionsRes] = await Promise.all([
          getProducts(),
          getCategories(),
          getPromotions(),
        ]);

        setStats({
          products: productsRes.length,
          categories: categoriesRes.length,
          promotions: promotionsRes.length,
        });
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Panel de Administración</h1>

      {loading ? (
        <p>Cargando estadísticas...</p>
      ) : (
        <>
          <div className="dashboard-stats">
            <StatCard
              icon={<FaBoxOpen size={28} color="#a97c50" />}
              value={stats.products}
              label="Productos publicados"
            />
            <StatCard
              icon={<FaTags size={28} color="#a97c50" />}
              value={stats.categories}
              label="Categorías activas"
            />
            <StatCard
              icon={<FaGift size={28} color="#a97c50" />}
              value={stats.promotions}
              label="Promociones vigentes"
            />
          </div>

          <div className="dashboard-actions">
            {actions.map((action) => (
              <button
                key={action.path}
                onClick={() => navigate(action.path)}
              >
                {action.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Componente de tarjeta de estadística
const StatCard = ({ icon, value, label }) => (
  <div className="stat-card">
    {icon}
    <h3>{value}</h3>
    <p>{label}</p>
  </div>
);

export default AdminDashboard;
