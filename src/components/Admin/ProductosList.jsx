// src/components/Admin/ProductosList.jsx
import React from "react";
import "./ProductosList.css";

const ProductosList = ({
  productos,
  onEdit,
  onDelete,
  onActivate,
  showInactive,
}) => {
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
            <td>
              {prod.image_url ? (
                <img
                  src={prod.image_url}
                  alt={prod.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    display: "block",
                    margin: "0 auto",
                    borderRadius: "4px"
                  }}
                />
              ) : (
                "Sin imagen"
              )}
            </td>
            <td>{prod.name}</td>
            <td>
              {prod.fragrances
                ? prod.fragrances.name
                : "Sin fragancia"}
            </td>
            <td>{prod.description}</td>
            <td>${prod.price}</td>
            <td>{prod.discount}%</td>
            <td>${(prod.price * (1 - prod.discount / 100)).toFixed(2)}</td>
            <td className={prod.stock < 5 ? "stock-bajo" : ""}>{prod.stock}</td>
            <td>{prod.categories?.name}</td>
            <td>{prod.promotions?.title || "Sin promoción"}</td>
            <td>
              {prod.is_launch ? (
                <span style={{ color: "#4caf50", fontSize: "18px" }}>✔️</span>
              ) : (
                <span style={{ color: "#d32f2f", fontSize: "18px" }}>✖️</span>
              )}
            </td>
            <td>
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
    </table>
  );
};

export default ProductosList;
