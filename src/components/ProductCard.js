import React, { useState, useEffect } from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onEdit, onDelete, isEditing, onCancelEdit, onSave }) => {
    const [editedProduct, setEditedProduct] = useState(product);
    const discountedPrice = editedProduct.price - (editedProduct.price * editedProduct.discount / 100);

    useEffect(() => {
        setEditedProduct(product); // Sincronizar cuando el prop product cambie
    }, [product]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditedProduct({
            ...editedProduct,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const getGoogleDriveImageLink = (url) => {
        if (url.includes("drive.google.com")) {
            const fileId = url.split('/d/')[1].split('/view')[0];
            return `https://drive.google.com/uc?export=view&id=${fileId}`;
        }
        return url;
    };

    const imageUrl = getGoogleDriveImageLink(editedProduct.image);

    return (
        <div className={`product-card ${isEditing ? 'editing' : ''}`}>
            <img 
                src={imageUrl} 
                alt={editedProduct.name} 
                className="product-image" 
                onError={(e) => e.target.src = "https://via.placeholder.com/300x400.png?text=Image+Not+Available"} 
            />
            <h2 className="product-name">{editedProduct.name}</h2>
            <p className="product-description">{editedProduct.description}</p>
            <p className="product-price">
                {editedProduct.discount > 0 && (
                    <>
                        <span className="original-price">Precio: ${editedProduct.price}</span>
                        <br />
                        <span className="discounted-price">Precio con descuento: ${discountedPrice.toFixed(0)}</span>
                    </>
                )}
                {editedProduct.discount === 0 && (
                    <span>Precio: ${editedProduct.price}</span>
                )}
            </p>
            {editedProduct.discount > 0 && (
                <p className="product-discount">Descuento: {editedProduct.discount}%</p>
            )}
            {isEditing ? (
                <div className="product-edit-form">
                    <input
                        type="text"
                        name="name"
                        value={editedProduct.name}
                        onChange={handleChange}
                        placeholder="Nombre del Producto"
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        value={editedProduct.description}
                        onChange={handleChange}
                        placeholder="Descripción"
                        required
                    />
                    <input
                        type="text"
                        name="category"
                        value={editedProduct.category}
                        onChange={handleChange}
                        placeholder="Categoría"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        value={editedProduct.price}
                        onChange={handleChange}
                        placeholder="Precio"
                        required
                    />
                    <input
                        type="number"
                        name="discount"
                        value={editedProduct.discount}
                        onChange={handleChange}
                        placeholder="Descuento en porcentaje"
                    />
                    <input
                        type="text"
                        name="image"
                        value={editedProduct.image}
                        onChange={handleChange}
                        placeholder="URL de la imagen"
                        required
                    />
                    <input
                        type="number"
                        name="stock"
                        value={editedProduct.stock}
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
                        <strong>Precio Final:</strong> ${discountedPrice.toFixed(2)}
                    </div>

                    {/* Contenedor para los botones */}
                    <div className="button-group">
                        <button className="save-button" onClick={() => onSave(editedProduct)}>Actualizar Producto</button>
                        <button className="cancel-button" onClick={onCancelEdit}>Cancelar Edición</button>
                    </div>
                </div>
            ) : (
                <div className="product-actions">
                    <button className="edit-button" onClick={() => onEdit(product)}>Editar Producto</button>
                    <button className="delete-button" onClick={() => onDelete(product._id)}>Borrar Producto</button>
                </div>
            )}
        </div>
    );
};

export default ProductCard;
