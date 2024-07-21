import { Pet, User } from 'src/models'

declare module 'knex/types/tables' {
  interface Tables {
    users: User
    pets: Pet
  }
}
