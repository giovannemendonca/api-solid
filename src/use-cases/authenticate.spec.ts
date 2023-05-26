import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  let useRepository: InMemoryUsersRepository
  let sut: AuthenticateUseCase

  beforeEach(() => {
    useRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(useRepository)
  })

  it('should be able to authenticate', async () => {
    await useRepository.create({
      name: 'John John',
      email: 'Johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'Johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(
      async () =>
        await sut.execute({
          email: 'Johndoe@example.com',
          password: '123456',
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await useRepository.create({
      name: 'John John',
      email: 'Johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(
      async () =>
        await sut.execute({
          email: 'Johndoe@example.com',
          password: '222222',
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
