import knex, { Knex } from 'knex'
import { TableNames } from '../database/TableNames'
import { up, down } from '../database/migrations/0001_create_pets';

describe('Pets Table', () => {
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

  test('Should create Pets table with the correct columns', async () => {
    const columns = await db.raw(`PRAGMA table_info(${TableNames.pets});`)

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
      { cid: 1, name: 'name', type: 'varchar(50)', notnull: 0, dflt_value: null, pk: 0 },
      { cid: 2, name: 'gender', type: 'varchar(1)', notnull: 0, dflt_value: null, pk: 0 },
      { cid: 3, name: 'type', type: 'INTEGER', notnull: 1, dflt_value: null, pk: 0 },
      { cid: 4, name: 'image', type: 'varchar(256)', notnull: 1, dflt_value: null, pk: 0 },
      { cid: 5, name: 'foundDate', type: 'datetime', notnull: 1, dflt_value: null, pk: 0 },
      { cid: 6, name: 'foundLocal', type: 'varchar(150)', notnull: 1, dflt_value: null, pk: 0 },
      { cid: 7, name: 'currentLocal', type: 'varchar(150)', notnull: 1, dflt_value: null, pk: 0 },
      { cid: 8, name: 'description', type: 'varchar(300)', notnull: 0, dflt_value: null, pk: 0 },
      { cid: 9, name: 'contact', type: 'varchar(11)', notnull: 1, dflt_value: null, pk: 0 },
      { cid: 10, name: 'idUser', type: 'INTEGER', notnull: 1, dflt_value: null, pk: 0 }
    ])
  })
})
