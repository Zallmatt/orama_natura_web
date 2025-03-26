import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartDropdown from './ShoppingCartDropdown'; // Importamos el nuevo componente
import './Navbar.css';

const Navbar = ({ cartItems, removeFromCart, sendToWhatsApp, deliveryOption, handleDeliveryOptionChange }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null); // Creamos una referencia para el dropdown
    const cartIconRef = useRef(null); // Creamos una referencia para el ícono del carrito

    // Función para alternar la visibilidad del dropdown del carrito
    const toggleDropdown = (event) => {
        event.stopPropagation(); // Evitar que el evento de clic se propague
        setDropdownVisible(!dropdownVisible); // Alternar la visibilidad
    };

    // Función para cerrar el dropdown si se hace clic fuera de él o en el icono del carrito
    const handleClickOutside = (event) => {
        // Si el clic es fuera del dropdown y no es en el ícono del carrito, cerrar el dropdown
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            !cartIconRef.current.contains(event.target)
        ) {
            setDropdownVisible(false);
        }
    };

    // Añadimos un event listener para detectar clics fuera del carrito
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo"> {/* Agregamos el Link aquí */}
                <img src="/logo_Orama.png" alt="Logo" />
                <span>ORAMA NATURA</span>
            </Link>
            <div className="navbar-links">
                {/* Icono del carrito */}
                <div
                    className="navbar-cart"
                    ref={cartIconRef}
                    onClick={toggleDropdown} // Clic para abrir/cerrar el dropdown
                >
                    <img src="/cart-icon.png" alt="Carrito" className="cart-icon" />
                    {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}

                    {/* Dropdown del carrito */}
                    {dropdownVisible && (
                        <div ref={dropdownRef} onClick={(e) => e.stopPropagation()}> {/* Prevenir propagación del clic */}
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
                <Link to="/">Catálogo</Link>
                <Link to="/login">Administrador</Link>
            </div>
        </nav>
    );
};

export default Navbar;
