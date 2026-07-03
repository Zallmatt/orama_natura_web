// src/components/Admin/FragranceList.jsx
import React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import "./FragranceList.css";

const FragranceList = ({ fragrances, onEdit, onDelete }) => {
  if (fragrances.length === 0) {
    return <p>No hay fragancias registradas.</p>;
  }

  return (
    <table className="fragrance-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Categoría Asociada</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {fragrances.map((frag) => (
          <tr key={frag.id}>
            <td>{frag.id}</td>
            <td>{frag.name}</td>
            <td>
              <span className={`badge category-badge category-badge-${frag.categories?.name?.toLowerCase().replace(/\s+/g, '-') || 'none'}`}>
                {frag.categories?.name || "Sin categoría"}
              </span>
            </td>
            <td style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button className="edit-btn" onClick={() => onEdit(frag)} title="Editar" style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FaPencilAlt />
              </button>
              <button className="delete-btn" onClick={() => onDelete(frag.id)} title="Eliminar" style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FaTrashAlt />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FragranceList;
