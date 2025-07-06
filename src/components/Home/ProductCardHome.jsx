import React from "react";
import "./ProductCardHome.css";
import { useNavigate } from "react-router-dom";

const ProductCardHome = ({ product }) => {
  const {
    name,
    price,
    discount,
    image_url,
    description,
    categories,
    promotions,
    fragrances,
    is_launch,
    stock,
  } = product;

  const finalPrice = (price * (1 - discount / 100)).toFixed(2);
  const navigate = useNavigate();

  return (
    <div className="product-card-home">
      <div className="product-image">
        <img src={image_url} alt={name} />
        {is_launch && <span className="badge badge-launch">NUEVO</span>}
        {promotions?.title && promotions.title !== "Sin promoción" && (
          <span className="badge badge-promo">Promo</span>
        )}
      </div>
      <div className="product-info">
        <h4 className="product-name">{name}</h4>
        {categories?.name && (
          <p className="product-category">{categories.name}</p>
        )}
        {fragrances?.name && fragrances.name !== "Sin fragancia" && (
          <p className="product-fragance">{fragrances.name}</p>
        )}
        <p className="product-description">{description}</p>

        <div className="product-prices">
          {discount > 0 && (
            <span className="old-price">${price}</span>
          )}
          <span className="final-price">${finalPrice}</span>
        </div>

        {stock !== undefined && (
          <p
            className={`product-stock ${stock <= 5 ? "low-stock" : ""
              }`}
          >
            Stock: {stock}
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
