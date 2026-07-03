import React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import "./CategoriasList.css";

const CategoriasList = ({ categorias, onEdit, onDelete }) => (
  <div className="categorias-list">
    {categorias.map((cat) => (
      <div key={cat.id} className="categoria-card">
        <div className="color-preview" style={{ backgroundColor: cat.color }}></div>
        <div className="categoria-info">
          <h3>{cat.name}</h3>
          <p>Orden: {cat.order_index}</p>
        </div>
        <div className="categoria-actions">
          <button onClick={() => onEdit(cat)} title="Editar" style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaPencilAlt />
          </button>
          <button className="delete-btn" onClick={() => onDelete(cat.id)} title="Eliminar" style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaTrashAlt />
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default CategoriasList;
