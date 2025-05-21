import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductDisplayCard from '../../components/ProductDisplayCard/ProductDisplayCard';
import CategoryButtons from '../../components/CategoryButtons';
import './Productos.css';

const Productos = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
        const data = res.data.filter(p => p.discount >= 0 && p.view);
        setProducts(data);
        setFilteredProducts(data);
        const uniqueCategories = [...new Set(data.map(p => p.category))];
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
    setSelectedCategory(category);
    if (category === 'Todos') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === category));
    }
  };

  if (loading) return <div className="productos-loading">Cargando productos...</div>;
  if (error) return <div className="productos-error">Error: {error}</div>;

  return (
    <div className="productos-wrapper">
      <section className="productos-hero">
        <h1>🛍️ Nuestros Productos</h1>
        <p>Elegí lo que más te guste, con descuentos increíbles</p>
      </section>

      <section className="productos-filtros">
        <CategoryButtons 
          categories={['Todos', ...categories]} 
          onCategoryClick={handleCategoryClick}
          selectedCategory={selectedCategory}
        />
      </section>

      <section className="productos-grid">
        {filteredProducts.map(product => (
          <ProductDisplayCard 
            key={product._id} 
            product={product} 
            addToCart={addToCart} 
          />
        ))}
      </section>
    </div>
  );
};

export default Productos;
