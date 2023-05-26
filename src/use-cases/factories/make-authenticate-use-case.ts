import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function MakeAuthenticateUseCase() {
  const registerRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(registerRepository)

  return authenticateUseCase
}