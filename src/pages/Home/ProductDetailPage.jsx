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
  const [quantity, setQuantity] = useState(1);
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
  );

  const fragrance = fragrances.find(f => f.id === product.fragrance_id);
  const promotion = promotions.find(p => p.id === product.promotion_id);

  const formattedOriginalPrice = product.price.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  });

  const formattedFinalPrice = finalPrice.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  });

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="image-wrapper">
          {product.discount > 0 && (
            <span className="discount-badge">
              -{product.discount}%
            </span>
          )}
          <img
            src={product.image_url}
            alt={product.name}
            className="product-detail-image"
          />
        </div>
        <div className="product-detail-info">
          <h2>{product.name}</h2>
          {(product.categories?.name || fragrance) && (
            <p className="product-category">
              {product.categories?.name}
              {fragrance && (
                <>
                  {" • "}
                  Fragancia: {fragrance.name}
                </>
              )}
            </p>
          )}

          {promotion && (
            <p className="product-promotion">
              Promoción: {promotion.title}
            </p>
          )}
          <p className="product-description">{product.description}</p>

          <p className="product-price">
            {product.discount > 0 && (
              <span className="old-price">{formattedOriginalPrice}</span>
            )}
            <strong>{formattedFinalPrice}</strong>
          </p>

          <p className="product-stock">
            Stock disponible: {product.stock}
          </p>

          {product.is_launch && (
            <p className="product-launch">🌟 Producto nuevo</p>
          )}

          <div className="quantity-wrapper">
            <label>Cantidad:</label>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
          </div>

          <button
            className="add-to-cart-btn"
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                discount: product.discount,
                fragrance: fragrance?.name,   // <--- esta línea
                stock: product.stock,
                image: product.image_url,
                quantity
              })
            }
          >
          Agregar al carrito
        </button>
      </div>
    </div>
    </div >
  );
};

export default ProductDetailPage;
