import express from 'express'
import matchesController from '../controllers/matches.js'
import { verifyToken } from '../helpers/auth.js'

const route = express.Router()

route.get('/', matchesController.getAll)
route.get('/:id', matchesController.getOne)
route.get('/matchday/:id', matchesController.getByMatchday)
route.post('/', verifyToken, matchesController.create)
route.put('/:id', verifyToken, matchesController.update)
route.delete('/:id', verifyToken, matchesController.delete)

export default route;