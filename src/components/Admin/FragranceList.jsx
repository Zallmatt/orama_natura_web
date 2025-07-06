// src/components/Admin/FragranceList.jsx
import React from "react";
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
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {fragrances.map((frag) => (
          <tr key={frag.id}>
            <td>{frag.id}</td>
            <td>{frag.name}</td>
            <td>
              <button className="edit-btn" onClick={() => onEdit(frag)}>
                Editar
              </button>
              <button className="delete-btn" onClick={() => onDelete(frag.id)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FragranceList;
