import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Testimonials.css";

const testimonials = [
  {
    text: '¡Me encantaron los productos! Llegaron súper rápido y con regalito 💕',
    author: 'Ana R.'
  },
  {
    text: 'Excelente atención. Todo muy cuidado, se nota el amor que le ponen.',
    author: 'Lucía M.'
  },
  {
    text: 'Ya es mi segunda compra y siempre impecable. ¡Gracias Orama!',
    author: 'Flor M.'
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <h3>
        Lo que dicen nuestras clientas <span>✨</span>
      </h3>
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        spaceBetween={30}
        breakpoints={{
          0: {
            slidesPerView: 1
          },
          600: {
            slidesPerView: 2
          },
          1024: {
            slidesPerView: 3
          }
        }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="testimonial-card">
              <div className="quote-icon">“</div>
              <p className="testimonial-text">"{item.text}"</p>
              <p className="testimonial-author">- {item.author}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
