import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }
    this.users.push(user)

    return Promise.resolve(user)
  }

  findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)

    if (!user) {
      return Promise.resolve(null)
    }
    return Promise.resolve(user)
  }
  findById(userId: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === userId)

    if (!user) {
      return Promise.resolve(null)
    }
    return Promise.resolve(user)
  }
}
