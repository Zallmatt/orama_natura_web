import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../services/orderService";
import CheckoutContactForm from "../../components/Home/CheckoutContactForm";
import "./CartPage.css";

const CartPage = () => {
  const { cart, clearCart, deliveryOption, setDeliveryOption, removeFromCart } = useCart();
  const { isAuthenticated, user } = useAuth();

  const [contactData, setContactData] = useState({
    name: "",
    phone: ""
  });

  const calculateTotal = () =>
    cart
      .reduce(
        (total, item) =>
          total +
          (item.price - item.price * (item.discount / 100)) * item.quantity,
        0
      )
      .toFixed(2);

  const sendToWhatsApp = (contact) => {
    let message = `¡Hola! Quisiera hacer un pedido:\n\n`;

    cart.forEach(item => {
      const finalPrice = (item.price - item.price * (item.discount / 100)).toFixed(2);
      message += `✅ *${item.name}*\nCantidad: ${item.quantity}\nPrecio unitario: $${finalPrice}\n\n`;
    });

    message += `💰 *Total:* $${calculateTotal()}\n`;
    message += `🚚 *Entrega:* ${deliveryOption === 'envio' ? 'Envío' : 'Retiro en local'}\n`;
    message += `🙍 *Nombre:* ${contact.name}\n📞 *Teléfono:* ${contact.phone}\n`;

    const whatsappURL = `https://wa.me/5493794832031?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  const handleCheckout = async () => {
    if (!contactData.name || !contactData.phone) {
      alert("Por favor completa tu nombre y teléfono.");
      return;
    }

    const payload = {
      user_id: isAuthenticated ? user.id : null,
      shipping_method: deliveryOption,
      guest_name: contactData.name,
      guest_phone: contactData.phone,
      items: cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
        discount: item.discount
      }))
    };

    try {
      await createOrder(payload);
      clearCart();
      sendToWhatsApp(contactData);
      alert("¡Pedido registrado correctamente!");
    } catch (error) {
      console.error("Error al crear la orden:", error);
      alert("Ocurrió un error al procesar tu pedido.");
    }
  };

  return (
    <div className="cart-page">
      <h2>Tu carrito</h2>

      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - Cant: {item.quantity}
                <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
              </li>
            ))}
          </ul>

          <p><strong>Total:</strong> ${calculateTotal()}</p>

          {/* Formulario de contacto */}
          <CheckoutContactForm
            contactData={contactData}
            setContactData={setContactData}
          />

          {/* Opciones de entrega */}
          <div className="delivery-options">
            <label>
              <input
                type="radio"
                name="delivery"
                value="envio"
                checked={deliveryOption === "envio"}
                onChange={() => setDeliveryOption("envio")}
              />
              Envío
            </label>
            <label>
              <input
                type="radio"
                name="delivery"
                value="retiro"
                checked={deliveryOption === "retiro"}
                onChange={() => setDeliveryOption("retiro")}
              />
              Pasar a retirar
            </label>
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            Confirmar compra
          </button>

          <button onClick={clearCart}>Vaciar carrito</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
