import React, { useState, useEffect } from "react";
import "./ProductoForm.css";
import { getFragrancesByCategory } from "../../services/fragranceService";

const ProductoForm = ({ initialData, onSave, onCancel, categories, fragrances = [], promotions = [] }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    discount: 0,
    stock: 0,
    image_url: "",
    category_id: "",
    fragrance_id: "",
    promotion_id: "",
    is_launch: false,
  });

  const [filteredFragrances, setFilteredFragrances] = useState(fragrances);

  useEffect(() => {
    const fetchFragrances = async () => {
      // Si no hay categoría, o si es la categoría inicial del producto y ya tenemos fragrances como prop
      if (!form.category_id) {
        setFilteredFragrances(fragrances);
        return;
      }

      try {
        const data = await getFragrancesByCategory(form.category_id);
        setFilteredFragrances(data);
      } catch (err) {
        console.error("Error fetching fragrances for category:", err);
        setFilteredFragrances([]);
      }
    };

    fetchFragrances();
  }, [form.category_id, fragrances]);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price || "",
        discount: initialData.discount || 0,
        stock: initialData.stock || 0,
        image_url: initialData.image_url || "",
        category_id: initialData.category_id || "",
        fragrance_id: initialData.fragrance_id || "",
        promotion_id: initialData.promotion_id || "",
        is_launch: initialData.is_launch || false,
      });
    }
  }, [initialData]);
  console.log("Fragrances:", fragrances);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category_id) {
      alert("Por favor completa al menos nombre, precio y categoría.");
      return;
    }
    const payload = {
      ...form,
      fragrance_id: form.fragrance_id === "" ? null : parseInt(form.fragrance_id)
    };
    onSave(payload);
  };


  return (
    <>
      <h2 className="titulo-accion">{initialData ? "Editar Producto" : "Crear Producto"}</h2>
      <form className="producto-form" onSubmit={handleSubmit}>
        {/* DATOS DEL PRODUCTO */}
        <fieldset>
          <legend>Datos del producto</legend>
          <div className="form-row">
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
              Categoría:
              <select
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </label>
          </div>
          <label>
            Fragancia:
            <select
              name="fragrance_id"
              value={form.fragrance_id || ""}
              onChange={handleChange}
            >
              <option value="">Sin fragancia</option>
              {filteredFragrances.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Descripción:
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Promoción:
            <select
              name="promotion_id"
              value={form.promotion_id || ""}
              onChange={handleChange}
            >
              <option value="">Sin promoción</option>
              {promotions.map((promo) => (
                <option key={promo.id} value={promo.id}>
                  {promo.title} ({promo.percentage_off}%)
                </option>
              ))}
            </select>
          </label>

          <div className="form-row">
            <label>
              Stock:
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
              />
            </label>
            <label className="image-field">
              Imagen (URL):
              <input
                type="text"
                name="image_url"
                value={form.image_url}
                onChange={handleChange}
              />
              {form.image_url && (
                <div className="imagen-preview">
                  <img src={form.image_url} alt="Preview" />
                </div>
              )}
            </label>
          </div>
        </fieldset>

        {/* VALORES Y LANZAMIENTO */}
        <fieldset>
          <legend>Valores y lanzamiento</legend>
          <div className="form-row">
            <label>
              Precio:
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Descuento (%):
              <input
                type="number"
                name="discount"
                value={form.discount}
                onChange={handleChange}
              />
            </label>
          </div>
          <p>
            <strong>Precio final:</strong>{" "}
            ${form.price ? (form.price * (1 - form.discount / 100)).toFixed(2) : "0.00"}
          </p>

          <label className="checkbox">
            <input
              type="checkbox"
              name="is_launch"
              checked={form.is_launch}
              onChange={handleChange}
            />
            Lanzamiento
          </label>
        </fieldset>

        <div className="form-actions">
          <button type="submit">{initialData ? "Actualizar" : "Crear"}</button>
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductoForm;
