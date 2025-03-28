import React from 'react';
import './Testimonials.css';

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
      <h3>Lo que dicen nuestras clientas <span>✨</span></h3>
      <div className="testimonials-container">
        {testimonials.map((item, index) => (
          <div className="testimonial-card" key={index}>
            <div className="quote-icon">“</div>
            <p className="testimonial-text">"{item.text}"</p>
            <p className="testimonial-author">- {item.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
