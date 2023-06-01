import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app
    .post('/users', register)
    .post('/sessions', authenticate)

    /** Authenticated */
    .get('/me', { onRequest: [verifyJwt] }, profile)
}
