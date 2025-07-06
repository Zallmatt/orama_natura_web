import React from "react";
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
          <button onClick={() => onEdit(cat)}>Editar</button>
          <button className="delete-btn" onClick={() => onDelete(cat.id)}>
            Eliminar
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default CategoriasList;
