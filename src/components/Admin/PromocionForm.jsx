import React, { useState } from "react";
import "./PromocionForm.css";

const PromocionForm = ({ initialData, onSave, onCancel }) => {
  const [form, setForm] = useState(
    initialData || {
      title: "",
      description: "",
      start_date: "",
      end_date: "",
      percentage_off: 0,
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form className="promocion-form" onSubmit={handleSubmit}>
      <h2>{initialData ? "Editar Promoción" : "Crear Promoción"}</h2>
      <div className="form-group">
        <label>
          Título
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Descripción
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Fecha de inicio
          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Fecha de fin
          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Descuento (%)
          <input
            type="number"
            name="percentage_off"
            value={form.percentage_off}
            onChange={handleChange}
            min="0"
            max="100"
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">
          {initialData ? "Actualizar" : "Crear"}
        </button>
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default PromocionForm;
