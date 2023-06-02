import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const registerRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(registerRepository)

  return authenticateUseCase
}