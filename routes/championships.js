import express from 'express'
import championshipsController from '../controllers/championships.js'
import { verifyToken } from '../helpers/auth.js'

const route = express.Router()

route.get('/', championshipsController.getAll)
route.get('/season/:id', championshipsController.getBySeason)
route.get('/:id/teams', championshipsController.getTeams)
route.get('/:id/matches', championshipsController.getMatches)
route.get('/:id/matchdays', championshipsController.getMatchdays)
route.get('/:id', championshipsController.getOne)
route.post('/', verifyToken, championshipsController.create)
route.put('/:id', verifyToken, championshipsController.update)
route.delete('/:id', verifyToken, championshipsController.delete)

export default route;