import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'
import { randomUUID } from 'crypto'

export class InMemoryGymsRepository implements GymsRepository {

  public items: Gym[] = []

  create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym: Gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }
    this.items.push(gym)

    return Promise.resolve(gym)
  }

  findById(userId: string): Promise<Gym | null> {
    const user = this.items.find((items) => items.id === userId)

    if (!user) {
      return Promise.resolve(null)
    }
    return Promise.resolve(user)
  }
  async searchMany(query: string, page: number): Promise<Gym[]> {

    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)  
  }
}
