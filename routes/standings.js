import express from 'express'
import standingsController from '../controllers/standings.js'
import { verifyToken } from '../helpers/auth.js'

const route = express.Router()

route.get('/', standingsController.getAll)

export default route;