import {  Gym } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {

  public items: Gym[] = []

  findById(userId: string): Promise<Gym | null> {
    const user = this.items.find((items) => items.id === userId)

    if (!user) {
      return Promise.resolve(null)
    }
    return Promise.resolve(user)
  }
}
