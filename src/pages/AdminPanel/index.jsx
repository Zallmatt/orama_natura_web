import React, { useState } from 'react';
import './AdminPanel.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import useProductForm from '../../hooks/useProductForm';

const AdminPanel = () => {
    const {
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
    } = useProductForm();

    const [showRecentFirst, setShowRecentFirst] = useState(true);
    const isEditing = !!editingProductId;

    const handleFormSubmit = (e) => {
        if (isEditing) {
            e.preventDefault();
            handleSaveEdit(product);
        } else {
            handleSubmit(e);
        }
    };

    // Categoría especial: productos más recientes
    const recentProducts = products
        .filter(p => p.createdAt) // 👈 solo productos con fecha
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10);
  

    // Agrupar productos por categoría (excluyendo los que ya están en recientes)
    const recentIds = new Set(recentProducts.map(p => p._id));
    const groupedProducts = products
        .filter(p => !recentIds.has(p._id))
        .reduce((groups, product) => {
            const category = product.category || 'Sin Categoría';
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(product);
            return groups;
        }, {});

    return (
        <div className="admin-panel">
            <form onSubmit={handleFormSubmit}>
                <h1>{isEditing ? 'Editar Producto' : 'Administrador Panel'}</h1>

                <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Nombre del Producto" required />
                <input type="text" name="description" value={product.description} onChange={handleChange} placeholder="Descripción" required />
                <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Categoría" required />
                <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Precio" required />
                <input type="number" name="discount" value={product.discount} onChange={handleChange} placeholder="Descuento en porcentaje" />
                <input type="text" name="image" value={product.image} onChange={handleChange} placeholder="URL de la imagen" required />

                {product.image && (
                    <div className="image-preview">
                        <img src={product.image} alt="Vista previa del producto" />
                    </div>
                )}

                <input type="number" name="stock" value={product.stock} onChange={handleChange} placeholder="Num de stock" required />

                <div className="checkbox-container">
                    <input type="checkbox" name="view" onChange={handleChange} checked={product.view} id="view-checkbox" />
                    <label htmlFor="view-checkbox">Mostrar en el catálogo</label>
                </div>

                <div><strong>Precio Final:</strong> ${finalPrice}</div>

                <button type="submit">{isEditing ? 'Actualizar Producto' : 'Añadir Producto'}</button>
                {isEditing && (
                    <button type="button" onClick={handleCancelEdit} style={{ backgroundColor: 'red', color: 'white' }}>
                        Cancelar Edición
                    </button>
                )}
            </form>

            <div className="product-display-area">
                <div className="category-navigation">
                    <a href="#recientes">🆕 Recientes</a>
                    {Object.keys(groupedProducts).map(category => (
                        <a href={`#${category}`} key={category}>{category}</a>
                    ))}
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={showRecentFirst}
                            onChange={() => setShowRecentFirst(!showRecentFirst)}
                        />
                        Mostrar productos más recientes primero
                    </label>
                </div>

                <h2>Productos en el Catálogo</h2>

                {/* Sección de productos recientes */}
                <div className="product-category" id="recientes">
                    <h3>🆕 Productos Recientes</h3>
                    <div className="product-list-admin">
                        {recentProducts.map(product => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                isEditing={false}
                            />
                        ))}
                    </div>
                </div>

                {/* Resto de categorías */}
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
                                    isEditing={false}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={() => {
                    const area = document.querySelector('.product-display-area');
                    if (area) area.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="scroll-top-btn"
            >
                ⬆ Volver arriba
            </button>
        </div>
    );
};

export default AdminPanel;
