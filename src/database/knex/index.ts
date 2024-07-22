import { knex, Knex } from 'knex'
import path from 'path'

const config: Knex.Config = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__dirname, '..', 'database.sqlite')
  },
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations')
  }
}

export const KnexConfig = knex(config)
