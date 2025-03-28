import React, { useState, useEffect } from 'react';
import './PromotionBanner.css';
import promotionBanner1 from '../../assets/images/promotionBanner1.png';
import promotionBanner2 from '../../assets/images/banner_productos.png';
import promotionBanner3 from '../../assets/images/promotionBanner3.png';

const banners = [
  { img: promotionBanner1, alt: 'Promo 1' },
  { img: promotionBanner2, alt: 'Promo 2' },
  { img: promotionBanner3, alt: 'Promo 3' },
];

const PromotionBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="promotion-banner-container">
      <div className="promotion-banner">
        <img
          src={banners[currentIndex].img}
          alt={banners[currentIndex].alt}
          className="promotion-banner-image"
        />

        {/* Flechas */}
        <button className="arrow left" onClick={prevSlide}>&#10094;</button>
        <button className="arrow right" onClick={nextSlide}>&#10095;</button>

        {/* Puntos indicadores */}
        <div className="dots">
          {banners.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromotionBanner;
