import React, { useState, useEffect } from 'react';
import './PromotionBanner.css';
import promotionBanner1 from '../assets/images/promotionBanner1.png';
import promotionBanner2 from '../assets/images/promotionBanner2.png';
import promotionBanner3 from '../assets/images/promotionBanner3.png';

const banners = [
  { img: promotionBanner1, alt: 'Promotion 1' },
  { img: promotionBanner3, alt: 'Promotion 3' },
];

const PromotionBanner = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [fade, setFade] = useState(true); // Estado para manejar el desvanecimiento

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Comienza el desvanecimiento
      setTimeout(() => {
        setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
        setFade(true); // Vuelve a mostrar la imagen con desvanecimiento
      }, 500); // Sincroniza con la duración de la transición en el CSS
    }, 3000); // Cambia de imagen cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="promotion-banner-container">
      <div className="promotion-banner">
        <img
          src={banners[currentBannerIndex].img}
          alt={banners[currentBannerIndex].alt}
          className={`promotion-banner-image ${fade ? 'fade-in' : 'fade-out'}`}
        />
      </div>
    </div>
  );
};

export default PromotionBanner;
