import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "./ProductDetailPage.css";
import { useCart } from "../../context/CartContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [fragrances, setFragrances] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const [resProduct, resFragrances, resPromotions] = await Promise.all([
          api.get(`/products/${id}`),
          api.get("/fragrances"),
          api.get("/promotions"),
        ]);
        setProduct(resProduct.data);
        setFragrances(resFragrances.data);
        setPromotions(resPromotions.data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Cargando producto...</p>;
  }

  const finalPrice = (
    product.price *
    (1 - product.discount / 100)
  ).toFixed(2);

  // Buscar fragancia y promoción por ID
  const fragrance = fragrances.find(f => f.id === product.fragrance_id);
  const promotion = promotions.find(p => p.id === product.promotion_id);

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <img
          src={product.image_url}
          alt={product.name}
          className="product-detail-image"
        />
        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <p className="product-category">{product.categories?.name}</p>
          {fragrance && (
            <p className="product-fragrance">
              Fragancia: {fragrance.name}
            </p>
          )}
          {promotion && (
            <p className="product-promotion">
              Promoción: {promotion.title}
            </p>
          )}
          <p className="product-description">{product.description}</p>

          {product.discount > 0 ? (
            <p className="product-price">
              <span className="old-price">${product.price}</span>{" "}
              <strong>${finalPrice}</strong>
            </p>
          ) : (
            <p className="product-price">
              <strong>${product.price}</strong>
            </p>
          )}

          <p className="product-stock">
            Stock disponible: {product.stock}
          </p>

          {product.is_launch && (
            <p className="product-launch">🌟 Producto nuevo</p>
          )}

          <button
            className="add-to-cart-btn"
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                discount: product.discount,
                image: product.image_url,
              })
            }
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
