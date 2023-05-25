import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserCase } from '../register'

export function makeRegisterUseCase() {
  const registerRepository = new PrismaUsersRepository()
  const authenticateUsecase = new RegisterUserCase(registerRepository)

  return authenticateUsecase
}