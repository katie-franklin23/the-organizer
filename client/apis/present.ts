import request from 'superagent'
import PresentsType from '../../models/presents'

export async function getPresents(): Promise<PresentsType[]> {
  const response = await request.get('/api/v1/presents')

  return response.body
}
