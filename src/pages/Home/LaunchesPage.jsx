import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./LaunchesPage.css";

const LaunchesPage = () => {
  const [products, setProducts] = useState([]);
  const [fragrances, setFragrances] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProducts, resFragrances, resPromotions] = await Promise.all([
          api.get("/products"),
          api.get("/fragrances"),
          api.get("/promotions"),
        ]);

        const launches = resProducts.data
          .filter((p) => p.is_launch)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setProducts(launches);
        setFragrances(resFragrances.data);
        setPromotions(resPromotions.data);
      } catch (error) {
        console.error("Error cargando lanzamientos:", error);
      }
    };

    fetchData();
  }, []);

  if (products.length === 0) {
    return (
      <div className="launches-page">
        <h2>🆕 Últimos Lanzamientos</h2>
        <p className="launches-subtitle">
          No hay lanzamientos disponibles por ahora.
        </p>
      </div>
    );
  }

  const heroProduct = products[0];
  const otherProducts = products.slice(1);

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);

  const renderCard = (product) => (
    <div key={product.id} className="launch-card">
      <div className="launch-image-container">
        <img
          src={product.image_url}
          alt={product.name}
          className="launch-image"
        />
      </div>
      <div className="launch-details">
        {product.discount > 0 && (
          <span className="launch-discount-badge">
            -{Math.round(product.discount)}%
          </span>
        )}
        <h3>{product.name}</h3>
        {product.fragrance && (
          <p className="launch-fragrance">
            Fragancia:{" "}
            {
              fragrances.find((f) => f.id === product.fragrance)?.name ||
              product.fragrance
            }
          </p>
        )}
        <p className="launch-description">{product.description}</p>
        <p className="launch-price">
          {product.discount > 0 ? (
            <>
              <span className="launch-old-price">
                ${formatPrice(product.price)}
              </span>{" "}
              <strong>
                $
                {formatPrice(
                  product.price * (1 - product.discount / 100)
                )}
              </strong>
            </>
          ) : (
            <strong>${formatPrice(product.price)}</strong>
          )}
        </p>
        <p className="launch-stock">
          Stock disponible: {product.stock}
        </p>
        <button
          className="launch-btn"
          onClick={() => navigate(`/producto/${product.id}`)}
        >
          Ver más
        </button>
      </div>
    </div>
  );

  return (
    <div className="launches-page">
      <h2>🆕 Últimos Lanzamientos</h2>
      <p className="launches-subtitle">
        Descubrí nuestros productos recién llegados
      </p>

      {renderCard(heroProduct)}

      {otherProducts.length > 0 && (
        <>
          <div className="launch-list">
            {otherProducts.map(renderCard)}
          </div>
        </>
      )}
    </div>
  );
};

export default LaunchesPage;
