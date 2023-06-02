import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUserCase } from '../create-gym'

export function makeCreateGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUserCase(gymsRepository)

  return useCase
}