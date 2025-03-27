
import { useState, useEffect } from 'react';
import axios from 'axios';

const useProductForm = () => {
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
            setProducts([
                ...products,
                {
                    ...res.data,
                    createdAt: new Date().toISOString() // asegurar que tenga createdAt
                }
            ]);
            alert('Producto añadido correctamente');
            resetForm();
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
                console.error('Error deleting product:', err.response?.data || err);
            }
        }
    };

    const handleCancelEdit = () => {
        resetForm();
        setEditingProductId(null);
    };

    const handleSaveEdit = async (editedProduct) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/products/${editingProductId}`, editedProduct);
            setProducts(products.map(p => p._id === editingProductId ? res.data : p));
            alert('Producto actualizado correctamente');
            setEditingProductId(null);
            resetForm();
        } catch (err) {
            console.error('Error updating product:', err);
        }
    };

    const resetForm = () => {
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
    };

    return {
        product,
        products,
        finalPrice,
        editingProductId,
        handleChange,
        handleSubmit,
        handleEdit,
        handleDelete,
        handleCancelEdit,
        handleSaveEdit
    };
};

export default useProductForm;
