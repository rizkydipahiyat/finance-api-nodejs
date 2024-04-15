import express, { Request, Response } from 'express'
import { UserController } from '../controller/user-controller'

export const publicRouter = express.Router()

publicRouter.get('/', (req: Request, res: Response) => {
  res.send({
    msg: 'API is running'
  })
})
publicRouter.post('/api/users', UserController.register)
publicRouter.post('/api/users/login', UserController.login)