/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

export async function seed(knex) {
  await knex('todo').insert([
    {
      id: 1,
      user_id: 1,
      tasks: 'Make app1',
      created: formatDate(Date.now()),
      completed: true,
    },
    {
      id: 2,
      user_id: 1,
      tasks: 'Make app2',
      created: formatDate(Date.now()),
      completed: true,
    },
    {
      id: 3,
      user_id: 2,
      tasks: 'Make app3',
      created: formatDate(Date.now()),
      completed: false,
    },
    {
      id: 4,
      user_id: 3,
      tasks: 'Make app4',
      created: formatDate(Date.now()),
      completed: true,
    },
    {
      id: 5,
      user_id: 1,
      tasks: 'Make app5',
      created: formatDate(Date.now()),
      completed: false,
    },
    {
      id: 6,
      user_id: 2,
      tasks: 'Make app6',
      created: formatDate(Date.now()),
      completed: false,
    },
    {
      id: 7,
      user_id: 3,
      tasks: 'Make app7',
      created: formatDate(Date.now()),
      completed: true,
    },
    {
      id: 8,
      user_id: 2,
      tasks: 'Make app8',
      created: formatDate(Date.now()),
      completed: false,
    },
    {
      id: 9,
      user_id: 3,
      tasks: 'Make app9',
      created: formatDate(Date.now()),
      completed: true,
    },
  ])
}
