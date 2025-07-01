// Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartDropdown from '../ShoppingCart/ShoppingCartDropdown';
import HamburgerIcon from './HamburgerIcon';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = ({ cartItems, removeFromCart, sendToWhatsApp, deliveryOption, handleDeliveryOptionChange }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const cartIconRef = useRef(null);
  const { isAuthenticated, logout, user } = useAuth();

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !cartIconRef.current.contains(event.target)
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav className="navbar">
        {/* LEFT */}
        <div className="navbar-section navbar-left">
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <HamburgerIcon open={menuOpen} />
          </div>
          <div className="nav-links-desktop">
            <Link to="/productos">PRODUCTOS</Link>
            <Link to="/promociones">PROMOCIONES</Link>
          </div>
        </div>

        {/* CENTER */}
        <div className="navbar-section navbar-center">
          <Link to="/" className="navbar-logo">
            <img src="/logo_Orama.png" alt="Logo" />
            <span>ORAMA</span>
          </Link>
        </div>

        {/* RIGHT */}
        <div className="navbar-section navbar-right">
          <div className="nav-links-desktop">
            <Link to="/lanzamientos">LANZAMIENTOS</Link>
            <Link to="/contacto">CONTACTOS</Link>

            {isAuthenticated && (
              <>
                {user?.role === 'admin' && (
                  <>
                    <hr className="admin-separator" />
                    <span className="admin-label">Panel Admin</span>
                    <Link to="/admin/productos" className="admin-link">Productos</Link>
                    <Link to="/admin/categorias" className="admin-link">Categorías</Link>
                    <Link to="/admin/ofertas" className="admin-link">Ofertas</Link>
                  </>
                )}
              </>
            )}

            {!isAuthenticated && <Link to="/login">LOGIN</Link>}
          </div>
        </div>

        {/* 🛒 CARRITO */}
        <div className="navbar-cart" ref={cartIconRef} onClick={toggleDropdown}>
          <img src="/cart-icon.png" alt="Carrito" className="cart-icon" />
          {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
          {dropdownVisible && (
            <div ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
              <ShoppingCartDropdown
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                sendToWhatsApp={sendToWhatsApp}
                deliveryOption={deliveryOption}
                handleDeliveryOptionChange={handleDeliveryOptionChange}
              />
            </div>
          )}
        </div>
      </nav>

      {/* ☰ MENÚ MOBILE */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/productos" onClick={() => setMenuOpen(false)}>PRODUCTOS</Link>
          <Link to="/promociones" onClick={() => setMenuOpen(false)}>PROMOCIONES</Link>
          <Link to="/lanzamientos" onClick={() => setMenuOpen(false)}>LANZAMIENTOS</Link>
          <Link to="/contacto" onClick={() => setMenuOpen(false)}>CONTACTOS</Link>

          {isAuthenticated ? (
            <>
              <span className="navbar-user">Hola, {user?.name || user?.username || 'usuario'}</span>

              {user?.role === 'admin' && (
                <>
                  <hr className="admin-separator" />
                  <span className="admin-label">Zona Admin</span>
                  <Link to="/admin/productos" onClick={() => setMenuOpen(false)}>🛒 Productos</Link>
                  <Link to="/admin/categorias" onClick={() => setMenuOpen(false)}>🏷 Categorías</Link>
                  <Link to="/admin/ofertas" onClick={() => setMenuOpen(false)}>🎯 Ofertas</Link>
                </>
              )}
              <button onClick={() => { logout(); setMenuOpen(false); }} className="logout-btn">
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>LOGIN</Link>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
