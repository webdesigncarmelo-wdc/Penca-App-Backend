import express from 'express'
import seasonsController from '../controllers/seasons.js'
import { verifyToken } from '../helpers/auth.js'

const route = express.Router()

route.get('/', seasonsController.getAll)
route.get('/:id', seasonsController.getOne)
route.get('/competition/:id', seasonsController.getByCompetition)
route.post('/', verifyToken, seasonsController.create)
route.put('/:id', verifyToken, seasonsController.update)
route.delete('/:id', verifyToken, seasonsController.delete)

export default route;