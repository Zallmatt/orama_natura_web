import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AnnouncementBar from './components/AnnouncementBar'
import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes/AppRoutes'; // 👉 nuevo import
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState('envio');

  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const existingProduct = prevCartItems.find(item => item._id === product._id);
      return existingProduct
        ? prevCartItems.map(item =>
            item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prevCartItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item._id !== productId));
  };

  const handleDeliveryOptionChange = (event) => {
    setDeliveryOption(event.target.value);
  };

  const sendToWhatsApp = () => {
    let message = '¡Hola! Quisiera hacer un pedido:\n\n';
    cartItems.forEach(item => {
      const discountedPrice = (item.price - (item.price * item.discount / 100)).toFixed(2);
      message += `Producto: ${item.name} - Cantidad: ${item.quantity} - Precio con descuento: $${discountedPrice}\n`;
    });

    const total = cartItems.reduce((total, item) => {
      const discountedPrice = item.price - (item.price * item.discount / 100);
      return total + discountedPrice * item.quantity;
    }, 0).toFixed(2);

    message += `\nTotal: $${total}`;
    message += `\nOpción de entrega: ${deliveryOption === 'envio' ? 'Envío' : 'Pasar a retirar'}`;

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
            deliveryOption={deliveryOption}
            handleDeliveryOptionChange={handleDeliveryOptionChange}
          />
                <AnnouncementBar /> {/* 🔝 Nueva barra arriba del navbar */}

  
          {/* 👇 Aca aplicamos el padding-top que definiste en App.css */}
          <div className="main-content">
            <AppRoutes addToCart={addToCart} />
          </div>
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

export default App;
