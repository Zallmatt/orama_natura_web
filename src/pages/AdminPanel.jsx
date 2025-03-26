
import React from 'react';
import './AdminPanel.css';
import ProductCard from '../components/ProductCard';
import useProductForm from '../hooks/useProductForm';

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

    const groupedProducts = products.reduce((groups, product) => {
        const category = product.category || 'Sin Categoría';
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(product);
        return groups;
    }, {});

    const isEditing = !!editingProductId;

    const handleFormSubmit = (e) => {
        if (isEditing) {
            e.preventDefault();
            handleSaveEdit(product);
        } else {
            handleSubmit(e);
        }
    };

    return (
        <div className="admin-panel">
            <form onSubmit={handleFormSubmit}>
                <h1>{isEditing ? 'Editar Producto' : 'Administrador Panel'}</h1>

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

                {product.image && (
                    <div className="image-preview">
                        <img src={product.image} alt="Vista previa del producto" />
                    </div>
                )}

                <input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    placeholder="Num de stock"
                    required
                />

                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        name="view"
                        onChange={handleChange}
                        checked={product.view}
                        id="view-checkbox"
                    />
                    <label htmlFor="view-checkbox">Mostrar en el catálogo</label>
                </div>

                <div>
                    <strong>Precio Final:</strong> ${finalPrice}
                </div>

                <button type="submit">
                    {isEditing ? 'Actualizar Producto' : 'Añadir Producto'}
                </button>

                {isEditing && (
                    <button type="button" onClick={handleCancelEdit} style={{ backgroundColor: 'red', color: 'white' }}>
                        Cancelar Edición
                    </button>
                )}
            </form>

            <div className="product-display-area">
                <div className="category-navigation">
                    {Object.keys(groupedProducts).map(category => (
                        <a href={`#${category}`} key={category}>{category}</a>
                    ))}
                </div>

                <h2>Productos en el Catálogo</h2>

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
                                    isEditing={false} // no edita dentro de las tarjetas
                                />
                            ))}
                        </div>
                    </div>
                ))}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="scroll-top-btn"
                    >
                    ⬆ Volver arriba
                </button>
            </div>
        </div>
    );
};

export default AdminPanel;
