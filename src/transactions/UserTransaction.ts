import { TableNames } from '../database/TableNames'
import { Knex } from '../database/knex'
import { User } from '../models'

const table = TableNames.users

export default class UserTransaction {
  public static async getAll(): Promise<User[]> {
    return Knex(table).select('*')
  }

  public static async getById(id: number): Promise<User | undefined> {
    const [result] = await Knex(table).select('*').where('id', id)

    return result || undefined
  }

  public static async getByLogin(email: string, password: string): Promise<User | undefined> {
    const [result] = await Knex(table).select('*').where('email', email).andWhere('password', password).limit(1)

    return result || undefined
  }

  public static async insert(user: User): Promise<number | undefined> {
    const [result] = await Knex(table).insert(user).returning('id')

    return result.id || undefined
  }

  public static async update(id: number, user: User): Promise<number | undefined> {
    const result = await Knex(table).update(user).where('id', id)

    return result || undefined
  }

  public static async changePassword(id: number, newPassword: string): Promise<number | undefined> {
    const result = await Knex(table).where('id', id).update({ password: newPassword })

    return result || undefined
  }

  public static async delete(id: number): Promise<number | undefined> {
    const result = await Knex(table).delete().where('id', id)

    return result || undefined
  }
}
