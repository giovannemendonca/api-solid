import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserCase } from '../register'

export function makeRegisterUseCase() {
  const userRepositoy = new PrismaUsersRepository()
  const authenticateUsecase = new RegisterUserCase(userRepositoy)

  return authenticateUsecase
}