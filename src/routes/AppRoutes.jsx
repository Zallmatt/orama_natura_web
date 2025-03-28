import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import AdminPanel from '../pages/AdminPanel';
import Productos from '../pages/Productos';
import Promociones from '../pages/Promociones';
import Contacto from '../pages/Contacto';
import Lanzamientos from '../pages/Lanzamientos'
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export const AppRoutes = ({ addToCart }) => (
  <Routes>
    <Route path="/home" element={<HomePage addToCart={addToCart} />} />
    <Route path="/productos" element={<Productos />} />
    <Route path="/promociones" element={<Promociones />} />
    <Route path="/contacto" element={<Contacto />} />
    <Route path="/login" element={<Login />} />
    <Route path="/lanzamientos" element={<Lanzamientos />} />
    <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
    <Route path="/" element={<Navigate to="/home" />} /> {/* Redirección */}
    <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
  </Routes>
);
