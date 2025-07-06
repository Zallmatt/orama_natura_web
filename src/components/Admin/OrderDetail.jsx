import React from "react";
import "./OrderDetail.css";

const OrderDetail = ({ order }) => {
  if (!order.order_items || order.order_items.length === 0) {
    return <p>No hay productos en esta orden.</p>;
  }

  return (
    <div className="order-detail">
      <h4>Productos de la Orden:</h4>
      <table className="order-detail-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.order_items.map((item) => (
            <tr key={item.id}>
              <td>
                {item.products?.image_url ? (
                  <img
                    src={item.products.image_url}
                    alt={item.products.name}
                    className="order-item-img"
                  />
                ) : (
                  "Sin imagen"
                )}
              </td>
              <td>{item.products?.name || "Producto desconocido"}</td>
              <td>{item.quantity}</td>
              <td>${Number(item.unit_price).toFixed(2)}</td>
              <td>${Number(item.total_price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetail;
