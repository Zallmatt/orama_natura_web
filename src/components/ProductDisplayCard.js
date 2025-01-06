import React from 'react';
import './ProductDisplayCard.css';

const ProductDisplayCard = ({ product, addToCart }) => { // Recibimos addToCart como prop

    const discountedPrice = product.price - (product.price * product.discount / 100);

    // Función para formatear números según el formato de es-ES
    const formatNumber = (number) => {
        return parseFloat(number).toLocaleString('es-ES', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2, 
            useGrouping: true  // Asegura el uso del separador de miles
        });
    };

    // Verificar si la descripción contiene la frase especial
    const hasFragranceNote = product.description.includes("CONSULTAR FRAGANCIAS DISPONIBLES");

    return (
        <div className="product-card">
            <img 
                src={product.image} 
                alt={product.name} 
                className="product-image" 
                onError={(e) => e.target.src = "https://via.placeholder.com/300x400.png?text=Image+Not+Available"} 
            />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-description">
                {hasFragranceNote 
                    ? product.description.replace("CONSULTAR FRAGANCIAS DISPONIBLES", "").trim() // Elimina la frase de la descripción principal
                    : product.description}
            </p>

            {/* Mostrar la frase especial en un párrafo aparte, con estilo distinto */}
            {hasFragranceNote && (
                <p className="fragrance-note">CONSULTAR FRAGANCIAS DISPONIBLES</p>
            )}

            <p className="product-price">
                {product.discount > 0 && (
                    <>
                        <span className="original-price">Precio: ${formatNumber(product.price)}</span>
                        <br />
                        <span className="discounted-price">Precio con descuento: ${formatNumber(discountedPrice)}</span>
                    </>
                )}
                {product.discount === 0 && (
                    <span>Precio: ${formatNumber(product.price)}</span>
                )}
            </p>
            {product.discount > 0 && (
                <p className="product-discount">Descuento: {product.discount.toFixed(0)}%</p>
            )}
            <button 
                className="add-to-cart-btn" 
                onClick={() => addToCart(product)} // Llamamos a la función para agregar el producto al carrito
            >
                Agregar al carrito
            </button>
        </div>
    );
};

export default ProductDisplayCard;
