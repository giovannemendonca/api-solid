import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { MakeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const autheticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = autheticateBodySchema.parse(request.body)

  try {
    const registerUserCase = MakeAuthenticateUseCase()

    await registerUserCase.execute({
      email,
      password,
    })
  } catch (error) {
    if(error instanceof InvalidCredentialsError){
      return reply.status(400).send({message: error.message})
    }
    throw error
  }

  return reply.status(201).send()
}
