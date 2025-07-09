import React from "react";
import "./ProductCardHome.css";
import { useNavigate } from "react-router-dom";

const ProductCardHome = ({ product, fragrances, promotions }) => {
  const {
    name,
    price,
    discount,
    image_url,
    is_launch,
    stock,
    fragrance_id,
    promotion_id
  } = product;

  const finalPrice = (price * (1 - discount / 100)).toFixed(2);
  const navigate = useNavigate();

  const fragrance = fragrances.find(f => f.id === fragrance_id);
  const promotion = promotions.find(p => p.id === promotion_id);

  return (
    <div className="product-card-home">
      <div className="product-image">
        <img src={image_url} alt={name} />
        {is_launch && <span className="badge badge-launch">NUEVO</span>}
        {discount > 0 && (
          <span className="badge badge-discount">-{Math.round(discount)}%</span>
        )}
      </div>
      <div className="product-info">
        <h4 className="product-name">{name}</h4>

        {fragrance && (
          <p className="product-fragrance">
            <strong>Fragancia:</strong> {fragrance.name}
          </p>
        )}

        {promotion && (
          <p className="product-promotion">
            <strong>Promo:</strong> {promotion.title}
          </p>
        )}

        <div className="product-prices">
          {discount > 0 && <span className="old-price">${price}</span>}
          <span className="final-price">${finalPrice}</span>
        </div>


        {stock !== undefined && (
          <p className={`product-stock ${stock <= 5 ? "low-stock" : ""}`}>
            Stock disponible: {stock}
          </p>
        )}

        <button
          className="product-buy-btn"
          onClick={() => navigate(`/producto/${product.id}`)}
        >
          Ver más
        </button>
      </div>

    </div>
  );
};

export default ProductCardHome;
