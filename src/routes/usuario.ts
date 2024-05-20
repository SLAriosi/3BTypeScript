import Router from 'express'
import knex from '../database/knex'

const router = Router()

router.get('/', async (req, res) => {
    const usuarios = await knex('usuarios')

    res.json({ usuarios })
})

router.post('/', async (req, res) => {
    const objSalvar = req.body

    const id_usuario = knex('usuarios')
        .insert(objSalvar)

    res.json({ message: "Usuario salvo com sucesso" })
})

export default router
