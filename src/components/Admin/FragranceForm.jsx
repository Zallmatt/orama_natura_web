// src/components/Admin/FragranceForm.jsx
import React, { useState, useEffect } from "react";
import "./FragranceForm.css";
import { getCategories } from "../../services/categoryService";

const FragranceForm = ({ initialData, onSave, onCancel }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [categoryId, setCategoryId] = useState(initialData?.category_id || "");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error al cargar categorías:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !categoryId) {
      alert("El nombre y la categoría son obligatorios.");
      return;
    }
    onSave({ 
      name, 
      category_id: parseInt(categoryId, 10) 
    });
  };

  const isFormValid = name.trim() !== "" && categoryId !== "";

  return (
    <form className="fragrance-form" onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: '20px' }}>{initialData ? "Editar Fragancia" : "Crear Fragancia"}</h2>
      
      <div className="form-group">
        <label>
          Nombre de la fragancia:
          <input
            type="text"
            placeholder="Ej: Castaña"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          Categoría:
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            disabled={loading}
          >
            <option value="">{loading ? "Cargando categorías..." : "Seleccione una categoría"}</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-actions">
        <button 
          type="submit" 
          disabled={!isFormValid || loading}
          className={!isFormValid ? "btn-disabled" : ""}
        >
          {initialData ? "Actualizar" : "Crear"}
        </button>
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FragranceForm;
