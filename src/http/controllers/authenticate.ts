import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { MakeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const autheticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = autheticateBodySchema.parse(request.body)

  try {
    const registerUserCase = MakeAuthenticateUseCase()

    const { user } = await registerUserCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign({},{
      sign: {
        sub: user.id,
      }
    })

    return reply.status(201).send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }

}
