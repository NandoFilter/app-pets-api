import { Knex } from 'knex'
import { TableNames } from '../TableNames'

export async function up(knex: Knex) {
  return knex.schema
    .createTable(TableNames.users, (table) => {
      table.bigIncrements('id').primary().index()
      table.string('name', 150).index().notNullable()
      table.string('email', 75).notNullable()
      table.string('image', 256)
      table.string('phone', 11).notNullable()
      table.string('password', 50).notNullable()
    })
    .then(() => {
      console.log(`# Create table ${TableNames.users}`)
    })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TableNames.users).then(() => {
    console.log(`# Dropped table ${TableNames.users}`)
  })
}
