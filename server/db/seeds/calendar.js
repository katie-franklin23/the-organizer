/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries

  await knex('calendar').insert([
    {
      id: 1,
      day: '23',
      month: '4',
      year: '2023',
      events: 'A birthday party',
      active: true,
    },
    {
      id: 2,
      day: '25',
      month: '5',
      year: '2023',
      events: 'Team meeting',
      active: true,
    },
    {
      id: 3,
      day: '10',
      month: '6',
      year: '2023',
      events: 'Family picnic',
      active: false,
    },
  ])
}
