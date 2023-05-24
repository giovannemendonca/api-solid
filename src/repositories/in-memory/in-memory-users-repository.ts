import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: 'user_1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(), 
    }
    this.users.push(user)
  
    return Promise.resolve(user)
  }
  
  findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email)

    if (!user) {
      return Promise.resolve(null)
    }
    return Promise.resolve(user)
  }

}