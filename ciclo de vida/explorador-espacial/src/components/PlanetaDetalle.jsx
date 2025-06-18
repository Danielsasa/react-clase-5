import React from 'react';

function PlanetaDetalle({ planeta }) {
  if (!planeta) return null;
  return (
    <div style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
      <h3>{planeta.nombre}</h3>
      <p>{planeta.descripcion}</p>
      {planeta.imagen && <img src={planeta.imagen} alt={planeta.nombre} style={{ maxWidth: 200 }} />}
    </div>
  );
}

export default PlanetaDetalle;