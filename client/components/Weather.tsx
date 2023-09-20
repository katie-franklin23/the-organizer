<<<<<<< HEAD
// import { getWeather } from '../apis/weatherApi.ts'
// import { useQuery } from '@tanstack/react-query'
// import '../styles/main.css'

// export default function Weather() {
//   const {
//     data: weather,
//     isError,
//     isLoading,
//   } = useQuery(['weather'], () => getWeather('Wellington'))

//   if (isError) {
//     return <div className="weather-container">Weather</div>
//   }
//   if (!weather || isLoading) {
//     return <div className="weather-container">What is the weather like?</div>
//   }

//   return (
//     <div className="weather-container">
//       <h2 className="weather-heading">Weather in {weather.location.name}</h2>
//       <p className="weather-text">Date & Time: {weather.location.localtime}</p>
//       <p className="weather-text">Temperature: {weather.current.temp_c}°C</p>
//       <p className="weather-text">
//         Condition: {weather.current.condition.text}
//       </p>
//     </div>
//   )
// }

// {
//   /* <img
//         src={weather.current.condition.icon}
//         alt={weather.current.condition.text}
//       /> */
// }

import { useState } from 'react'
=======
>>>>>>> main
import { getWeather } from '../apis/weatherApi.ts'
import { useQuery } from '@tanstack/react-query'
import '../styles/main.css'

export default function Weather() {
<<<<<<< HEAD
  const [city, setCity] = useState('Wellington')
=======
  //creating a const here to store the city name from your new input field
  // const [city, setCity] = useState('Wellington')
>>>>>>> main

  const {
    data: weather,
    isError,
    isLoading,
<<<<<<< HEAD
    refetch,
  } = useQuery(['weather', city], () => getWeather(city))

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    refetch()
  }
=======
  } = useQuery(['weather'], () => getWeather('Wellington')) //pass city
>>>>>>> main

  if (isError) {
    return <div className="weather-container">Error retrieving the weather</div>
  }
  if (!weather || isLoading) {
    return <div className="weather-container">Weather is loading..</div>
  }

<<<<<<< HEAD
=======
  //handleCitySubmit function here using setCity to update the city name
  //In case the query doesn't refresh, you can use queryClient.invalidateQueries('weather') to force a refresh

  // Extract relevant data from the weather API response
>>>>>>> main
  const {
    location,
    current: {
      temp_c,
      temp_f,
      condition,
      wind_kph,
      humidity,
      pressure_mb,
      last_updated,
    },
  } = weather

  // Format date and time
  const currentDate = new Date(last_updated)
  const formattedDate = currentDate.toLocaleDateString()
  const formattedTime = currentDate.toLocaleTimeString()

  return (
    <div className="wrapper">
      {/* add an input field and a form handler that handles the city submission*/}
      <div className="widget-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>

        <div className="top-left">
          <h1 className="city" id="city">
            {location.name}
          </h1>
          <h2 id="day">{formattedDate}</h2>
          <h3 id="date">{formattedTime}</h3>
          <p className="geo">{location.country}</p>
        </div>
        <div className="top-right">
          <h1 id="weather-status">Weather / {condition.text}</h1>
          <img
            className="weather-icon"
            src={condition.icon}
            alt={condition.text}
          />
        </div>
        <div className="horizontal-half-divider"></div>
        <div className="bottom-left">
          <h1 id="temperature">{temp_c}</h1>
          <h2 id="celsius">&deg;C</h2>
          <h2 id="temp-divider">/</h2>
          <h2 id="fahrenheit">{temp_f}&deg;F</h2>
        </div>
        <div className="vertical-half-divider"></div>
        <div className="bottom-right">
          <div className="other-details-key">
            <br />
            <p>Wind Speed</p>
            <p>Humidity</p>
            <p>Pressure</p>
          </div>
          <div className="other-details-values">
            <br />
            <p className="windspeed">{wind_kph} Km/h</p>
            <p className="humidity">{humidity} %</p>
            <p className="pressure">{pressure_mb} hPa</p>
          </div>
        </div>
      </div>
    </div>
  )
}
