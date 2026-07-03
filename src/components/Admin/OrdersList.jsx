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

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pagado':
      case 'paid':
        return 'status-paid';
      case 'cancelado':
      case 'cancelled':
        return 'status-cancelled';
      case 'pendiente':
      case 'pending':
      default:
        return 'status-pending';
    }
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case 'pagado':
      case 'paid':
        return 'Pagado';
      case 'cancelado':
      case 'cancelled':
        return 'Cancelado';
      case 'pendiente':
      case 'pending':
      default:
        return 'Pendiente';
    }
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
                <td data-label="ID">{order.id}</td>
                <td data-label="Cliente">{cliente}</td>
                <td data-label="Productos">{totalItems} productos</td>
                <td data-label="Fecha">
                  {order.created_at
                    ? new Date(order.created_at).toLocaleDateString("es-AR")
                    : "-"}
                </td>
                <td data-label="Total">
                  {Number(order.total_amount || 0).toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </td>
                <td data-label="Estado">
                  <span
                    className={`status-badge ${getStatusClass(order.status)}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </td>
                <td data-label="Acciones">
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
