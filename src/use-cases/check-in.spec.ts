import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

describe('Check-in Use Case', () => {
  let useRepository: InMemoryCheckInsRepository
  let sut: CheckInUseCase

  beforeEach(() => {
    useRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(useRepository)
  })

  it('should be able check in', async () => {
    const {checkIn } = await sut.execute({
      gymId: 'gymId01',
      userId: 'userId01'
    })  
    expect(checkIn.id).toEqual(expect.any(String))
  })

  
})
