import React from 'react';
import './ProductDisplayCard.css';

const ProductDisplayCard = ({ product, addToCart }) => {
    const discountedPrice = product.price - (product.price * product.discount / 100);

    const formatNumber = (number) => {
        return parseFloat(number).toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true
        });
    };

    const hasFragranceNote = product.description.includes("CONSULTAR FRAGANCIAS DISPONIBLES");

    return (
        <div className="product-card">
            {/* Badge de oferta */}
            {product.discount >= 30 && (
                <span className="product-badge">¡Oferta!</span>
            )}

            {/* Imagen */}
            <img
                src={product.image}
                alt={product.name}
                className="product-image"
                onError={(e) => e.target.src = "https://via.placeholder.com/300x400.png?text=Image+Not+Available"}
            />

            <h2 className="product-name">{product.name}</h2>

            <p className="product-description">
                {hasFragranceNote
                    ? product.description.replace("CONSULTAR FRAGANCIAS DISPONIBLES", "").trim()
                    : product.description}
            </p>

            {hasFragranceNote && (
                <p className="fragrance-note">CONSULTAR FRAGANCIAS DISPONIBLES</p>
            )}

            <p className="product-price">
                {product.discount > 0 ? (
                    <>
                        <span className="original-price">Precio: ${formatNumber(product.price)}</span><br />
                        <span className="discounted-price">Precio con descuento: ${formatNumber(discountedPrice)}</span>
                    </>
                ) : (
                    <span>Precio: ${formatNumber(product.price)}</span>
                )}
            </p>

            {product.discount > 0 && (
                <p className="product-discount">Descuento: {product.discount.toFixed(0)}%</p>
            )}

            {product.stock === 0 ? (
                <p className="out-of-stock">Sin stock</p>
            ) : (
                <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                >
                    Agregar al carrito
                </button>
            )}
        </div>
    );
};

export default ProductDisplayCard;
