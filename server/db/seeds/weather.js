/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries

  await knex('weather').insert([
    {
      id: 1,
      active: true,
    },
    {
      id: 2,
      active: false,
    },
    {
      id: 3,
      active: true,
    },
  ])
}
