import React from 'react';

function PlanetaLista({ planetas, onSeleccionar, onEliminar, onEditar }) {
  return (
    <ul>
      {planetas.map((planeta, i) => (
        <li key={i}>
          <strong onClick={() => onSeleccionar(i)} style={{ cursor: 'pointer' }}>
            {planeta.nombre}
          </strong>
          <button onClick={() => onEditar(i)}>Editar</button>
          <button onClick={() => onEliminar(i)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
}

export default PlanetaLista;