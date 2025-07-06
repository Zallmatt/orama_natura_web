import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css"; // si deseas estilos separados

const Sidebar = () => (
  <aside className="admin-sidebar">
    <nav>
      <ul>
        <li><NavLink to="/admin">Inicio</NavLink></li>
        <li><NavLink to="/admin/productos">Productos</NavLink></li>
        <li><NavLink to="/admin/categorias">Categorías</NavLink></li>
        <li><NavLink to="/admin/fragancias">Fragancias</NavLink></li>
        <li><NavLink to="/admin/promociones">Promociones</NavLink></li>
        <li><NavLink to="/admin/estadisticas">Estadísticas</NavLink></li>
        <li><NavLink to="/admin/ordenes">Órdenes</NavLink></li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
