import express,
{
    Request,
    Response,
    NextFunction
} from 'express'
import 'express-async-errors'

import cors from 'cors'

import routes from './routes'

import AppError from './utils/AppError'

const app = express()

app.use(cors())

app.use(express.json())

app.use(routes)

app.use((
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    console.log('aquii')

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: "Error",
            message: error.mensagem
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Deu ruim'
    })
})

const PORT = 3001

app.listen(PORT, () => {
    console.log('Iniciado projeto na porta ' +
        PORT
    )
})
