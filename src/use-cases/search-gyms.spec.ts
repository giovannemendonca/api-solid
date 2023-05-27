import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsCase } from './search-gyms'

describe('Search Gyms Use Case', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: SearchGymsCase

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: 'academia de JavaScript',
      phone: '999999999',
      latitude: 0,
      longitude: 0,
    })
    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: 'academia de JavaScript',
      phone: '999999999',
      latitude: 0,
      longitude: 0,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym',
      }),
    ])
  })

  it('should be able to search for gyms by page', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,  
        description: 'academia de JavaScript',
        phone: '999999999',
        latitude: 0,
        longitude: 0,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym 21',
      }),
      expect.objectContaining({
        title: 'JavaScript Gym 22',
      })
      
    ])
  })
})
