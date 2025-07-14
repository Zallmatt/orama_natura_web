import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ open, onClose }) => (
  <aside className={`admin-sidebar ${open ? "open" : ""}`}>
    <nav>
      <ul>
        <li><NavLink to="/admin" onClick={onClose}>Inicio</NavLink></li>
        <li><NavLink to="/admin/productos" onClick={onClose}>Productos</NavLink></li>
        <li><NavLink to="/admin/categorias" onClick={onClose}>Categorías</NavLink></li>
        <li><NavLink to="/admin/fragancias" onClick={onClose}>Fragancias</NavLink></li>
        <li><NavLink to="/admin/promociones" onClick={onClose}>Promociones</NavLink></li>
        <li><NavLink to="/admin/ordenes" onClick={onClose}>Órdenes</NavLink></li>
        <li><NavLink to="/admin/estadisticas" onClick={onClose}>Estadísticas</NavLink></li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
