import { useState } from 'react'
import './App.css'
import Widget from './components/Widget/widget.jsx'

// Importamos el componente Widget

function App () {
  // estado para saber si el usuario a iniciado sesion
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // funcion para simular el inicio y cierre de sesion
  const handleLogin = () => {
    setIsLoggedIn(true)
  }
  const handleLogout = () => {
    setIsLoggedIn(false)
  }
  return (

    <div className='container'>
      <h1>Mi Panel de Control</h1>
      {/* Renderizado condicional con operador ternario */}
      {
        isLoggedIn
          ? (
            <div>
              <widget title='Perfil de Usuario'>
                <p><strong>Usuario:</strong> Daniel Santamaria</p>
                <p><strong>Rol:</strong> Administrador</p>
                <button onClick={handleLogout}>Cerrar sesión</button>
              </widget>
            </div>
            )
          : (
            <div>
              <widget title='Por favor, inicia sesión'>
                <p>Por favor, inicia sesión para continuar</p>
                <button onClick={handleLogin}>Iniciar sesión</button>
              </widget>
            </div>
            )
      }
    </div>

  )
}
export default App
