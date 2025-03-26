// src/components/CategoryButtons.jsx
import React from 'react';
import './CategoryButtons.css';

const CategoryButtons = ({ categories, onCategoryClick }) => {
    return (
        <div className="category-buttons-container">
            <div className="category-buttons-question">¿Qué quieres ver hoy?</div>
            <div className="category-buttons">
                {categories.map(category => (
                    <button key={category} onClick={() => onCategoryClick(category)}>
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryButtons;
