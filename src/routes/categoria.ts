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

    try {

        const objSalvar: IDadosCategoria = req.body;

        const categoria = await knex("categorias")
            .insert(objSalvar)

        res.json({ message: "Categoria Salva" })
    } catch (e: any) {
        console.log('e')
        // throw new AppError('teste')
        throw new Error('teste')
    }
})

export default router
