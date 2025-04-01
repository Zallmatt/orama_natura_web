import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductDisplayCard from '../../components/ProductDisplayCard/ProductDisplayCard';
import CategoryButtons from '../../components/CategoryButtons';
import './Productos.css';

const Productos = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
        setProducts(res.data);
        setFilteredProducts(res.data);
        const uniqueCategories = [...new Set(res.data.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryClick = (category) => {
    setFilteredProducts(
      category === 'Todos'
        ? products
        : products.filter(product => product.category === category)
    );
  };

  if (loading) return <div className="productos-loading">Cargando productos...</div>;
  if (error) return <div className="productos-error">Error: {error}</div>;

  return (
    <div className="productos-page">
      <h2 className="productos-title">Catálogo Stock</h2>
      <p className="productos-subtitle">Productos disponibles para entrega inmediata</p>

      <div className="productos-filtro">
        <h4>¿Qué querés ver hoy?</h4>
        <CategoryButtons categories={['Todos', ...categories]} onCategoryClick={handleCategoryClick} />
      </div>

      <div className="productos-grid">
        {filteredProducts.map(product =>
          product.discount >= 0 && product.view && (
            <ProductDisplayCard
              key={product._id}
              product={product}
              addToCart={addToCart}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Productos;
