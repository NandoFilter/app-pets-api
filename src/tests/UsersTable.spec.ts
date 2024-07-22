import knex, { Knex } from 'knex'
import { TableNames } from '../database/TableNames'
import { up, down } from '../database/migrations/0000_create_users';

describe('Users Table', () => {
  let db: Knex

  beforeAll(async () => {
    db = knex({
      client: 'sqlite3',
      connection: {
        filename: ':memory:'
      },
      useNullAsDefault: true
    })

    await up(db)
  })

  afterAll(async () => {
    await down(db)
    await db.destroy()
  })

  test('Should create Users table with the correct columns', async () => {
    const columns = await db.raw(`PRAGMA table_info(${TableNames.users});`)

    const formattedColumns = columns.map((col: any) => ({
      cid: col.cid,
      name: col.name,
      type: col.type,
      notnull: col.notnull,
      dflt_value: col.dflt_value,
      pk: col.pk
    }))

    expect(formattedColumns).toEqual([
      { cid: 0, name: 'id', type: 'INTEGER', notnull: 1, dflt_value: null, pk: 1 },
      { cid: 1, name: 'name', type: 'varchar(150)', notnull: 1, dflt_value: null, pk: 0 },
      { cid: 2, name: 'email', type: 'varchar(75)', notnull: 1, dflt_value: null, pk: 0 },
      { cid: 3, name: 'image', type: 'varchar(256)', notnull: 0, dflt_value: null, pk: 0 },
      { cid: 4, name: 'phone', type: 'varchar(11)', notnull: 1, dflt_value: null, pk: 0 },
      { cid: 5, name: 'password', type: 'varchar(50)', notnull: 1, dflt_value: null, pk: 0 }
    ])
  })
})
