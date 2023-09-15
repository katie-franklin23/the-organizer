import connection from './connection.ts'
import { singleTask } from '../../models/to-do-models.ts'

export function getAllTasks(id: number) {
  return connection('todo').where('user_id', id).select('id', 'tasks')
}

export function addTasks(newTasks: singleTask) {
  return connection('todo').insert(newTasks).returning(['id', 'tasks'])
}

export function deleteTask(id: number) {
  return connection('todo').where('id', id).del()
}

export function editTask(id: number, updatedText: string) {
  return connection('todo')
    .where('id', id)
    .update(updatedText)
    .returning(['id', 'tasks'])
}
