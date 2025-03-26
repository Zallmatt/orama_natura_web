import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [deliveryOption, setDeliveryOption] = useState('envio'); // Estado para la opción de entrega

    // Función para agregar productos al carrito
    const addToCart = (product) => {
        setCartItems((prevCartItems) => {
            const existingProduct = prevCartItems.find(item => item._id === product._id);

            if (existingProduct) {
                return prevCartItems.map(item =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCartItems, { ...product, quantity: 1 }];
            }
        });
    };

    // Función para eliminar un producto del carrito
    const removeFromCart = (productId) => {
        setCartItems(cartItems.filter(item => item._id !== productId));
    };

    // Función para cambiar la opción de entrega
    const handleDeliveryOptionChange = (event) => {
        setDeliveryOption(event.target.value); // Actualizamos el valor seleccionado
    };

    // Función para enviar el pedido por WhatsApp
    const sendToWhatsApp = () => {
        let message = '¡Hola! Quisiera hacer un pedido:\n\n';
        cartItems.forEach(item => {
            const discountedPrice = (item.price - (item.price * item.discount / 100)).toFixed(2); // Calcular el precio con descuento
            message += `Producto: ${item.name} - Cantidad: ${item.quantity} - Precio con descuento: $${discountedPrice}\n`;
        });
    
        // Calcular el total con los precios con descuento
        const total = cartItems.reduce((total, item) => {
            const discountedPrice = (item.price - (item.price * item.discount / 100));
            return total + discountedPrice * item.quantity;
        }, 0).toFixed(2);
    
        message += `\nTotal: $${total}`;
        message += `\nOpción de entrega: ${deliveryOption === 'envio' ? 'Envío' : 'Pasar a retirar'}`; // Añadimos la opción seleccionada
    
        const whatsappURL = `https://wa.me/5493794832031?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    };
    

    return (
        <AuthProvider>
            <div style={styles.app}>
                <Router>
                    <Navbar 
                        cartItems={cartItems} 
                        removeFromCart={removeFromCart} 
                        sendToWhatsApp={sendToWhatsApp} 
                        deliveryOption={deliveryOption} // Pasamos la opción seleccionada
                        handleDeliveryOptionChange={handleDeliveryOptionChange} // Pasamos la función para cambiar la opción
                    />
                    <Routes>
                        <Route path="/" element={<ProductList addToCart={addToCart} />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
                    </Routes>
                </Router>
            </div>
        </AuthProvider>
    );
}

const styles = {
    app: {
        fontFamily: 'Roboto, sans-serif',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        backgroundColor: '#f7f7f7bd',
        backgroundImage: 'url("/logo_pagina.png")',
        backgroundSize: '50px 50px',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        minHeight: '100vh'
    }
};

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;
