/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function up(knex) {
  return knex.schema.createTable('todo', (table) => {
    table.increments('id').primary()
    table.integer('user_id')
    table.string('tasks')
    table.string('created')
    table.boolean('completed')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function down(knex) {
  return knex.schema.dropTable('todo')
}
