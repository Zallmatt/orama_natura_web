import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import PromoCard from '../../components/PromoCard/PromoCard';
import styles from './Promociones.module.css';

const discountRanges = [
  { label: '10% - 20%', min: 10, max: 20 },
  { label: '21% - 40%', min: 21, max: 40 },
  { label: '41% - 60%', min: 41, max: 60 },
  { label: 'Más del 60%', min: 61, max: 100 }
];

const Promociones = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRange, setSelectedRange] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
        const promos = res.data.filter(p => p.discount > 0);
        setProducts(promos);
      } catch (error) {
        console.error('Error al traer productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const inCategory = !selectedCategory || product.category === selectedCategory;
    const inRange = !selectedRange || (() => {
      const range = discountRanges.find(r => r.label === selectedRange);
      return product.discount >= range.min && product.discount <= range.max;
    })();
    return inCategory && inRange;
  });

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <>
      <Navbar />
      <main className={styles.wrapper}>
        <h1 className={styles.title}>Promociones</h1>

        <div className={styles.filters}>
          <div>
            <label>Categoría:</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">Todas</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Descuento:</label>
            <select value={selectedRange} onChange={(e) => setSelectedRange(e.target.value)}>
              <option value="">Todos</option>
              {discountRanges.map((range) => (
                <option key={range.label} value={range.label}>{range.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <PromoCard key={product.id} product={{
              ...product,
              promoPrice: product.price - (product.price * product.discount / 100),
              promoType: `${product.discount}% OFF`
            }} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Promociones;
