import React, { useState } from 'react'; // <-- Esto es lo que faltaba
import PropTypes from 'prop-types';
import styles from './ProductDisplayCard.module.css';
import { FaCartPlus, FaTag, FaTimes } from 'react-icons/fa';

const ProductDisplayCard = ({ product, addToCart }) => {
  const { name, price, discount, image, stock } = product;
  const finalPrice = price - (price * discount / 100);
  const [showImage, setShowImage] = useState(false);


   return (
    <>
      <div className={styles.card}>
        {discount > 0 && (
          <div className={styles.badge}>
            <FaTag className={styles.icon} /> -{discount.toFixed(0)}%
          </div>
        )}

        <img 
          src={image} 
          alt={name} 
          className={styles.image} 
          onClick={() => setShowImage(true)} 
        />

        <div className={styles.info}>
          <h3 className={styles.title}>{name}</h3>
          <div className={styles.prices}>
            {discount > 0 && <span className={styles.oldPrice}>${price.toFixed(2)}</span>}
            <span className={styles.newPrice}>${finalPrice.toFixed(2)}</span>
          </div>
          <button 
            className={styles.button}
            onClick={() => addToCart(product)}
            disabled={stock <= 0}
          >
            <FaCartPlus /> {stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
          </button>
        </div>
      </div>

      {showImage && (
        <div className={styles.modalOverlay} onClick={() => setShowImage(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setShowImage(false)}>
              <FaTimes />
            </button>
            <img src={image} alt={name} className={styles.fullImage} />
          </div>
        </div>
      )}
    </>
  );
};

ProductDisplayCard.propTypes = {
  product: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired
};

export default ProductDisplayCard;
