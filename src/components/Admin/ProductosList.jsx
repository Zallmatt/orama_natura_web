// src/components/Admin/ProductosList.jsx
import "./ProductosList.css";
import React, { useState } from "react";

const ProductosList = ({
  productos,
  onEdit,
  onDelete,
  onActivate,
  showInactive,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);

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
                "Sin imagen"
              )}
            </td>
            <td data-label="Nombre">{prod.name}</td>
            <td data-label="Fragancia">
              {prod.fragrances ? prod.fragrances.name : "Sin fragancia"}
            </td>
            <td data-label="Descripción">{prod.description}</td>
            <td data-label="Precio">${prod.price}</td>
            <td data-label="Descuento">{prod.discount}%</td>
            <td data-label="Precio Final">${(prod.price * (1 - prod.discount / 100)).toFixed(2)}</td>
            <td data-label="Stock" className={prod.stock < 5 ? "stock-bajo" : ""}>{prod.stock}</td>
            <td data-label="Categoría">{prod.categories?.name}</td>
            <td data-label="Promoción">{prod.promotions?.title || "Sin promoción"}</td>
            <td data-label="Lanzamiento">
              {prod.is_launch ? (
                <span style={{ color: "#4caf50", fontSize: "18px" }}>✔️</span>
              ) : (
                <span style={{ color: "#d32f2f", fontSize: "18px" }}>✖️</span>
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
