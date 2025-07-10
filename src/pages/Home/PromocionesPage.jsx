import React, { useEffect, useState } from "react";
import api from "../../services/api";
import ProductCardHome from "../../components/Home/ProductCardHome";
import "./PromotionsPage.css";

const PromotionsPage = () => {
  const [promotions, setPromotions] = useState([]);
  const [products, setProducts] = useState([]);
  const [fragrances, setFragrances] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar promociones
        const resPromos = await api.get("/promotions");
        setPromotions(resPromos.data);

        // Cargar fragancias
        const resFragrances = await api.get("/fragrances");
        setFragrances(resFragrances.data);

        // Cargar productos
        const resProducts = await api.get("/products");
        setProducts(resProducts.data);
      } catch (error) {
        console.error("Error cargando promociones o productos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="promotions-page">
      <div className="promotions-container">
        <h2>🎁 Promociones y Ofertas</h2>
        <p className="promotions-subtitle">
          Aprovechá los descuentos exclusivos por tiempo limitado
        </p>

        {promotions.map((promo) => {
          const promoProducts = products.filter(
            (p) => p.promotion_id === promo.id
          );

          return (
            <div key={promo.id} className="promo-section">
              <div className="promo-header">
                <h3>🔥 {promo.title}</h3>
                <p>{promo.description}</p>
                {promo.discount && (
                  <p className="promo-discount">{promo.discount}% OFF</p>
                )}
                {promo.end_date && (
                  <p className="promo-dates">
                    Válido hasta {promo.end_date}
                  </p>
                )}
              </div>
              {promoProducts.length > 0 ? (
                <div className="products-grid">
                  {promoProducts.map((product) => (
                    <ProductCardHome
                      key={product.id}
                      product={product}
                      fragrances={fragrances}
                      promotions={promotions}
                    />
                  ))}
                </div>
              ) : (
                <p className="no-products">
                  No hay productos en esta promoción.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PromotionsPage;
