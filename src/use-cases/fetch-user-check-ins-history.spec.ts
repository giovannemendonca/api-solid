import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckHistoryUseCase } from './fetch-user-check-ins-history'

describe('Check-in Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let sut: FetchUserCheckHistoryUseCase

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckHistoryUseCase(checkInsRepository)
  })

  it('should be able to fecth check in history', async () => {
    await checkInsRepository.create({
      user_id: 'user_id_01',
      gym_id: 'any_gym_id_02',
      validated_at: new Date(),
    })
    await checkInsRepository.create({
      user_id: 'user_id_01',
      gym_id: 'any_gym_id_02',
      validated_at: new Date(),
    })

    const { checkIns } = await sut.execute({
      userId: 'user_id_01',
      page: 1,
    })

    expect(checkIns.length).toBe(2)
    expect(checkIns[0].user_id).toBe('user_id_01')
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'any_gym_id_02',
      }),
      expect.objectContaining({
        gym_id: 'any_gym_id_02',
      }),
    ])
  })

  it('should be able to fecth paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        user_id: 'user_id_01',
        gym_id: `any_gym_id_${i}`,
        validated_at: new Date(),
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user_id_01',
      page: 2,
    })

    expect(checkIns.length).toBe(2)

    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'any_gym_id_21',
      }),
      expect.objectContaining({
        gym_id: 'any_gym_id_22',
      })
    ])

  })
})
