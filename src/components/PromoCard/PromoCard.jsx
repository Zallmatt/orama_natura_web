// components/PromoCard/PromoCard.jsx
import React from 'react';
import styles from './PromoCard.module.css';

const PromoCard = ({ product }) => {
  const { name, image, category, price, promoPrice, discount, promoType } = product;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} className={styles.image} />
        {discount && <span className={styles.discountBadge}>{discount}</span>}
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.category}>{category}</p>
        <div className={styles.prices}>
          <span className={styles.originalPrice}>${price}</span>
          <span className={styles.promoPrice}>${promoPrice}</span>
        </div>
        <span className={styles.promoType}>{promoType}</span>
      </div>
    </div>
  );
};

export default PromoCard;
