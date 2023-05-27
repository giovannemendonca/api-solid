import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetMetricsUseCase } from './get-user-metrics'

describe('Get metrics Use Case', () => {
  let useRepository: InMemoryCheckInsRepository
  let sut: GetMetricsUseCase

  beforeEach(async () => {
    useRepository = new InMemoryCheckInsRepository()
    sut = new GetMetricsUseCase(useRepository)
  })

  it('should be able to fecth check in count from metrics', async () => {

    await useRepository.create({
      user_id: 'user_id_01',
      gym_id: 'any_gym_id_02',
      validated_at: new Date(),
    })
    await useRepository.create({
      user_id: 'user_id_01',
      gym_id: 'any_gym_id_02',
      validated_at: new Date(),
    })

    const {checkInsCount} = await sut.execute({
      userId: 'user_id_01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
