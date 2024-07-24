import { Knex } from 'knex'
import { TableNames } from '../TableNames'

export async function up(knex: Knex) {
  return knex.schema
    .alterTable(TableNames.users, (table) => {
      table.string('color', 150)
    })
}

export async function down(knex: Knex) {
  return knex.schema.alterTable(TableNames.users, (table) => {
    table.dropColumn('color')
  })
}