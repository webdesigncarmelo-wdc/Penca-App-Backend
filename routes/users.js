import express from "express"
import usersController from '../controllers/users.js'
import { verifyToken } from "../helpers/auth.js"

const route = express.Router()

route.post('/register', usersController.register)
route.post('/login', usersController.login)
route.get('/', usersController.getAll)
route.get('/profile', verifyToken, usersController.profile)

export default route;