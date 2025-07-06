import React, { useState, useEffect } from "react";
import "./CategoriaForm.css";

const CategoriaForm = ({ initialData, onSave, onCancel }) => {
  const [form, setForm] = useState({
    name: "",
    color: "#b5cfde",
    order_index: 1,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        color: initialData.color || "#b5cfde",
        order_index: initialData.order_index || 1,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) {
      alert("Por favor ingresa un nombre.");
      return;
    }
    onSave(form);
  };

  return (
    <form className="categoria-form" onSubmit={handleSubmit}>
      <h2>{initialData ? "Editar Categoría" : "Crear Categoría"}</h2>

      <label>
        Nombre:
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Color:
        <input
          type="color"
          name="color"
          value={form.color}
          onChange={handleChange}
        />
      </label>

      <label>
        Orden:
        <input
          type="number"
          name="order_index"
          value={form.order_index}
          onChange={handleChange}
        />
      </label>

      <div className="form-actions">
        <button type="submit">{initialData ? "Actualizar" : "Crear"}</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default CategoriaForm;
