import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import PromotionBanner from "../../components/Home/PromotionBanner";
import ProductCardHome from "../../components/Home/ProductCardHome";
import Testimonials from "../../components/Home/Testimonials";
import Benefits from "../../components/Home/Benefits";

import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const [lanzamientos, setLanzamientos] = useState([]);
  const [promociones, setPromociones] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [fragrances, setFragrances] = useState([]);
  const [promotionsData, setPromotionsData] = useState([]);

  useEffect(() => {
    const fetchFragrances = async () => {
      const res = await api.get("/fragrances");
      setFragrances(res.data);
    };

    const fetchPromotionsData = async () => {
      const res = await api.get("/promotions");
      setPromotionsData(res.data);
    };

    fetchFragrances();
    fetchPromotionsData();

    const fetchLanzamientos = async () => {
      try {
        const res = await api.get("/products/launches");
        setLanzamientos(res.data);
      } catch (error) {
        console.error("Error cargando lanzamientos:", error);
      }
    };

    const fetchPromociones = async () => {
      try {
        const res = await api.get("/products/promotions");
        setPromociones(res.data);
      } catch (error) {
        console.error("Error cargando promociones:", error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const res = await api.get("/categories");
        const categoriasUnicas = res.data.map((c) => c.name);
        setCategorias(categoriasUnicas);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }
    };

    fetchLanzamientos();
    fetchPromociones();
    fetchCategorias();
  }, []);

  const handleComprarClick = () => {
    navigate("/productos");
  };

  return (
    <div className="home-page">
      {/* 🧴 Hero principal */}
      <div className="banner-wrapper">
        <PromotionBanner />
      </div>

      {/* Mensaje principal */}
      <section className="home-message">
        <h2>Belleza que ilumina</h2>
        <button className="home-buy-btn" onClick={handleComprarClick}>
          COMPRAR
        </button>
      </section>

      {/* Nuevos ingresos */}
      <section className="home-launches">
        <h3>Nuevos ingresos</h3>
        <div className="products-row">
          {lanzamientos.map((product) => (
            <ProductCardHome
              key={product.id}
              product={product}
              fragrances={fragrances}
              promotions={promotionsData}
            />
          ))}
        </div>
      </section>

      {/* Promociones */}
      <section className="home-promotions">
        <h3>Promociones destacadas</h3>
        <div className="products-row">
          {promociones.map((product) => (
            <ProductCardHome
              key={product.id}
              product={product}
              fragrances={fragrances}
              promotions={promotionsData}
            />))}
        </div>
      </section>

      {/* Beneficios */}
      <Benefits />

      <div className="section-separator" />

      {/* Categorías */}
      <section className="home-categories">
        <h3>Explorá nuestras categorías</h3>
        <div className="category-buttons">
          {categorias
            .filter(Boolean)
            .map((cat) => {
              let emoji = "🌿";
              if (cat.toLowerCase().includes("crema")) emoji = "🧴";
              if (cat.toLowerCase().includes("jabón")) emoji = "🧼";
              if (cat.toLowerCase().includes("perfume")) emoji = "💧";

              return (
                <button key={cat}>
                  {emoji} {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              );
            })}
        </div>
      </section>

      <div className="section-separator" />

      {/* Testimonios */}
      <Testimonials />
    </div>
  );
};

export default HomePage;
