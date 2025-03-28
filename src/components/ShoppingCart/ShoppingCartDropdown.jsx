import React from 'react';
import './ShoppingCartDropdown.css'; // Archivo de estilos para el carrito

const ShoppingCartDropdown = ({ cartItems, removeFromCart, sendToWhatsApp, deliveryOption, handleDeliveryOptionChange }) => {
    
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price - (item.price * item.discount / 100)) * item.quantity, 0).toFixed(2);
    };

    const calculateSavings = () => {
        return cartItems.reduce((savings, item) => {
            const fullPrice = item.price * item.quantity;
            const discountedPrice = (item.price - (item.price * item.discount / 100)) * item.quantity;
            return savings + (fullPrice - discountedPrice);
        }, 0).toFixed(2);
    };

    // Función para formatear el número en formato español
    const formatNumber = (number) => {
        return parseFloat(number).toLocaleString('es-ES', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2, 
            useGrouping: true  // Asegura el uso del separador de miles
        });
    };

    return (
        <div className="cart-dropdown">
            {cartItems.length === 0 ? (
                <p>Tu carrito está vacío</p>
            ) : (
                <>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item._id}>
                                {item.name} - {item.quantity} x ${formatNumber((item.price - (item.price * item.discount / 100)).toFixed(2))}
                                    
                                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>Eliminar</button>
                            
                            </li>
                        ))}
                    </ul>
                    <p className="savings-total">Ahorro total: ${formatNumber(calculateSavings())}</p>
                    <p className="total-to-pay">Total a pagar: ${formatNumber(calculateTotal())}</p>
                    
                    {/* Opción de entrega */}
                    <div className="delivery-option">
                        <label>
                            <input 
                                type="radio" 
                                name="delivery"  // Agrupar inputs de tipo radio con el mismo nombre
                                value="envio" 
                                checked={deliveryOption === 'envio'} 
                                onChange={handleDeliveryOptionChange} 
                            />
                            Envío
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="delivery"  // Agrupar inputs de tipo radio con el mismo nombre
                                value="retiro" 
                                checked={deliveryOption === 'retiro'} 
                                onChange={handleDeliveryOptionChange} 
                            />
                            Pasar a retirar
                        </label>
                    </div>

                    <button className="whatsapp-btn" onClick={sendToWhatsApp}>Enviar pedido por WhatsApp</button>
                </>
            )}
        </div>
    );
};

export default ShoppingCartDropdown;
