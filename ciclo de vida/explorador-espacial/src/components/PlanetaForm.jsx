import React, { useState, useEffect, useRef } from 'react';

function PlanetaForm({ onGuardar, planeta, onCancelar }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const fileInput = useRef();

  useEffect(() => {
    if (planeta) {
      setNombre(planeta.nombre);
      setDescripcion(planeta.descripcion);
      setImagen(planeta.imagen || '');
    } else {
      setNombre('');
      setDescripcion('');
      setImagen('');
    }
    if (fileInput.current) fileInput.current.value = '';
  }, [planeta]);

  const handleImagen = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImagen(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !descripcion.trim()) return;
    onGuardar({ nombre, descripcion, imagen });
    setNombre('');
    setDescripcion('');
    setImagen('');
    if (fileInput.current) fileInput.current.value = '';
  };

  return (
    <form className="planeta-form" onSubmit={handleSubmit}>
      <label>
        Nombre del planeta
        <input
          className="planeta-input"
          placeholder="Ejemplo: Marte"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />
      </label>
      <label>
        Descripción
        <textarea
          className="planeta-textarea"
          placeholder="Describe el planeta..."
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          required
        />
      </label>
      <label className="planeta-file-label">
        Imagen (opcional)
        <input
          className="planeta-file"
          type="file"
          accept="image/*"
          onChange={handleImagen}
          ref={fileInput}
        />
      </label>
      {imagen && (
        <img
          src={imagen}
          alt="Vista previa"
          className="planeta-preview"
        />
      )}
      <div className="planeta-form-buttons">
        <button className="planeta-btn" type="submit">{planeta ? 'Actualizar' : 'Agregar'}</button>
        {planeta && onCancelar && (
          <button className="planeta-btn-cancel" type="button" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default PlanetaForm;