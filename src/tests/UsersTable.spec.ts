import { KnexConfig } from '../database/knex';

describe('Users Table', () => {
  const table = 'users'

  test('Should pass if Users table exists', async () => {
    const tableExists = await KnexConfig.schema.hasTable(table)

    expect(tableExists).toBeTruthy()
  })

  test('Should pass if Users table has the correct columns', async () => {
    const columns = await KnexConfig.raw(`PRAGMA table_info(${table});`)

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
