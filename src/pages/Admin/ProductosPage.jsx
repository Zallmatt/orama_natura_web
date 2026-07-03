import React, { useState, useEffect } from "react";
import {
  getProducts,
  getInactiveProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  activateProduct
} from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import ProductosList from "../../components/Admin/ProductosList";
import ProductoForm from "../../components/Admin/ProductoForm";
import { getAllFragrances } from "../../services/fragranceService";
import { getPromotions } from "../../services/promotionService";

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showInactive, setShowInactive] = useState(false);
  const [fragrances, setFragrances] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const filteredProductos = productos.filter((prod) => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? String(prod.category_id) === String(filterCategory) : true;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    fetchData();
  }, [showInactive]); // 👈 recarga cuando cambia el toggle

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productosData, categoriesData] = await Promise.all([
        showInactive ? getInactiveProducts() : getProducts(),
        getCategories(),
      ]);
      setProductos(productosData);
      setCategories(categoriesData);
    } catch (err) {
      console.error("Error cargando datos:", err);
      alert("Error cargando productos o categorías.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleSave = async (form) => {
    console.log("Form que se envía al backend:", form);

    // 🔥 Corregimos tipos antes de mandar
    const cleanForm = {
      ...form,
      price: parseFloat(form.price),
      discount: parseFloat(form.discount),
      stock: parseInt(form.stock, 10),
      is_launch: Boolean(form.is_launch),
      category_id: form.category_id ? parseInt(form.category_id, 10) : null,
      fragrance_id: form.fragrance_id ? String(form.fragrance_id) : null,
      promotion_id: form.promotion_id ? parseInt(form.promotion_id, 10) : null
    };

    console.log("Payload corregido:", cleanForm, JSON.stringify(cleanForm));

    try {
      if (editing) {
        await updateProduct(editing.id, cleanForm);
        alert("Producto actualizado correctamente.");
      } else {
        await createProduct(cleanForm);
        alert("Producto creado correctamente.");
      }
      setShowForm(false);
      fetchData();
    } catch (err) {
      console.error("Error en handleSave:", err);
      alert("Error al guardar el producto.");
    }
  };



  const handleEdit = (producto) => {
    setEditing(producto);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await deleteProduct(id);
        alert("Producto eliminado.");
        fetchData();
      } catch (err) {
        console.error(err);
        alert("Error al eliminar el producto.");
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
  };
  const handleActivate = async (id) => {
    if (window.confirm("¿Estás seguro de reactivar este producto?")) {
      try {
        await activateProduct(id);
        alert("Producto reactivado.");
        fetchData();
      } catch (err) {
        console.error(err);
        alert("Error al reactivar el producto.");
      }
    }
  };

  useEffect(() => {
    const fetchFragrances = async () => {
      const data = await getAllFragrances();
      setFragrances(data);
    };
    fetchFragrances();
  }, []);

  useEffect(() => {
    const fetchPromotions = async () => {
      const data = await getPromotions();
      setPromotions(data);
    };
    fetchPromotions();
  }, []);

  return (
    <div className="productos-page">
      <h1>Gestión de Productos</h1>

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <>
          {showForm ? (
            <ProductoForm
              initialData={editing}
              onSave={handleSave}
              onCancel={handleCancel}
              categories={categories}
              fragrances={fragrances}
              promotions={promotions}
            />
          ) : (
            <>
              <div className="productos-top-actions">
                <button onClick={() => setShowInactive(!showInactive)}>
                  {showInactive ? "Ver Activos" : "Ver Inactivos"}
                </button>
                
                <div className="filtros-rapidos" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", minWidth: "200px" }}
                  />
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                  >
                    <option value="">Todas las categorías</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {!showInactive && (
                  <button className="crear-producto" onClick={handleCreate}>
                    + Crear Producto
                  </button>
                )}
              </div>
              <ProductosList
                productos={filteredProductos}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onActivate={handleActivate}
                showInactive={showInactive}
              />
            </>
          )}

        </>
      )}
    </div>
  );
}

export default ProductosPage;