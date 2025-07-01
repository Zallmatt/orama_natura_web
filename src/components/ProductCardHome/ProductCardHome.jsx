import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductCardHome.module.css';
import { FaTag } from 'react-icons/fa';

const ProductCardHome = ({ product }) => {
  const { name, price, discount, image } = product;
  const finalPrice = price - (price * discount / 100);

  return (
    <div className={styles.card}>
      {discount > 0 && (
        <div className={styles.badge}>
          <FaTag className={styles.icon} /> -{discount.toFixed(0)}%
        </div>
      )}
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.info}>
        <h4 className={styles.title}>{name}</h4>
        <div className={styles.prices}>
          {discount > 0 && <span className={styles.oldPrice}>${price.toFixed(2)}</span>}
          <span className={styles.newPrice}>${finalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

ProductCardHome.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductCardHome;
