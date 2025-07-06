import React from "react";
import "./Benefits.css";

const Benefits = () => (
  <section className="home-benefits">
    <h3>
      ¿Por qué comprar en <strong>ORAMA</strong>?
    </h3>
    <div className="benefit-list">
      <div className="benefit-item">
        <img src="/icons/fast-delivery.png" alt="Envío rápido" />
        <p>Envíos rápidos y seguros</p>
      </div>
      <div className="benefit-item">
        <img src="/icons/order.png" alt="Originales" />
        <p>Productos 100% originales</p>
      </div>
      <div className="benefit-item">
        <img src="/icons/customer-service.png" alt="Atención" />
        <p>Atención personalizada</p>
      </div>
    </div>
  </section>
);

export default Benefits;
