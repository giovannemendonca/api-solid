import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function gymsRoutes(app: FastifyInstance) {
  app
    .addHook('onRequest', verifyJwt)
    
    .post('/gyms',{onRequest: [verifyUserRole('ADMIN')]} , create)

    .get('/gyms/search', search)
    .get('/gyms/nearby', nearby)
}
