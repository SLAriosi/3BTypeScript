import { Router } from 'express'

import usuarioRouter from './usuario'
import categoriaRouter from './categoria'
import sessionRouter from './session'
import autenticacao from '../middlewares/autenticacao'

const routes = Router()

routes.use('/usuarios', usuarioRouter)
routes.use('/categorias', autenticacao, categoriaRouter)
routes.use('/session', sessionRouter)

export default routes
