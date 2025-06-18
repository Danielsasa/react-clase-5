import React, { useState, useEffect, useRef, useMemo } from 'react';
import './App.css';

function App() {
  const [vista, setVista] = useState('bitacora');

  // Estados para Bitácora
  const [planetas, setPlanetas] = useState(
    JSON.parse(localStorage.getItem('planetas')) || []
  );
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const inputImagenRef = useRef(null);

  // Estados para Panel de Control
  const [combustible, setCombustible] = useState(100);
  const [distancia, setDistancia] = useState(0);
  const [estadoNave, setEstadoNave] = useState('En órbita');
  const [planetasVisitados, setPlanetasVisitados] = useState([]);

  // Persistencia de la bitácora
  useEffect(() => {
    localStorage.setItem('planetas', JSON.stringify(planetas));
  }, [planetas]);

  // Efectos del panel de control
  useEffect(() => {
    if (vista !== 'panel') return;
    console.log("¡El panel está listo!");
    const intervalo = setInterval(() => {
      setCombustible(prev => {
        if (prev > 0) return prev - 1;
        setEstadoNave('Sin combustible');
        return 0;
      });
      setDistancia(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalo);
      console.log("El panel se ha apagado.");
    };
  }, [vista]);

  useEffect(() => {
    if (vista === 'panel') {
      console.log("¡Combustible actualizado!");
    }
  }, [combustible, vista]);

  // Funciones para Bitácora
  const convertirADataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imagenBase64 = null;
    if (imagen) {
      imagenBase64 = await convertirADataURL(imagen);
    }

    const nuevoPlaneta = {
      nombre,
      descripcion,
      imagen: imagenBase64 ?? (editIndex !== null ? planetas[editIndex].imagen : null),
    };

    if (editIndex !== null) {
      const nuevosPlanetas = [...planetas];
      nuevosPlanetas[editIndex] = nuevoPlaneta;
      setPlanetas(nuevosPlanetas);
      setEditIndex(null);
    } else {
      setPlanetas([...planetas, nuevoPlaneta]);
    }

    setNombre('');
    setDescripcion('');
    setImagen(null);

    if (inputImagenRef.current) {
      inputImagenRef.current.value = '';
    }
  };

  const handleDelete = (index) => {
    const nuevosPlanetas = [...planetas];
    nuevosPlanetas.splice(index, 1);
    setPlanetas(nuevosPlanetas);
    if (editIndex === index) {
      setEditIndex(null);
      setNombre('');
      setDescripcion('');
      setImagen(null);
      if (inputImagenRef.current) {
        inputImagenRef.current.value = '';
      }
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNombre(planetas[index].nombre);
    setDescripcion(planetas[index].descripcion);
    setImagen(null);
    if (inputImagenRef.current) {
      inputImagenRef.current.value = '';
    }
  };

  // Funciones para Panel de Control
  const mensajeEstado = useMemo(() => {
    return `Estado: ${estadoNave}`;
  }, [estadoNave]);

  const aterrizar = () => {
    setEstadoNave('Aterrizando');
    setPlanetasVisitados([...planetasVisitados, `Planeta ${planetasVisitados.length + 1}`]);
  };

  // Componente Planeta para Panel de Control
  function Planeta({ nombre }) {
    useEffect(() => {
      console.log(`¡El planeta ${nombre} ha aparecido!`);
      return () => {
        console.log(`¡El planeta ${nombre} ha desaparecido!`);
      };
    }, [nombre]);
    return <div>{nombre}</div>;
  }

  return (
    <div className="main-container">
      <nav>
        <button onClick={() => setVista('bitacora')}>Bitácora de Exploración</button>
        <button onClick={() => setVista('panel')}>Panel de Control Espacial</button>
      </nav>

      {vista === 'bitacora' && (
        <>
          <h1>Bitácora de Exploración</h1>
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
                onChange={e => setImagen(e.target.files[0])}
                ref={inputImagenRef}
              />
            </label>
            {imagen && (
              <img
                src={URL.createObjectURL(imagen)}
                alt="Vista previa"
                className="planeta-preview"
              />
            )}
            <div className="planeta-form-buttons">
              <button className="planeta-btn" type="submit">{editIndex !== null ? 'Actualizar' : 'Agregar'}</button>
              {editIndex !== null && (
                <button
                  className="planeta-btn-cancel"
                  type="button"
                  onClick={() => {
                    setEditIndex(null);
                    setNombre('');
                    setDescripcion('');
                    setImagen(null);
                    if (inputImagenRef.current) {
                      inputImagenRef.current.value = '';
                    }
                  }}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
          <h2>Planetas Registrados</h2>
          <ul>
            {planetas.map((planeta, index) => (
              <li key={index}>
                <h3>{planeta.nombre}</h3>
                <p>{planeta.descripcion}</p>
                {planeta.imagen && (
                  <img
                    src={planeta.imagen}
                    alt={planeta.nombre}
                    style={{ maxWidth: 200 }}
                  />
                )}
                <button className="planeta-btn" onClick={() => handleEdit(index)}>Editar</button>
                <button className="planeta-btn-cancel" onClick={() => handleDelete(index)}>Eliminar</button>
              </li>
            ))}
          </ul>
        </>
      )}

      {vista === 'panel' && (
        <>
          <h2>Panel de Control Espacial</h2>
          <p>Distancia: {distancia}</p>
          <p>Combustible: {combustible}</p>
          <p>{mensajeEstado}</p>
          <button className="planeta-btn" onClick={aterrizar} disabled={estadoNave === 'Aterrizando' || combustible === 0}>
            Aterrizar
          </button>
          <h3>Planetas visitados:</h3>
          {planetasVisitados.map((planeta, index) => (
            <Planeta key={index} nombre={planeta} />
          ))}
        </>
      )}
    </div>
  );
}

export default App;