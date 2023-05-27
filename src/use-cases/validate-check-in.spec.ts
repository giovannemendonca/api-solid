import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resouce-not-found-error'

describe('validate Check-in Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let sut: ValidateUseCase

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateUseCase(checkInsRepository)

    //  vi.useFakeTimers()
  })

  /*   afterEach(() => {
    vi.useRealTimers()
  }) */

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })
    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate a non-existing check-in', async () => {
    await expect(
      sut.execute({
        checkInId: 'non-existing-check-in-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
