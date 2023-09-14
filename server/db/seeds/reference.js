/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('reference').del()
  await knex('reference').insert([
    {
      id: 1,
      user_id: '123',
      calendar_id: '12345',
      todo_id: '67890',
      weather_id: '54321',
    },
    {
      id: 2,
      user_id: '456',
      calendar_id: '45689',
      todo_id: '56458',
      weather_id: '98562',
    },
    {
      id: 3,
      user_id: '789',
      calendar_id: '67890',
      todo_id: '09876',
      weather_id: '54682',
    },
  ])
}
