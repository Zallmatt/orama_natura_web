// context/CartContext.js
import React, { createContext, useReducer, useContext, useState } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return state.some(item => item.id === action.payload.id)
        ? state.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [
            ...state,
            { ...action.payload, quantity: 1 }
          ];
    case "REMOVE_FROM_CART":
      return state.filter(item => item.id !== action.payload);
    case "CLEAR_CART":
      return [];
    case "DECREASE_QUANTITY":
      return state
        .map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0);
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [deliveryOption, setDeliveryOption] = useState("envio");

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const decreaseQuantity = (id) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: id });
  };

  const sendToWhatsApp = () => {
    let message = "¡Hola! Quisiera hacer un pedido:\n\n";
    cart.forEach(item => {
      const discountedPrice = (
        item.price - (item.price * item.discount / 100)
      ).toFixed(2);
      message += `Producto: ${item.name} - Cantidad: ${item.quantity} - Precio con descuento: $${discountedPrice}\n`;
    });

    const total = cart
      .reduce((total, item) => {
        const discountedPrice = item.price - (item.price * item.discount / 100);
        return total + discountedPrice * item.quantity;
      }, 0)
      .toFixed(2);

    message += `\nTotal: $${total}`;
    message += `\nOpción de entrega: ${deliveryOption === "envio" ? "Envío" : "Pasar a retirar"}`;

    const whatsappURL = `https://wa.me/5493794832031?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        decreaseQuantity,
        deliveryOption,
        setDeliveryOption,
        sendToWhatsApp
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
