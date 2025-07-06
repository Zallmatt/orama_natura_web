import React, { useState } from "react";
import OrderDetail from "./OrderDetail";
import "./OrdersList.css";

const OrdersList = ({ orders }) => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  if (orders.length === 0) {
    return <p>No hay órdenes registradas.</p>;
  }

  const toggleDetail = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  return (
    <table className="orders-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Productos</th>
          <th>Fecha</th>
          <th>Total</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => {
          const cliente =
            order.users?.name && order.users?.surname
              ? `${order.users.name} ${order.users.surname}`
              : "Desconocido";
          const totalItems = order.order_items
            ? order.order_items.reduce((acc, item) => acc + item.quantity, 0)
            : 0;

          return (
            <React.Fragment key={order.id}>
              <tr>
                <td>{order.id}</td>
                <td>{cliente}</td>
                <td>{totalItems} productos</td>
                <td>
                  {order.created_at
                    ? new Date(order.created_at).toLocaleDateString("es-AR")
                    : "-"}
                </td>
                <td>${Number(order.total_amount || 0).toFixed(2)}</td>
                <td>
                  <span
                    className={`status-badge status-${order.status || "pending"}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn-detail"
                    onClick={() => toggleDetail(order.id)}
                  >
                    {expandedOrderId === order.id ? "Ocultar" : "Ver Detalle"}
                  </button>
                </td>
              </tr>
              {expandedOrderId === order.id && (
                <tr>
                  <td colSpan="7">
                    <OrderDetail order={order} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default OrdersList;
