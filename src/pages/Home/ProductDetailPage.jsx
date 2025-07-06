import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "./ProductDetailPage.css";
import { useCart } from "../../context/CartContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error cargando producto:", error);
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

          <button
            className="add-to-cart-btn"
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                discount: product.discount,
                image: product.image_url, // O image si así lo tenés en las cards
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
