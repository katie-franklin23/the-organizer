import request from 'superagent'

export async function getWeather() {
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY

  const weatherResponse = await request
    .get(
      `https://api.weatherapi.com/v1/current.json?lang=en&q=Auckland&key=${WEATHER_API_KEY}`,
    )
    .set('user-agent', 'weather in Auckland')

  return weatherResponse.body
}

https://api.weatherapi.com/v1/current.json?lang=en&q=Auckland&key=30c9839a16624e85b4f43903231409