import request from 'superagent'

export async function getBudget(userID: number) {
  const response = await request.get(`/api/v1/budgets/${userID}`)
  return response.body
}

export async function addBudget(budget) {
  const { user_id } = budget
  const response = await request.post(`/api/v1/budgets/${user_id}`).send(budget)

  return response.body
}

interface Budget {
  id: number
  user_id: number
  total: number
  expenses: number
}

export async function updateBudget(budget: Budget) {
  const { id } = budget

  const response = await request.patch(`/api/v1/budgets/${id}`).send(budget)

  return response.body
}
