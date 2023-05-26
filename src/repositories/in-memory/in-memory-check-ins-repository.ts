import { CheckIn, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { CheckInsRepository } from '../check-ins-repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {

    const checkIn: CheckIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      createdAt: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null
    }
    this.items.push(checkIn)

    return Promise.resolve(checkIn)
  }

  
}
