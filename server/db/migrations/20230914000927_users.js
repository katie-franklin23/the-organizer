/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('username')
    table.string('full_name')
    table.string('location')
    table.text('image')
    table.string('auth0_id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('users')
}
