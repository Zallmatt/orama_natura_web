import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* LOGO */}
        <div className="navbar-logo" onClick={() => navigate("/")}>
          <img src="/logo/logo_Orama.png" alt="Orama Natura" />
          <span>ORAMA NATURA</span>
        </div>

        {/* LINKS DESKTOP */}
        <nav className="navbar-links">
          <NavLink to="/">
            <i className="fas fa-home"></i> Inicio
          </NavLink>
          <NavLink to="/productos">
            <i className="fas fa-store"></i> Productos
          </NavLink>
          <NavLink to="/promociones">
            <i className="fas fa-tags"></i> Promociones
          </NavLink>
          <NavLink to="/lanzamientos">
            <i className="fas fa-bolt"></i> Lanzamientos
          </NavLink>
          <NavLink to="/contacto">
            <i className="fas fa-envelope"></i> Contacto
          </NavLink>
        </nav>

        {/* ICONOS DERECHA */}
        <div className="navbar-actions">
          <button
            className="cart-button"
            onClick={() => navigate("/carrito")}
            aria-label="Carrito"
          >
            <i className="fas fa-shopping-cart"></i>
            {totalItems > 0 && (
              <span className="cart-count">{totalItems}</span>
            )}
          </button>

          {isAuthenticated ? (
            <div className="user-info">
              <span className="user-name">
                <i className="fas fa-user"></i> {user?.name || user?.username}
              </span>
              {user?.role === "admin" && (
                <NavLink to="/admin" className="admin-link">
                  <i className="fas fa-cog"></i> Admin
                </NavLink>
              )}
              <button className="logout-btn" onClick={handleLogout}>
                Salir
              </button>
            </div>
          ) : (
            <button
              className="login-btn"
              onClick={() => navigate("/login")}
            >
              Ingresar
            </button>
          )}

          {/* HAMBURGER */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>

      {/* MENÚ MOBILE */}
      {menuOpen && (
        <nav className={`mobile-menu ${menuOpen ? "open" : ""}`}>          <NavLink to="/" onClick={() => setMenuOpen(false)}>
          <i className="fas fa-home"></i> Inicio
        </NavLink>
          <NavLink to="/productos" onClick={() => setMenuOpen(false)}>
            Productos
          </NavLink>
          <NavLink to="/promociones" onClick={() => setMenuOpen(false)}>
            Promociones
          </NavLink>
          <NavLink to="/lanzamientos" onClick={() => setMenuOpen(false)}>
            Lanzamientos
          </NavLink>
          <NavLink to="/contacto" onClick={() => setMenuOpen(false)}>
            Contacto
          </NavLink>
          {isAuthenticated ? (
            <>
              {user?.role === "admin" && (
                <NavLink to="/admin" onClick={() => setMenuOpen(false)}>
                  Admin
                </NavLink>
              )}
              <button onClick={handleLogout} className="logout-btn">Salir</button>
            </>
          ) : (
            <NavLink to="/login" onClick={() => setMenuOpen(false)}>
              Ingresar
            </NavLink>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
