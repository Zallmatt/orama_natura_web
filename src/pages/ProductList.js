import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductDisplayCard from '../components/ProductDisplayCard';
import PromotionBanner from '../components/PromotionBanner';
import CategoryButtons from '../components/CategoryButtons';
import './ProductList.css';

const ProductList = ({ addToCart }) => { // Recibimos la función addToCart como prop
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
                // Obtener categorías únicas
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
        if (category === 'Todos') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product => product.category === category);
            setFilteredProducts(filtered);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="product-list">
            <PromotionBanner />
            <CategoryButtons categories={['Todos', ...categories]} onCategoryClick={handleCategoryClick} />
            <div className="product-grid">
                {filteredProducts.map(product => {
                    if (product.discount >= 0 && product.view) {
                        return (
                            <ProductDisplayCard 
                                key={product._id} 
                                product={product} 
                                addToCart={addToCart} // Pasamos la función addToCart a cada tarjeta de producto
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default ProductList;
