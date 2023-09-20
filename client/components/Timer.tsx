import { useState, useRef, useEffect } from 'react'
import Confetti from 'react-confetti'
// import '../styles/stopwatch.css'

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
    <div className="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl">
      {showConfetti && <Confetti />}
      <div className="text-8xl  font-bold uppercase text-black text-center">
        {formatTime(time)}
      </div>
      <div className="flex justify-center gap-3">
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-600  ${
            isRunning ? 'bg-red-500 hover:bg-red-600' : ''
          }`}
          onClick={toggleTimer}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-400"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default Stopwatch
