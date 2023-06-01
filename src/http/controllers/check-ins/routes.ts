import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { validate } from './validate'
import { history } from './history'
import { metrics } from './metrics'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  app
    .get('/check-ins/history', history)
    .get('/check-ins/metrics', metrics)

    .post('/gyms/:gymId/check-ins', create)
    .patch('/check-ins/:checkInId/validate', validate)
}