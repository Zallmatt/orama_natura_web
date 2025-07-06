// src/pages/Admin/FragrancesPage.jsx
import React, { useEffect, useState } from "react";
import {
  getAllFragrances,
  createFragrance,
  updateFragrance,
  deleteFragrance
} from "../../services/fragranceService";
import FragranceForm from "../../components/Admin/FragranceForm";
import FragranceList from "../../components/Admin/FragranceList";
import "./FragrancesPage.css";

const FragrancesPage = () => {
  const [fragrances, setFragrances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchFragrances = async () => {
    setLoading(true);
    try {
      const data = await getAllFragrances();
      setFragrances(data);
    } catch (err) {
      console.error("Error al cargar fragancias:", err);
      alert("No se pudieron cargar las fragancias.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFragrances();
  }, []);

  const handleCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleSave = async (form) => {
    try {
      if (editing) {
        await updateFragrance(editing.id, form);
        alert("Fragancia actualizada.");
      } else {
        await createFragrance(form);
        alert("Fragancia creada.");
      }
      setShowForm(false);
      fetchFragrances();
    } catch (err) {
      console.error(err);
      alert("Error al guardar la fragancia.");
    }
  };

  const handleEdit = (frag) => {
    setEditing(frag);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar esta fragancia?")) {
      try {
        await deleteFragrance(id);
        alert("Fragancia eliminada.");
        fetchFragrances();
      } catch (err) {
        console.error(err);
        alert("Error al eliminar la fragancia.");
      }
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setShowForm(false);
  };

  return (
    <div className="fragrances-page">
      <h1>Gestión de Fragancias</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {showForm ? (
            <FragranceForm
              initialData={editing}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <>
              <div className="top-actions">
                <button onClick={handleCreate}>+ Crear Fragancia</button>
              </div>
              <FragranceList
                fragrances={fragrances}
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

export default FragrancesPage;
