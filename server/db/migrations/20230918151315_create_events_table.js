

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('events', function (table) {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.dateTime('start').notNullable();
      table.dateTime('end').notNullable();
    });
  }
  
  


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('events');
  }
