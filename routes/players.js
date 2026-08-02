import express from 'express'
import teamsController from '../controllers/teams.js'
import { verifyToken } from '../helpers/auth.js'

const route = express.Router()

route.get('/', teamsController.getAll)
route.get('/:id', teamsController.getOne)
route.post('/', teamsController.create)
route.put('/:id', verifyToken, teamsController.update)
route.delete('/:id', verifyToken, teamsController.delete)

export default route;