import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Auth/LoginPage";
import PrivateRouteAdmin from "./PrivateRouteAdmin";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ProductosPage from "../pages/Admin/ProductosPage";
import CategoiasPage from "../pages/Admin/CategoriasPage";
import PromocionesPage from "../pages/Admin/PromocionesPage";
import OrdersPage from "../pages/Admin/OrdersPage";
import FragrancesPage from "../pages/Admin/FragrancesPage";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

// Rutas públicas
import ProductsPage from "../pages/Home/ProductsPage";
import PromotionsPage from "../pages/Home/PromocionesPage";
import LaunchesPage from "../pages/Home/LaunchesPage";
import ContactPage from "../pages/Home/ContactPage";
import ProductDetailPage from "../pages/Home/ProductDetailPage";  
import CartPage from "../pages/Home/CartPage"; // Asegúrate de importar la página del carrito

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      {/* Rutas públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/productos" element={<ProductsPage />} />
      <Route path="/producto/:id" element={<ProductDetailPage />} />
      <Route path="/promociones" element={<PromotionsPage />} />
      <Route path="/lanzamientos" element={<LaunchesPage />} />
      <Route path="/contacto" element={<ContactPage />} />
      <Route path="/carrito" element={<CartPage />} />

      {/* Rutas admin dentro de MainLayout */}
      <Route
        path="/admin"
        element={
          <PrivateRouteAdmin>
            <AdminLayout /> {/* Sidebar y outlet */}
          </PrivateRouteAdmin>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="productos" element={<ProductosPage />} />
        <Route path="categorias" element={<CategoiasPage />} />
        <Route path="promociones" element={<PromocionesPage />} />
        <Route path="ordenes" element={<OrdersPage />} />
        <Route path="fragancias" element={<FragrancesPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<h1>Página no encontrada</h1>} />
    </Route>
  </Routes>
);

export default AppRoutes;
