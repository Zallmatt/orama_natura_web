// context/CartContext.js
import React, { createContext, useReducer, useContext, useState } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return state.some(item => item.id === action.payload.id)
        ? state.map(item => {
          if (item.id === action.payload.id) {
            const quantityToAdd = Number(action.payload.quantity) || 1;
            const newQuantity = item.quantity + quantityToAdd;
            const maxQuantity = item.stock ?? newQuantity; // si no tiene stock, no limitar
            return {
              ...item,
              quantity: Math.min(newQuantity, maxQuantity)
            };
          }
          return item;
        })
        : [
          ...state,
          {
            ...action.payload,
            quantity: Number(action.payload.quantity) || 1
          }
        ];

    case "REMOVE_QUANTITY":
      return state
        .map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - action.payload.quantity }
            : item
        )
        .filter(item => item.quantity > 0);

    case "REMOVE_FROM_CART":
      return state.filter(item => item.id !== action.payload);

    case "CLEAR_CART":
      return [];

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

  const removeFromCart = (id, quantity = null) => {
    if (quantity === null) {
      // Eliminar todo el producto
      dispatch({ type: "REMOVE_FROM_CART", payload: id });
    } else {
      // Quitar una cantidad específica
      dispatch({ type: "REMOVE_QUANTITY", payload: { id, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        deliveryOption,
        setDeliveryOption
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
