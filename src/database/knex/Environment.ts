import { Knex } from 'knex'
import path from 'path'

export const development: Knex.Config = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__dirname, '..', 'database.sqlite')
  },
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations')
  }
}

export const staging: Knex.Config = {
  ...development
}

export const production: Knex.Config = {
  ...development
}
