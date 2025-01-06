import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';
import ProductCard from '../components/ProductCard';

const AdminPanel = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        discount: '',
        image: '',
        stock: '',
        view: ''
    });
    const [products, setProducts] = useState([]);
    const [finalPrice, setFinalPrice] = useState(0);
    const [editingProductId, setEditingProductId] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
                setProducts(res.data);
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const price = parseFloat(product.price) || 0;
        const discount = parseFloat(product.discount) || 0;
        const calculatedPrice = price - (price * (discount / 100));
        setFinalPrice(calculatedPrice.toFixed(2));
    }, [product.price, product.discount]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct({
            ...product,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/products`, product);
            setProducts([...products, res.data]);
            alert('Producto añadido correctamente');
            setProduct({
                name: '',
                description: '',
                price: '',
                category: '',
                discount: '',
                image: '',
                stock: '',
                view: ''
            });
            setFinalPrice(0);
        } catch (err) {
            console.error('Error adding product:', err);
        }
    };

    const handleEdit = (product) => {
        setProduct(product);
        setEditingProductId(product._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas borrar este producto?")) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`);
                setProducts(products.filter(product => product._id !== id));
                alert('Producto borrado correctamente');
            } catch (err) {
                console.error('Error deleting product:', err.response.data);
            }
        }
    };

    const handleCancelEdit = () => {
        setProduct({
            name: '',
            description: '',
            price: '',
            category: '',
            discount: '',
            image: '',
            stock: '',
            view: ''
        });
        setEditingProductId(null);
        setFinalPrice(0);
    };

    const handleSaveEdit = async (editedProduct) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/products/${editingProductId}`, editedProduct);
            setProducts(products.map(p => p._id === editingProductId ? res.data : p));
            alert('Producto actualizado correctamente');
            setEditingProductId(null);
            setProduct({
                name: '',
                description: '',
                price: '',
                category: '',
                discount: '',
                image: '',
                stock: '',
                view: ''
            });
            setFinalPrice(0);
        } catch (err) {
            console.error('Error updating product:', err);
        }
    };

    // Función para agrupar productos por categoría
    const groupedProducts = products.reduce((groups, product) => {
        const category = product.category || 'Sin Categoría';
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(product);
        return groups;
    }, {});

    return (
        <div className="admin-panel">
            <h1>Administrador Panel</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    placeholder="Nombre del Producto"
                    required
                />
                <input
                    type="text"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    placeholder="Descripción"
                    required
                />
                <input
                    type="text"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    placeholder="Categoría"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="Precio"
                    required
                />
                <input
                    type="number"
                    name="discount"
                    value={product.discount}
                    onChange={handleChange}
                    placeholder="Descuento en porcentaje"
                />
                <input
                    type="text"
                    name="image"
                    value={product.image}
                    onChange={handleChange}
                    placeholder="URL de la imagen"
                    required
                />
                <input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    placeholder="Num de stock"
                    required
                />

                {/* Checkbox con label */}
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        name="view"
                        onChange={handleChange}
                        checked={product.view}
                        id="view-checkbox" // Asociamos con la etiqueta
                    />
                    <label htmlFor="view-checkbox">Mostrar en el catálogo</label>
                </div>

                <div>
                    <strong>Precio Final:</strong> ${finalPrice}
                </div>
                <button type="submit">Añadir Producto</button>
            </form>

            
            {/* Navegación rápida por categorías */}
            <div className="category-navigation">
                {Object.keys(groupedProducts).map(category => (
                    <a href={`#${category}`} key={category}>{category}</a>
                ))}
            </div>

            <h2>Productos en el Catálogo</h2>

            {/* Agrupar productos por categoría */}
            {Object.keys(groupedProducts).map(category => (
                <div key={category} className="product-category" id={category}>
                    <h3>{category}</h3>
                    <div className="product-list-admin">
                        {groupedProducts[category].map(product => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                isEditing={editingProductId === product._id}
                                onCancelEdit={handleCancelEdit}
                                onSave={handleSaveEdit}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminPanel;
