import { useState } from 'react'
import InputNumber from './InputNumber'
import Message from './Message'
import RestartButton from './RestartButton'

function Game() {
  const [numberToGuess, setNumberToGuess] = useState(() => Math.floor(Math.random() * 100) + 1)
  const [userGuess, setUserGuess] = useState('')
  const [message, setMessage] = useState('')
  const [gameOver, setGameOver] = useState(false)
  const [attempts, setAttempts] = useState(0) // Nuevo estado para los intentos

  const handleGuess = () => {
    const guess = parseInt(userGuess, 10)
    setAttempts(attempts + 1) // Incrementa los intentos
    if (guess === numberToGuess) {
      setMessage('¡Correcto!')
      setGameOver(true)
    } else if (guess < numberToGuess) {
      setMessage('El número es mayor')
    } else {
      setMessage('El número es menor')
    }
  }

  const handleRestart = () => {
    setNumberToGuess(Math.floor(Math.random() * 100) + 1)
    setUserGuess('')
    setMessage('')
    setGameOver(false)
    setAttempts(0) // Reinicia los intentos
  }

  return (
    <div className="game-container">
      <h2>Adivina el Número</h2>
      <p>Intentos: {attempts}</p>
      <InputNumber value={userGuess} setValue={setUserGuess} disabled={gameOver} />
      <button className="guess-btn" onClick={handleGuess} disabled={gameOver || !userGuess}>Adivinar</button>
      <Message text={message} />
      <RestartButton onRestart={handleRestart} />
    </div>
  )
}

export default Game