/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  await knex('events').del()
  await knex('events').insert([
    {
      title: "Complete Bootcamp by Sept 22, 2023",
      start: new Date(2023, 8, 22, 0, 0, 0),
      end: new Date(2023, 8, 22, 0, 0, 0),
    },
    {
      title: "Start Careers by Sept 22, 2023",
      start: new Date(2023, 8, 22, 0, 0, 0),
      end: new Date(2023, 8, 22, 0, 0, 0),
    },
    {
      title: "Graduate on Sept 21, 2023",
      start: new Date(2023, 8, 21, 0, 0, 0),
      end: new Date(2023, 8, 21, 0, 0, 0),
    },
  ]);
}
