import express from 'express'
import matchdaysController from '../controllers/matchdays.js'
import { verifyToken } from '../helpers/auth.js'

const route = express.Router()

route.get('/', matchdaysController.getAll)
route.get('/:id', matchdaysController.getOne)
route.get('/:id/matches', matchdaysController.getMatches)
route.post('/', verifyToken, matchdaysController.create)
route.put('/:id', verifyToken, matchdaysController.update)
route.delete('/:id', verifyToken, matchdaysController.delete)

export default route;