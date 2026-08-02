import express from 'express'
import fieldsController from '../controllers/fields.js'
import { verifyToken } from '../helpers/auth.js'

const route = express.Router()

route.get('/', fieldsController.getAll)
route.get('/:id', fieldsController.getOne)
route.post('/', fieldsController.create)
route.put('/:id', verifyToken, fieldsController.update)
route.delete('/:id', verifyToken, fieldsController.delete)

export default route;