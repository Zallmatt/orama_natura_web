import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartDropdown from './ShoppingCartDropdown';
import './Navbar.css';

const Navbar = ({ cartItems, removeFromCart, sendToWhatsApp, deliveryOption, handleDeliveryOptionChange }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    const cartIconRef = useRef(null);

    const toggleDropdown = (event) => {
        event.stopPropagation();
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
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/productos">PRODUCTOS</Link>
                <Link to="/promociones">PROMOCIONES</Link>
            </div>

            <div className="navbar-center">
                <Link to="/" className="navbar-logo">
                    <img src="/logo_Orama.png" alt="Logo" />
                    <span>ORAMA</span>
                </Link>
            </div>

            <div className="navbar-right">
                <Link to="/lanzamientos">LANZAMIENTOS</Link>
                <Link to="/contacto">CONTACTOS</Link>
                
                <div className="navbar-cart" ref={cartIconRef} onClick={toggleDropdown}>
                    <img src="/cart-icon.png" alt="Carrito" className="cart-icon" />
                    {cartItems.length > 0 && (
                        <span className="cart-count">{cartItems.length}</span>
                    )}
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
            </div>
        </nav>
    );
};

export default Navbar;
