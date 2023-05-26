import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterUserCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists.error'

describe('Register Use Case', () => {
  let useRepository: InMemoryUsersRepository
  let sut: RegisterUserCase

  beforeEach(() => {
    useRepository = new InMemoryUsersRepository()
    sut = new RegisterUserCase(useRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johnsoares@example.com',
      password: '123456',
    })

    expect(user).toHaveProperty('id')
    expect(user.id).toEqual(expect.any(String))
  
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johnsoares@example.com',
      password: '123456',
    })

    const isPasswordCorrectHashed = await compare('123456', user.password_hash)

    expect(isPasswordCorrectHashed).toBe(true)
  })

  it('shoul not be able to register with email twice', async () => {
    const email = 'johnJoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email: email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        email,
        name: 'John Doe',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
