/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function up(knex) {
  return knex.schema.createTable('calendar', (table) => {
    table.increments('id')
    table.integer('day')
    table.integer('month')
    table.integer('year')
    table.string('events')
    table.boolean('active')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('calendar')
}
