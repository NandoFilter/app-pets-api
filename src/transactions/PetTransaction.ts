import { TableNames } from '../database/TableNames'
import { KnexConfig } from '../database/knex'
import { Pet } from '../models'

const knex = KnexConfig(TableNames.pets)

export default class PetTransaction {
  public static async getAll(): Promise<Pet[]> {
    return knex.select('*')
  }

  public static async getById(id: number): Promise<Pet | undefined> {
    const [result] = await knex.select('*').where('id', id)

    return result || undefined
  }

  public static async insert(pet: Pet): Promise<number | undefined> {
    const [result] = await knex.insert(pet).returning('id')

    return result.id || undefined
  }

  public static async update(id: number, pet: Pet): Promise<number | undefined> {
    const result = await knex.update(pet).where('id', id)

    return result || undefined
  }

  public static async delete(id: number): Promise<number | undefined> {
    const result = await knex.delete().where('id', id)

    return result || undefined
  }
}
