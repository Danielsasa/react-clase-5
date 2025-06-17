import { useState } from 'react'
import './App.css'

function App() {
  //estado para saber si el usuario a iniciado sesion
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  //funcion para simular el inicio y cierre de sesion
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
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
        ) 
      : (
        <div>
          <button onClick={handleLogin}>Iniciar Sesion</button>
        </div>
      )
  }
</div>

  )
}
export default App