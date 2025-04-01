import React, { useState } from 'react';
import './CategoryButtons.css';

const CategoryButtons = ({ categories, onCategoryClick }) => {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const handleClick = (category) => {
    setActiveCategory(category);
    onCategoryClick(category);
  };

  return (
    <div className="category-buttons-container">
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? 'active' : ''}
            onClick={() => handleClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryButtons;
