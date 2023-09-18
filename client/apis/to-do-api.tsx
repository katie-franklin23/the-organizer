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

interface EditTask {
  id: number
  update: string
  checked?: string
}

export async function editTask({ id, update }: EditTask) {
  const response = await request
    .patch(`/api/v1/todo/${id}`)
    .send({ tasks: update })

  return response.body
}

interface Checked {
  id: number
  checked: boolean
}

export async function editCheck({ id, checked }: Checked) {
  const response = await request
    .patch(`/api/v1/todo/patched/${id}`)
    .send({ completed: checked })
  return response.body
}
