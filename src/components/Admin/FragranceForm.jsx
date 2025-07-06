// src/components/Admin/FragranceForm.jsx
import React, { useState } from "react";
import "./FragranceForm.css";

const FragranceForm = ({ initialData, onSave, onCancel }) => {
  const [name, setName] = useState(initialData?.name || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("El nombre es obligatorio.");
      return;
    }
    onSave({ name });
  };

  return (
    <form className="fragrance-form" onSubmit={handleSubmit}>
      <label>
        Nombre de la fragancia:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <div className="form-actions">
        <button type="submit">{initialData ? "Actualizar" : "Crear"}</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default FragranceForm;
