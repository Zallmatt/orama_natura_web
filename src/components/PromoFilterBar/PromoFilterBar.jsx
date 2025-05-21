// components/PromoFilterBar/PromoFilterBar.jsx
import React from 'react';
import styles from './PromoFilterBar.module.css';

const categories = ["Cuidado corporal", "Rostro", "Perfumería"];
const promoTypes = ["50% OFF", "Kit Mayorista", "Oferta Flash"];

const PromoFilterBar = ({
  selectedCategory,
  setSelectedCategory,
  selectedPromo,
  setSelectedPromo,
}) => {
  return (
    <div className={styles.filterBar}>
      <div className={styles.filterGroup}>
        <label>Categoría:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Todas</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label>Promoción:</label>
        <select
          value={selectedPromo}
          onChange={(e) => setSelectedPromo(e.target.value)}
        >
          <option value="">Todas</option>
          {promoTypes.map((promo) => (
            <option key={promo} value={promo}>{promo}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PromoFilterBar;
