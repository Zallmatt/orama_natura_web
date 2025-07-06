import React, { useEffect, useState } from "react";
import api from "../../services/api";
import ProductCardHome from "../../components/Home/ProductCardHome";
import "./PromotionsPage.css";

const PromotionsPage = () => {
  const [promotions, setPromotions] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resPromos = await api.get("/promotions");
        setPromotions(resPromos.data);

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
      <h2>Promociones y Ofertas</h2>
      <p className="promotions-subtitle">
        Aprovechá los descuentos exclusivos por tiempo limitado
      </p>

      {promotions.map((promo) => {
        const promoProducts = products.filter(
          (p) => p.promotions?.id === promo.id
        );

        return (
          <div key={promo.id} className="promo-section">
            <div className="promo-header">
              <h3>{promo.title}</h3>
              <p>{promo.description}</p>
              {promo.discount && (
                <p className="promo-discount">{promo.discount}% OFF</p>
              )}
              {promo.end_date && (
                <p className="promo-dates">Válido hasta {promo.end_date}</p>
              )}
            </div>
            {promoProducts.length > 0 ? (
              <div className="products-grid">
                {promoProducts.map((product) => (
                  <ProductCardHome key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="no-products">No hay productos en esta promoción.</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PromotionsPage;
