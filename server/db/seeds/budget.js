/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('budget').insert([
    {
      id: 1,
      user_id: 1,
      total: 10000,
      expenses: 3300,
      remaining: 7700,
    },
    {
      id: 2,
      user_id: 1,
      total: 10000,
      expenses: 7000,
      remaining: 3000,
    },
    {
      id: 3,
      user_id: 1,
      total: 10000,
      expenses: 9999,
      remaining: 1,
    },
  ])
}
