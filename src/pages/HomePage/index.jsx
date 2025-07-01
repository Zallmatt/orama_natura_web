import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import PromotionBanner from '../../components/PromotionBanner/PromotionBanner';
import ProductCardHome from '../../components/ProductCardHome/ProductCardHome';
import Testimonials from '../../components/Testimonials';

import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const [lanzamientos, setLanzamientos] = useState([]);
  const [promociones, setPromociones] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // 🔁 Cargar lanzamientos recientes
    const fetchLanzamientos = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/products/launches`);
      setLanzamientos(res.data);
    };

    // 🔁 Cargar promociones activas
    const fetchPromociones = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/products/promotions`);
      setPromociones(res.data);
    };

    // 🔁 Cargar categorías únicas (mock si no hay API)
    const fetchCategorias = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/categories`);
      const categoriasUnicas = res.data.map(c => c.name);
      setCategorias(categoriasUnicas);
    };

    fetchLanzamientos();
    fetchPromociones();
    fetchCategorias();
  }, []);

  const handleComprarClick = () => {
    navigate('/productos');
  };

  return (
    <div className="home-page">

      {/* 🧴 Hero principal con CTA */}
      <PromotionBanner />
      <section className="home-message">
        <h2>Belleza que ilumina</h2>
        <button className="home-buy-btn" onClick={handleComprarClick}>
          COMPRAR
        </button>
      </section>

      {/* 🆕 Lanzamientos recientes */}
      <section className="home-launches">
        <h3>Nuevos ingresos</h3>
        <div className="products-row">
          {lanzamientos.map(product => (
            <ProductCardHome key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 💸 Promociones activas */}
      <section className="home-promotions">
        <h3>Promociones destacadas</h3>
        <div className="products-row">
          {promociones.map(product => (
            <ProductCardHome key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ⭐ Beneficios */}
      <section className="home-benefits">
        <h3>¿Por qué comprar en <strong>ORAMA</strong>?</h3>
        <div className="benefit-list">
          <div className="benefit-item">
            <img src="/icons/fast-delivery.png" alt="envío" />
            <p>Envíos rápidos y seguros</p>
          </div>
          <div className="benefit-item">
            <img src="/icons/order.png" alt="originales" />
            <p>Productos 100% originales</p>
          </div>
          <div className="benefit-item">
            <img src="/icons/customer-service.png" alt="atención" />
            <p>Atención personalizada</p>
          </div>
        </div>
      </section>

      {/* ✅ Categorías */}
      <section className="home-categories">
        <h3>Explorá nuestras categorías</h3>
        <div className="category-buttons">
          {categorias
            .filter(Boolean)
            .map(cat => (
              <button key={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
          ))}
        </div>
      </section>

      {/* 🗣️ Testimonios */}
      <Testimonials />

      {/* 📲 Redes sociales */}
      <section className="home-social">
        <h3 className="social-title">¡Seguinos en nuestras redes!</h3>
        <div className="social-icons">
          <a
            href="https://www.instagram.com/orama_natura_/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram Orama"
          >
            <img src="/icons/instagram.png" alt="Instagram" className="social-icon" />
            <span>Instagram</span>
          </a>
          <a
            href="https://www.tiktok.com/@orama_natura_"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok Orama"
          >
            <img src="/icons/tik-tok.png" alt="TikTok" className="social-icon" />
            <span>TikTok</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
