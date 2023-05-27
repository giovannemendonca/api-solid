import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGyms } from './fetch-nearby-gyms'

describe('Fetch nearby Gyms Use Case', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: FetchNearbyGyms

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGyms(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'academia de JavaScript',
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })
    await gymsRepository.create({
      title: 'Far Gym',
      description: 'academia do TypeScript',
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym',
      }),
    ])
  })
})
