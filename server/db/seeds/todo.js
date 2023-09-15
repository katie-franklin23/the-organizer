/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('todo').insert([
    { id: 1, user_id: 1, tasks: 'Make app1' },
    { id: 2, user_id: 1, tasks: 'Make app2' },
    { id: 3, user_id: 2, tasks: 'Make app3' },
    { id: 4, user_id: 3, tasks: 'Make app4' },
    { id: 5, user_id: 1, tasks: 'Make app5' },
    { id: 6, user_id: 2, tasks: 'Make app6' },
    { id: 7, user_id: 3, tasks: 'Make app7' },
    { id: 8, user_id: 2, tasks: 'Make app8' },
    { id: 9, user_id: 3, tasks: 'Make app9' },
  ])
}
