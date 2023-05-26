import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUserCase } from './create-gym'

describe('Register Gyms Use Case', () => {
  let gymRepository: InMemoryGymsRepository
  let sut: CreateGymUserCase

  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository
    sut = new CreateGymUserCase(gymRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: 'academia de JavaScript',
      phone: '999999999',
      latitude: 0,
      longitude: 0,
    })

    expect(gym).toHaveProperty('id')
    expect(gym.id).toEqual(expect.any(String)) 
  })

})
