import { describe, it, expect } from 'vitest'
import { RegisterUserCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists.error'

describe('Register Use Case', () => {

  it('should be able to register', async () => {
    const useRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUserCase(useRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johnsoares@example.com',
      password: '123456',
    })

    expect(user).toHaveProperty('id')
    expect(user.id).toEqual('user_1')

  })

  it('should hash user password upon registration', async () => {
    const useRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUserCase(useRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johnsoares@example.com',
      password: '123456',
    })

    const isPasswordCorrectHashed = await compare('123456', user.password_hash)

    expect(isPasswordCorrectHashed).toBe(true)
  })

  it('shoul not be able to register with email twice', async () => {
    const useRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUserCase(useRepository)

    const email = 'johnJoe@example.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email: email,
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        email,
        name: 'John Doe',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
