import connection from './connection.ts'

export function getAllSteps(id: number) {
  return connection('steps').where('user_id', id).select('id', 'steps')
}

export function addSteps(steps: number) {
  return connection('steps').insert(steps).returning(['id', 'steps'])
}
