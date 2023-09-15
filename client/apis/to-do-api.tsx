import request from 'superagent'
import { singleTask } from '../../models/to-do-models'

export async function getToDoList(userID: number) {
  try {
    const response = await request.get(`/api/v1/todo/${userID}`)

    return response.body
  } catch (error) {
    console.log(error)
  }
}

export async function addTask(newTask: singleTask) {
  const response = await request.post('/api/v1/todo').send(newTask)

  return response.body
}

export async function deleteTask(id: number) {
  const response = await request.del(`/api/v1/todo/${id}`)

  return response.body
}
