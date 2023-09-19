import request from 'superagent'
import { Weather } from '../../models/weather.ts'

export async function getWeather(location: string): Promise<Weather> {
  const response = await request.get(`/api/v1/weather/${location}`)
  const responseBody = response.body

  return responseBody
}
