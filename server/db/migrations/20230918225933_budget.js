/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('budget', (table) => {
    table.increments('id').primary()
    table.integer('user_id')
    table.integer('total')
    table.integer('expenses')
    table.integer('remaining')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('budget')
}
