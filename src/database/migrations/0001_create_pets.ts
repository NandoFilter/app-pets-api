import { Knex } from 'knex'
import { TableNames } from '../TableNames'

export async function up(knex: Knex) {
  return knex.schema
    .createTable(TableNames.pets, (table) => {
      table.bigIncrements('id').primary().index()
      table.string('name', 50).index()
      table.string('gender', 1)
      table.integer('type').notNullable()
      table.string('image', 256).notNullable()
      table.dateTime('foundDate').notNullable()
      table.string('foundLocal', 150).notNullable()
      table.string('currentLocal', 150).notNullable()
      table.string('description', 300)
      table.string('contact', 11).notNullable()
      table.integer('idUser').notNullable()
    })
    .then(() => {
      console.log(`# Create table ${TableNames.pets}`)
    })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TableNames.pets).then(() => {
    console.log(`# Dropped table ${TableNames.pets}`)
  })
}
