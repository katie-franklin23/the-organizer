/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('todo').del()
  await knex('todo').insert([
    {
      id: 1,
      task_name: 'Task 1',
      due_date: '2023-09-20',
      priority: 3,
      labels: 'Work',
      reminder: '2023-09-19T14:00:00',
      timer: 30,
    },
    {
      id: 2,
      task_name: 'Task 2',
      due_date: '2023-09-22',
      priority: 2,
      labels: 'Personal',
      reminder: '2023-09-22T09:30:00',
      timer: 45,
    },
    {
      id: 3,
      task_name: 'Task 3',
      due_date: '2023-09-25',
      priority: 1,
      labels: 'Home',
      reminder: '2023-09-24T18:00:00',
      timer: 60,
    },
  ])
}
