import { getWeather } from '../apis/weatherApi.ts'
import { useQuery } from '@tanstack/react-query'
// import '../styles/weather.css'

export default function Weather() {
  //creating a const here to store the city name from your new input field
  // const [city, setCity] = useState('Wellington')

  const {
    data: weather,
    isError,
    isLoading,
  } = useQuery(['weather'], () => getWeather('Wellington')) //pass city

  if (isError) {
    return <div className="weather-container">Error retrieving the weather</div>
  }
  if (!weather || isLoading) {
    return <div className="weather-container">Weather is loading..</div>
  }

  //handleCitySubmit function here using setCity to update the city name
  //In case the query doesn't refresh, you can use queryClient.invalidateQueries('weather') to force a refresh

  // Extract relevant data from the weather API response
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

  // return (
  //   <div className="wrapper">
  //     <div className="widget-container">
  //       <div className="top-left">
  //         <h1 className="city" id="city">
  //           {location.name}
  //         </h1>
  //         <h2 id="day">{formattedDate}</h2>
  //         <h3 id="date">{formattedTime}</h3>
  //         <p className="geo">{location.country}</p>
  //       </div>
  //       <div className="top-right">
  //         <h1 id="weather-status">Weather / {condition.text}</h1>
  //         <img
  //           className="weather-icon"
  //           src={condition.icon}
  //           alt={condition.text}
  //         />
  //       </div>
  //       <div className="horizontal-half-divider"></div>
  //       <div className="bottom-left">
  //         <h1 id="temperature">{temp_c}</h1>
  //         <h2 id="celsius">&deg;C</h2>
  //         <h2 id="temp-divider">/</h2>
  //         <h2 id="fahrenheit">{temp_f}&deg;F</h2>
  //       </div>
  //       <div className="vertical-half-divider"></div>
  //       <div className="bottom-right">
  //         <div className="other-details-key">
  //           <br />
  //           <p>Wind Speed</p>
  //           <p>Humidity</p>
  //           <p>Pressure</p>
  //         </div>
  //         <div className="other-details-values">
  //           <br />
  //           <p className="windspeed">{wind_kph} Km/h</p>
  //           <p className="humidity">{humidity} %</p>
  //           <p className="pressure">{pressure_mb} hPa</p>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )

  return (
    <div className="wrapper">
      <div className="widget-container bg-white border border-gray-300 text-black rounded-lg shadow-md">
        <div className="flex flex-wrap justify-between">
          <div className="w-full lg:w-1/2 p-4">
            <h1 className="text-2xl font-semibold text-black" id="city">
              {location.name}
            </h1>
            <h2 id="day" className="text-lg text-black">
              {formattedDate}
            </h2>
            <h3 id="date" className="text-lg text-black">
              {formattedTime}
            </h3>
            <p className="geo text-black">{location.country}</p>
          </div>
          <div className="w-full lg:w-1/2 p-4">
            <h1 id="weather-status" className="text-xl text-black">
              Weather / {condition.text}
            </h1>
            <img
              className="weather-icon w-24 h-24 mx-auto"
              src={condition.icon}
              alt={condition.text}
            />
          </div>
        </div>
        <hr className="border-t-2 border-blue-700 mx-4" />
        <div className="flex flex-wrap justify-between">
          <div className="w-full lg:w-1/2 p-4">
            <h1 id="temperature" className="text-4xl font-semibold text-black">
              {temp_c}
            </h1>
            <h2 id="celsius" className="text-xl text-black">
              &deg;C
            </h2>
            <h2 id="temp-divider" className="text-xl text-black">
              /
            </h2>
            <h2 id="fahrenheit" className="text-xl text-black">
              {temp_f}&deg;F
            </h2>
          </div>
          <div className="w-full lg:w-1/2 p-4">
            <div className="other-details-key">
              <br />
              <p className="text-lg text-black">Wind Speed</p>
              <p className="text-lg text-black">Humidity</p>
              <p className="text-lg text-black">Pressure</p>
            </div>
            <div className="other-details-values">
              <br />
              <p className="windspeed text-lg text-black">{wind_kph} Km/h</p>
              <p className="humidity text-lg text-black">{humidity} %</p>
              <p className="pressure text-lg text-black">{pressure_mb} hPa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
