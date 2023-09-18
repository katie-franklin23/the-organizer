import React, { useState, useEffect } from 'react'

const Timer = () => {
  const [hours, setHours] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive) {
      interval = setInterval(() => {
        if (seconds < 59) {
          setSeconds(seconds + 1)
        } else if (minutes < 59) {
          setMinutes(minutes + 1)
          setSeconds(0)
        } else {
          setHours(hours + 1)
          setMinutes(0)
          setSeconds(0)
        }
      }, 1000)
    } else if (interval) {
      clearInterval(interval)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isActive, hours, minutes, seconds])

  const handleStartPauseClick = () => {
    setIsActive(!isActive)
  }

  const handleResetClick = () => {
    setHours(0)
    setMinutes(0)
    setSeconds(0)
    setIsActive(false)
  }

  return (
    <div>
      <div className="timer">
        {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:
        {String(seconds).padStart(2, '0')}
      </div>
      <div className="buttons">
        <button onClick={handleStartPauseClick}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleResetClick}>Reset</button>
      </div>
    </div>
  )
}

export default Timer
