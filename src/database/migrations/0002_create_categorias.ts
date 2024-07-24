import { Knex } from 'knex'

export async function up(knex: Knex) {
  return knex.schema
    .createTable('categorias', (table) => {
      table.bigIncrements('id').primary().index()
      table.string('descricao', 150).index().notNullable()
    })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('categorias')
}
