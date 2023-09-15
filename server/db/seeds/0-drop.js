export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('calendar').del()
  await knex('reference').del()
  await knex('todo').del()
  await knex('users').del()
  await knex('weather').del()
}
