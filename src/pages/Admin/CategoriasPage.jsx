import React, { useState, useEffect } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/categoryService";
import CategoriasList from "../../components/Admin/CategoriasList";
import CategoriaForm from "../../components/Admin/CategoriaForm";

const CategoriasPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategorias(data.sort((a, b) => a.order_index - b.order_index));
    } catch (err) {
      console.error("Error cargando categorías:", err);
      alert("Error cargando categorías.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleSave = async (form) => {
    try {
      if (editing) {
        await updateCategory(editing.id, form);
        alert("Categoría actualizada correctamente.");
      } else {
        await createCategory(form);
        alert("Categoría creada correctamente.");
      }
      setShowForm(false);
      fetchCategorias();
    } catch (err) {
      console.error(err);
      alert("Error al guardar la categoría.");
    }
  };

  const handleEdit = (categoria) => {
    setEditing(categoria);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta categoría?")) {
      try {
        await deleteCategory(id);
        alert("Categoría eliminada.");
        fetchCategorias();
      } catch (err) {
        console.error(err);
        alert("Error al eliminar la categoría.");
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div className="categorias-page">
      <h1>Gestión de Categorías</h1>

      {loading ? (
        <p>Cargando categorías...</p>
      ) : (
        <>
          {showForm ? (
            <CategoriaForm
              initialData={editing}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <>
              <button className="crear-categoria" onClick={handleCreate}>
                + Crear Categoría
              </button>
              <CategoriasList
                categorias={categorias}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CategoriasPage;
