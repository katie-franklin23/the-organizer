import request from 'superagent'

export async function getWeather(location: string) {
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY

  const weatherResponse = await request
    .get(
      `https://api.weatherapi.com/v1/current.json?lang=en&q=${location}&key=${WEATHER_API_KEY}`,
    )
    .set('user-agent', `${location}`)

  return weatherResponse.body
}
