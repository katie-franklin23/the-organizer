import connection from './connection.ts'
import { singleTask } from '../../models/to-do-models.ts'

export function getAllTasks(id: number) {
  return connection('todo')
    .where('user_id', id)
    .select('id', 'tasks', 'created', 'completed')
}

export function addTasks(newTasks: singleTask) {
  return connection('todo')
    .insert(newTasks)
    .returning(['id', 'tasks', 'created'])
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

export function checkTask(id: number, checked: boolean) {
  return connection('todo')
    .where('id', id)
    .update(checked)
    .returning(['id', 'tasks', 'completed'])
}
