import Router from 'express'
import knex from '../database/knex'
import AppError from '../utils/AppError'
import { hash } from 'bcrypt'
import { z } from 'zod'

const router = Router()

router.get('/', async (req, res) => {
    const usuarios = await knex('usuarios')

    res.json({ usuarios })
})

router.post('/', async (req, res) => {

    const registerBodySchema = z.object({
        nome: z.string(),
        email: z.string().email(),
        senha: z.string().min(6),
    })

    const objSalvar = registerBodySchema.parse(req.body)

    if (!objSalvar?.senha) {
        throw new AppError('Senha é obrigatória!!')
    }

    objSalvar.senha = await hash(objSalvar.senha, 8)

    const id_usuario = await knex('usuarios')
        .insert(objSalvar)

    res.json({ message: "Usuario salvo com sucesso!!" })
})

router.put('/:id', async (req, res) => {
    const objSalvar = req.body
    const { id } = req.params

    if (objSalvar?.senha) {
        objSalvar.senha = await hash(objSalvar.senha, 8)
    }

    let usuario = await knex('usuarios').where({ id }).first()

    if (!usuario?.id) {
        throw new AppError('Usuário não encontrado')
    }

    let newUsuario = {
        ... usuario,
        ... objSalvar,
    }

    await knex('usuarios').update(newUsuario)
        .where({ id: usuario.id })

    return res.json({
        message: "Editado usuário com sucesso!!",
        usuario: usuario
    })
})

router.delete('/:id', async(req, res) => {
    const {id} = req.params

    let usuario = await knex('usuarios').where({ id }).first()

    if (!usuario?.id) {
        throw new AppError('Usuário não encontrado')
    }

    await knex('usuarios').where({id}).delete()

    return res.json({ message: "Usuário deeletado com sucesso"})

})

export default router
