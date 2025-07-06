import React from "react";
import "./PromocionesList.css";

const PromocionesList = ({ promociones, onEdit, onDelete }) => (
  <div className="promociones-list">
    {promociones.map((promo) => (
      <div key={promo.id} className="promocion-card">
        {promo.image_url && (
          <img src={promo.image_url} alt={promo.title} />
        )}
        <h3>{promo.title}</h3>
        <p>{promo.description}</p>
        <p>
          {promo.start_date} - {promo.end_date}
        </p>
        {promo.percentage_off > 0 && (
          <p className="promo-percentage">{promo.percentage_off}% OFF</p>
        )}
        <div className="promo-actions">
          <button className="edit" onClick={() => onEdit(promo)}>
            Editar
          </button>
          <button className="delete" onClick={() => onDelete(promo.id)}>
            Eliminar
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default PromocionesList;
