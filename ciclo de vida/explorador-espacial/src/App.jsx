import React, { useState, useEffect, useMemo } from 'react';
import Planeta from './components/Planeta';

function App() {
  // Estados
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(100);
  const [estadoNave, setEstadoNave] = useState('En órbita');
  const [planetasVisitados, setPlanetasVisitados] = useState([]);

  // Montaje y desmontaje
  useEffect(() => {
    console.log("¡El panel de control está listo!");

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
      console.log("El panel de control se ha apagado.");
    };
  }, []);

  // Actualización de combustible
  useEffect(() => {
    console.log("¡Combustible actualizado!");
  }, [combustible]);

  // Memo para el mensaje de estado
  const mensajeEstado = useMemo(() => {
    return `Estado: ${estadoNave}`;
  }, [estadoNave]);

  // Función para aterrizar
  const aterrizar = () => {
    setEstadoNave('Aterrizando');
    setPlanetasVisitados([...planetasVisitados, `Planeta ${planetasVisitados.length + 1}`]);
  };

  return (
    <div>
      <h2>Panel de Control Espacial</h2>
      <p>Distancia: {distancia}</p>
      <p>Combustible: {combustible}</p>
      <p>{mensajeEstado}</p>
      <button onClick={aterrizar} disabled={estadoNave === 'Aterrizando' || combustible === 0}>
        Aterrizar
      </button>
      <h3>Planetas visitados:</h3>
      {planetasVisitados.map((planeta, index) => (
        <Planeta key={index} nombre={planeta} />
      ))}
    </div>
  );
}

export default App;