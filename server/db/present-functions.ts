import connection from './connection.ts'

export function getAllPresent() {
  return connection('presents').select('*')
}
