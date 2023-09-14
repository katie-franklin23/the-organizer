/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('reference', (table) => {
    table.increments('id')
    table.integer('user_id')
    table.integer('calendar_id')
    table.integer('todo_id')
    table.integer('weather_id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('reference')
}
