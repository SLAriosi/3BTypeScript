import Router from 'express'
import knex from '../database/knex'
import AppError from '../utils/AppError'

const router = Router()

router.get('/', (req, res) => {
    knex("categorias").then((categorias) => {

        res.json({ categorias })
    })
})

interface IDadosCategoria {
    nome: string
}

router.post('/', async (req, res) => {

    const objSalvar: IDadosCategoria = req.body;

    if (!objSalvar?.nome) {
        throw new AppError('Nome é obrigatório!')
    }

    const categoria = await knex("categorias")
        .insert(objSalvar)

    res.json({ message: "Categoria Salva" })
})

export default router
