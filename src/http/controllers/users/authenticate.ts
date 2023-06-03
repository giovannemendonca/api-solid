import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
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
    const registerUserCase = makeAuthenticateUseCase()

    const { user } = await registerUserCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      }
    )
    const refreshToken = await reply.jwtSign(
      {
        role: user.role,

      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      }
    )

    return reply
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: true,
      })
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }
}
