import connection from './connection.ts'
// import { singleTask } from '../../models/to-do-models.ts'

export function getBudget(id: number) {
  console.log(1)
  return connection('budget')
    .where('user_id', id)
    .select('id', 'total', 'expenses', 'remaining')
}

interface newBudget {
  user_id: number
  total: number
  expenses: number
}

export function addBudget(newBudget: newBudget) {
  const { total, expenses } = newBudget

  const calculated = {
    ...newBudget,
    remaining: total - expenses,
  }

  return connection('budget').insert(calculated).returning('*')
}

interface Budget {
  user_id: number
  id: number
  total: number
  expenses: number
}

export function editedBudget(id: number, updatedBudget: Budget) {
  const { total, expenses } = updatedBudget

  const calculated = {
    ...updatedBudget,
    remaining: total - expenses,
  }

  return connection('budget').where('id', id).update(calculated).returning('*')
}
