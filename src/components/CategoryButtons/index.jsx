import React from 'react';
import PropTypes from 'prop-types';
import styles from './CategoryButtons.module.css';

const CategoryButtons = ({ categories, onCategoryClick, selectedCategory }) => {
  return (
    <div className={styles.container}>
      {categories.map((category) => (
        <button
          key={category}
          className={`${styles.button} ${selectedCategory === category ? styles.active : ''}`}
          onClick={() => onCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

CategoryButtons.propTypes = {
  categories: PropTypes.array.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired
};

export default CategoryButtons;
