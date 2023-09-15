import { getWeather } from '../apis/weatherApi.ts'
import { useQuery } from '@tanstack/react-query'

export default function Weather() {
  const {
    data: weather,
    isError,
    isLoading,
  } = useQuery(['weather'], () => getWeather('Wellington'))

  if (isError) {
    return <div>Weather</div>
  }
  if (!weather || isLoading) {
    return <div>What is the weather like?</div>
  }
  console.log(weather)
  return (
    <>
      <h2>Weather in {weather.location.name}</h2>
      {/* <img
        src={weather.current.condition.icon}
        alt={weather.current.condition.text}
      /> */}
      <p>Date & Time: {weather.location.localtime}</p>
      <p>Temperature: {weather.current.temp_c}°C</p>
      <p>Condition: {weather.current.condition.text}</p>
    </>
  )
}
