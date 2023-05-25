import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resouce-not-found-error'

describe('Get profile User Case', () => {
  let useRepository: InMemoryUsersRepository
  let sut: GetUserProfileUseCase

  beforeEach(() => {
    useRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(useRepository)
  })

  it('should be able to get a user profile', async () => {
    const createdUser = await useRepository.create({
      name: 'John John',
      email: 'Johndoe@example.com',
      password_hash: '123456',
    })
    const {user} = await sut.execute({ userId: createdUser.id})

    expect(user.id).toEqual(createdUser.id)
  })

  it('should not be able to get a user profile with wrong id', async () => {
    await useRepository.create({
      name: 'John John',
      email: 'Johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        userId: 'wrong-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
