import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app
    .post('/users', register)
    .post('/sessions', authenticate)

    .patch('/token/refresh', refresh)

    /** Authenticated */
    .get('/me', { onRequest: [verifyJwt] }, profile)
}
