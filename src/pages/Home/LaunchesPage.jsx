import React, { useEffect, useState } from "react";
import api from "../../services/api";
import ProductCardHome from "../../components/Home/ProductCardHome";
import "./LaunchesPage.css";

const LaunchesPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const res = await api.get("/products");
        const launches = res.data
          .filter((p) => p.is_launch)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // más reciente primero
        setProducts(launches);
      } catch (error) {
        console.error("Error cargando lanzamientos:", error);
      }
    };

    fetchLaunches();
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

  return (
    <div className="launches-page">
      <h2>🆕 Últimos Lanzamientos</h2>
      <p className="launches-subtitle">
        Descubrí nuestros productos recién llegados
      </p>

      <div className="hero-launch">
        <img
          src={heroProduct.image_url}
          alt={heroProduct.name}
          className="hero-image"
        />
        <div className="hero-info">
          <h3>{heroProduct.name}</h3>
          <p className="hero-category">{heroProduct.categories?.name}</p>
          <p className="hero-description">{heroProduct.description}</p>
          {heroProduct.discount > 0 ? (
            <p className="hero-price">
              <span className="hero-old-price">
                ${heroProduct.price}
              </span>{" "}
              <strong>
                $
                {(
                  heroProduct.price *
                  (1 - heroProduct.discount / 100)
                ).toFixed(2)}
              </strong>
            </p>
          ) : (
            <p className="hero-price">
              <strong>${heroProduct.price}</strong>
            </p>
          )}
          <button
            className="hero-btn"
            onClick={() => console.log("Ver producto")}
          >
            Ver más
          </button>
        </div>
      </div>

      {otherProducts.length > 0 && (
        <>
          <h4 className="more-launches-title">Otros lanzamientos</h4>
          <div className="products-grid">
            {otherProducts.map((product) => (
              <ProductCardHome key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LaunchesPage;
