import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../services/orderService";
import CheckoutContactForm from "../../components/Home/CheckoutContactForm";
import "./CartPage.css";

const CartPage = () => {
  const {
    cart,
    clearCart,
    deliveryOption,
    setDeliveryOption,
    removeFromCart,
    addToCart
  } = useCart();
  const { isAuthenticated, user } = useAuth();

  const [contactData, setContactData] = useState({
    name: "",
    phone: ""
  });

  const calculateTotal = () =>
    cart
      .reduce((total, item) => {
        const price = Number(item.price) || 0;
        const discount = Number(item.discount) || 0;
        const quantity = Number(item.quantity) || 0;
        const subtotal = (price - price * (discount / 100)) * quantity;
        return total + subtotal;
      }, 0)
      .toFixed(2);

  const sendToWhatsApp = (contact) => {
    let message = `¡Hola! Quisiera hacer un pedido:\n\n`;

    cart.forEach(item => {
      const unitPrice = Number(item.price) - Number(item.price) * (Number(item.discount) / 100);
      const subtotal = unitPrice * Number(item.quantity);

      const formattedUnitPrice = unitPrice.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 2
      });

      const formattedSubtotal = subtotal.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 2
      });

      message += `*${item.name}*\n`;

      if (item.fragrance) {
        message += `Fragancia: ${item.fragrance}\n`;
      }

      message += `Cantidad: ${item.quantity}\n`;
      message += `Precio unitario: ${formattedUnitPrice}\n`;
      message += `Subtotal: ${formattedSubtotal}\n\n`;
    });

    const totalFormatted = Number(calculateTotal()).toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2
    });

    message += `Total del pedido: ${totalFormatted}\n`;
    message += `Entrega: ${deliveryOption === "envio" ? "Envío a domicilio" : "Retiro en local"}\n\n`;
    message += `Comprador: ${contact.name}\n`;
    message += `Teléfono: ${contact.phone}\n`;

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
          <ul className="cart-list">
            {cart.map((item) => {
              const price = Number(item.price) || 0;
              const discount = Number(item.discount) || 0;
              const quantity = Number(item.quantity) || 0;

              const unitPriceOriginal = price;
              const unitPriceDiscounted = price - price * (discount / 100);
              const savingPerUnit = unitPriceOriginal - unitPriceDiscounted;
              const subtotal = unitPriceDiscounted * quantity;

              const formattedOriginal = unitPriceOriginal.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2
              });

              const formattedDiscounted = unitPriceDiscounted.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2
              });

              const formattedSaving = savingPerUnit.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2
              });

              const formattedSubtotal = subtotal.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2
              });

              return (
                <li key={item.id} className="cart-item">
                  <div className="cart-info">
                    <div className="cart-main">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="cart-thumbnail"
                        />
                      )}
                      <div>
                        <strong>{item.name}</strong>
                        {item.fragrance && (
                          <p className="cart-fragrance">Fragancia: {item.fragrance}</p>
                        )}
                        <p className="cart-price-original">
                          Precio original:{" "}
                          <span className="strikethrough">{formattedOriginal}</span>
                        </p>
                        <p className="cart-discount">
                          Descuento: {Math.round(discount)}%
                        </p>
                        <p className="cart-saving">
                          Te ahorrás: {formattedSaving} por unidad
                        </p>
                        <p className="cart-price">
                          Precio con descuento: {formattedDiscounted}
                        </p>
                        <p className="cart-subtotal">
                          Subtotal: {formattedSubtotal}
                        </p>
                      </div>
                    </div>

                    <div className="quantity-controls">
                      <span className="quantity-label">Cantidad:</span>
                      <button
                        onClick={() => removeFromCart(item.id, 1)}
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button
                        disabled={quantity >= item.stock}
                        onClick={() =>
                          addToCart({
                            ...item,
                            quantity: 1
                          })
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id, item.quantity)}
                  >
                    Eliminar
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="cart-total">
            <span>
              <strong>Total:</strong>{" "}
              {Number(calculateTotal()).toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2
              })}
            </span>
            <button className="clear-btn" onClick={clearCart}>
              Vaciar carrito
            </button>
          </div>

          {/* Total ahorro */}
          <p className="total-saving">
            En tu compra total te ahorrás{" "}
            {cart
              .reduce((acc, item) => {
                const price = Number(item.price) || 0;
                const discount = Number(item.discount) || 0;
                const quantity = Number(item.quantity) || 0;
                const savingPerUnit = price * (discount / 100);
                return acc + savingPerUnit * quantity;
              }, 0)
              .toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2
              })}
          </p>

          {/* Opciones de entrega arriba del formulario */}
          <div className="delivery-options">
            <button
              type="button"
              className={deliveryOption === "envio" ? "active" : ""}
              onClick={() => setDeliveryOption("envio")}
            >
              🚚 Envío
            </button>
            <button
              type="button"
              className={deliveryOption === "retiro" ? "active" : ""}
              onClick={() => setDeliveryOption("retiro")}
            >
              🛍️ Pasar a retirar
            </button>
          </div>

          {/* Formulario destacado */}
          <div className="checkout-form">
            <h3>Datos del comprador</h3>
            <CheckoutContactForm
              contactData={contactData}
              setContactData={setContactData}
            />
          </div>

          <div className="cart-actions">
            <button className="checkout-btn" onClick={handleCheckout}>
              Confirmar compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
