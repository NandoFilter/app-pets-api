import { TableNames } from '../database/TableNames'
import { Knex } from '../database/knex'
import { Pet } from '../models'

const table = TableNames.pets

export default class PetTransaction {
  public static async getAll(): Promise<Pet[]> {
    return Knex(table).select('*')
  }

  public static async getById(id: number): Promise<Pet | undefined> {
    const [result] = await Knex(table).select('*').where('id', id)

    return result || undefined
  }

  public static async insert(pet: Pet): Promise<number | undefined> {
    const [result] = await Knex(table).insert(pet).returning('id')

    return result.id || undefined
  }

  public static async update(id: number, pet: Pet): Promise<number | undefined> {
    const result = await Knex(table).update(pet).where('id', id)

    return result || undefined
  }

  public static async delete(id: number): Promise<number | undefined> {
    const result = await Knex(table).delete().where('id', id)

    return result || undefined
  }
}
