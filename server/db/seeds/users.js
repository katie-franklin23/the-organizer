/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      username: 'user123',
      full_name: 'John Doe',
      location: 'New York City',
      image: 'https://example.com/johndoe.jpg',
      auth0_id: 'abcdef123456',
    },
    {
      id: 2,
      username: 'user456',
      full_name: 'Alice Smith',
      location: 'Los Angeles',
      image: 'https://example.com/alicesmith.jpg',
      auth0_id: 'xyz789456',
    },
    {
      id: 3,
      username: 'testuser',
      full_name: 'Bob Johnson',
      location: 'Chicago',
      image: 'https://example.com/bobjohnson.jpg',
      auth0_id: '123abc456def',
    },
  ])
}
