import request from 'superagent'

export async function getStepCounts(userID: number) {
  const response = await request.get(`/api/v1/steps/${userID}`)

  return response.body
}

interface Steps {
  user_id: number
  steps: number
}

export async function addSteps(steps: Steps) {
  const { user_id } = steps
  const response = await request.post(`/api/v1/steps/${user_id}`).send(steps)

  return response.body
}
