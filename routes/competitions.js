import express from 'express'
import competitionsController from '../controllers/competitions.js'
import { verifyToken } from '../helpers/auth.js'

const route = express.Router()

route.get('/', competitionsController.getAll)
route.get('/:id', competitionsController.getOne)
route.post('/', verifyToken, competitionsController.create)
route.put('/:id', verifyToken, competitionsController.update)
route.delete('/:id', verifyToken, competitionsController.delete)

export default route;