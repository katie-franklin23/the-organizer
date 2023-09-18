import { useState, useRef, useEffect } from 'react'
import Confetti from 'react-confetti'
import '../styles/stopwatch.css' // Import the CSS file

function Stopwatch() {
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [time, setTime] = useState<number>(0)
  const timerRef = useRef<number | null>(null)
  const [showConfetti, setShowConfetti] = useState<boolean>(false)

  useEffect(() => {
    if (time === 10000) {
      setShowConfetti(true)
      setTimeout(() => {
        setShowConfetti(false)
      }, 5000)
    } else {
      setShowConfetti(false)
    }
  }, [time])

  const formatTime = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)
    const msecs = (milliseconds % 1000) / 10

    const formattedMinutes = minutes.toString().padStart(2, '0')
    const formattedSeconds = seconds.toString().padStart(2, '0')
    const formattedMilliseconds = msecs.toString().padStart(2, '0')

    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`
  }

  const toggleTimer = () => {
    if (isRunning) {
      setIsRunning(false)
      clearInterval(timerRef.current!)
    } else {
      setIsRunning(true)
      timerRef.current = window.setInterval(() => {
        setTime((prevTime) => prevTime + 10)
      }, 10)
    }
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTime(0)
    clearInterval(timerRef.current!)
    setShowConfetti(false)
  }

  return (
    <div className="stopwatch-container">
      {showConfetti && <Confetti />}
      <div className="time-display">{formatTime(time)}</div>
      <div className="buttons-container">
        <button className="buttons" onClick={toggleTimer}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button className="buttons" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default Stopwatch
