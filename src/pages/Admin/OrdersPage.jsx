// src/pages/Admin/OrdersPage.jsx
import React, { useState, useEffect } from "react";
import { getOrders } from "../../services/orderService";
import OrdersList from "../../components/Admin/OrdersList";
import OrderDetail from "../../components/Admin/OrderDetail";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      console.error("Error cargando órdenes:", err);
      alert("Error cargando órdenes.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseDetail = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="orders-page">
      <h1>Gestión de Órdenes</h1>
      {loading ? (
        <p>Cargando órdenes...</p>
      ) : (
        <OrdersList orders={orders} onViewDetail={handleViewDetail} />
      )}

      {selectedOrder && (
        <OrderDetail order={selectedOrder} onClose={handleCloseDetail} />
      )}
    </div>
  );
};

export default OrdersPage;
