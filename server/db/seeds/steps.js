/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  await knex('steps').insert([
    { id: 1, user_id: 1, steps: 1211 },
    { id: 2, user_id: 3, steps: 1231 },
    { id: 3, user_id: 2, steps: 6433 },
    { id: 4, user_id: 2, steps: 1232 },
    { id: 5, user_id: 1, steps: 1000 },
    { id: 6, user_id: 2, steps: 1232 },
    { id: 7, user_id: 3, steps: 7234 },
    { id: 8, user_id: 3, steps: 2343 },
    { id: 9, user_id: 1, steps: 1523 },
    { id: 10, user_id: 2, steps: 1241 },
    { id: 11, user_id: 1, steps: 1234 },
    { id: 12, user_id: 1, steps: 232 },
    { id: 13, user_id: 1, steps: 1211 },
    { id: 14, user_id: 1, steps: 2322 },
    { id: 15, user_id: 1, steps: 1231 },
    { id: 16, user_id: 1, steps: 232 },
  ])
}
