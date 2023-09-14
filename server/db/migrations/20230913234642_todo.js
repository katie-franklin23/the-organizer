/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function up(knex) {
  return knex.schema.createTable('todo', (table) => {
    table.increments('id')
    table.string('task_name')
    table.date('due_date')
    table.integer('priority')
    table.string('labels')
    table.string('reminder')
    table.integer('timer')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function down(knex) {
  return knex.schema.dropTable('todo')
}
