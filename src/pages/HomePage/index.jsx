import React from 'react';
import { useNavigate } from 'react-router-dom';
import PromotionBanner from '../../components/PromotionBanner/PromotionBanner';
import Testimonials from '../../components/Testimonials';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/productos');
  };

  return (
    <div className="home-page">
      <PromotionBanner />

      {/* Mensaje Promocional */}
      <div className="home-message">
        <h2>Belleza que ilumina</h2>
        <button className="home-buy-btn" onClick={handleClick}>COMPRAR</button>
      </div>

      {/* Beneficios */}
      <div className="home-benefits">
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
        </div>


      {/* Categorías Destacadas */}
      <section className="home-categories">
        <h3>Explorá nuestras categorías</h3>
        <div className="category-buttons">
          <button onClick={() => navigate('/productos?categoria=perfumes')}>Perfumes</button>
          <button onClick={() => navigate('/productos?categoria=cuidado-corporal')}>Cuidado Corporal</button>
          <button onClick={() => navigate('/productos?categoria=regalos')}>Regalos</button>
        </div>
      </section>

      {/* Llamado a redes */}
      <section className="home-social">
        <h3 className="social-title">¡Seguinos en nuestras redes!</h3>
        <div className="social-icons">
            <a href="https://www.instagram.com/orama_natura_/" target="_blank" rel="noreferrer">
            <img src="/icons/instagram.png" alt="Instagram" className="social-icon" />
            <span>Instagram</span>
            </a>
            <a href="https://www.tiktok.com/@orama_natura_" target="_blank" rel="noreferrer">
            <img src="/icons/tik-tok.png" alt="TikTok" className="social-icon" />
            <span>TikTok</span>
            </a>
        </div>
      </section>
      <Testimonials /> {/* 👈 Agregás esta línea */}

    </div>
  );
};

export default HomePage;
