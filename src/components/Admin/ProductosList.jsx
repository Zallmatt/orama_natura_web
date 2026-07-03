// src/components/Admin/ProductosList.jsx
import "./ProductosList.css";
import React, { useState } from "react";
import { FaImage } from "react-icons/fa";

const ProductosList = ({
  productos,
  onEdit,
  onDelete,
  onActivate,
  showInactive,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const formatCurrency = (value) => {
    if (value == null) return "---";
    return Number(value).toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
  };

  return (
    <table className="productos-list">
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Fragancia</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Descuento</th>
          <th>Precio Final</th>
          <th>Stock</th>
          <th>Categoría</th>
          <th>Promocion</th>
          <th>Lanzamiento</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((prod) => (
          <tr
            key={prod.id}
            className={!prod.is_active ? "producto-inactivo" : ""}
          >
            <td data-label="Imagen">
              {prod.image_url ? (
                <img
                  src={prod.image_url}
                  alt={prod.name}
                  onClick={() => setSelectedImage(prod.image_url)}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    display: "block",
                    margin: "0 auto",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "transform 0.2s"
                  }}
                />
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50px', height: '50px', margin: '0 auto', backgroundColor: '#f0f0f0', borderRadius: '4px', color: '#999' }}>
                  <FaImage size={24} />
                </div>
              )}
            </td>
            <td data-label="Nombre">{prod.name}</td>
            <td data-label="Fragancia">
              {prod.fragrances ? prod.fragrances.name : "Sin fragancia"}
            </td>
            <td data-label="Descripción">{prod.description}</td>
            <td data-label="Precio">{prod.price != null ? formatCurrency(prod.price) : "---"}</td>
            <td data-label="Descuento">{prod.discount != null ? `${prod.discount}%` : "---"}</td>
            <td data-label="Precio Final" style={{ fontWeight: 'bold' }}>
              {prod.discount > 0 && prod.price != null && (
                <div style={{ textDecoration: 'line-through', color: '#999', fontSize: '0.8rem', marginBottom: '2px' }}>
                  {formatCurrency(prod.price)}
                </div>
              )}
              {prod.final_price != null ? formatCurrency(prod.final_price) : "---"}
            </td>
            <td data-label="Stock" className={prod.stock < 5 ? "stock-bajo" : ""}>{prod.stock}</td>
            <td data-label="Categoría">
              <span className={`badge category-badge category-badge-${prod.categories?.name?.toLowerCase().replace(/\s+/g, '-') || 'none'}`}>
                {prod.categories?.name || "Sin categoría"}
              </span>
            </td>
            <td data-label="Promoción">
              <span className={`badge promo-badge promo-badge-${prod.promotions?.title ? 'active' : 'none'}`}>
                {prod.promotions?.title || "Sin promoción"}
              </span>
            </td>
            <td data-label="Lanzamiento">
              {prod.is_launch ? (
                <span className="badge launch-badge">¡NUEVO!</span>
              ) : (
                <span style={{ color: "#aaa" }}>-</span>
              )}
            </td>
            <td data-label="Acciones">
              <div className="productos-actions">
                {showInactive ? (
                  <button
                    className="activate"
                    onClick={() => onActivate(prod.id)}
                  >
                    Reactivar
                  </button>
                ) : (
                  <>
                    <button className="edit" onClick={() => onEdit(prod)}>
                      Editar
                    </button>
                    <button
                      className="delete"
                      onClick={() => onDelete(prod.id)}
                    >
                      Desactivar
                    </button>
                  </>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <div className="image-modal-content">
            <img src={selectedImage} alt="Producto" />
            <span className="close-button">&times;</span>
          </div>
        </div>
      )}
    </table>

  );
};

export default ProductosList;
