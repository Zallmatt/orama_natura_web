import React, { useState, useEffect } from "react";
import {
  getPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
} from "../../services/promotionService";
import PromocionesList from "../../components/Admin/PromocionesList";
import PromocionForm from "../../components/Admin/PromocionForm";

const PromocionesPage = () => {
  const [promociones, setPromociones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPromociones();
  }, []);

  const fetchPromociones = async () => {
    setLoading(true);
    try {
      const data = await getPromotions();
      setPromociones(data.sort((a, b) => new Date(b.start_date) - new Date(a.start_date)));
    } catch (err) {
      console.error("Error cargando promociones:", err);
      alert("Error cargando promociones.");
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
        await updatePromotion(editing.id, form);
        alert("Promoción actualizada correctamente.");
      } else {
        await createPromotion(form);
        alert("Promoción creada correctamente.");
      }
      setShowForm(false);
      fetchPromociones();
    } catch (err) {
      console.error(err);
      alert("Error al guardar la promoción.");
    }
  };

  const handleEdit = (promo) => {
    setEditing(promo);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta promoción?")) {
      try {
        await deletePromotion(id);
        alert("Promoción eliminada.");
        fetchPromociones();
      } catch (err) {
        console.error(err);
        alert("Error al eliminar la promoción.");
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div className="promociones-page">
      <h1>Gestión de Promociones</h1>
      {loading ? (
        <p>Cargando promociones...</p>
      ) : (
        <>
          {showForm ? (
            <PromocionForm
              initialData={editing}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <>
              <button className="crear-promocion" onClick={handleCreate}>
                + Crear Promoción
              </button>
              <PromocionesList
                promociones={promociones}
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

export default PromocionesPage;
