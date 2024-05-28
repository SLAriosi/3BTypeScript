import Router from 'express'
import knex from '../database/knex';
import AppError from '../utils/AppError';
import { compare } from 'bcryptjs';
import authConfig from '../configs/auth'
import { sign } from 'jsonwebtoken';

const router = Router();

router.post("/", async (req, res) => {

    const { email, senha } = req.body

    const usuario = await knex("usuarios").where({ email }).first()

    if (!usuario) {
        throw new AppError("Email e/ou senha incorreta")
    }

    const senhaIsIgual = await compare(senha, usuario.senha)

    if (!senhaIsIgual) {
        throw new AppError("Email e/ou senha incorretas")
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({ idUsuario: usuario.id }, secret, {
        expiresIn
    })

    res.json({ usuario, token })
})

export default router;
