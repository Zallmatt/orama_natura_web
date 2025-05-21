import React from 'react';
import './Lanzamientos.css';

const lanzamientosMock = [
  {
    nombre: 'Perfume femenino',
    descripcion: 'Una fragancia floral y elegante ideal para uso diario.',
  },
  {
    nombre: 'TODODIA - cabello',
    descripcion: 'Tratamiento capilar con nutrición profunda para todo tipo de cabello.',
  },
  {
    nombre: 'ERVA DOCE - deo corporal',
    descripcion: 'Desodorante natural con fragancia suave de erva doce.',
  },
  {
    nombre: 'Labial gloss',
    descripcion: 'Brillo labial hidratante con acabado natural.',
  },
  {
    nombre: 'CREER PARA VER - yerbera',
    descripcion: 'Yerbera reutilizable de edición limitada con diseño exclusivo.',
  },
  {
    nombre: 'NATURÉ - jaboncitos',
    descripcion: 'Mini jabones artesanales con fragancias frutales.',
  },
];

const Lanzamientos = () => {
  return (
    <div className="lanzamientos-container">
      <h1 className="lanzamientos-titulo">LANZAMIENTOS</h1>
      <div className="lanzamientos-grid">
        {lanzamientosMock.map((item, index) => (
          <div key={index} className="lanzamiento-card">
            <h3>{item.nombre}</h3>
            <p>{item.descripcion}</p>
            <button className="btn-encargar">Encargar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lanzamientos;
