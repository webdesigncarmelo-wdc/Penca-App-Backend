import express from 'express'
import predictsController from '../controllers/predicts.js'
import { verifyToken } from '../helpers/auth.js'

const route = express.Router()

route.get('/', predictsController.getAll)
route.get('/:id', predictsController.getOne)
route.post('/', verifyToken, predictsController.create)
route.put('/:id', verifyToken, predictsController.update)
route.delete('/:id', verifyToken, predictsController.delete)

export default route;