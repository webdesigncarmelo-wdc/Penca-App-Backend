import usersModel from '../models/users.js'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { genToken } from '../helpers/auth.js';
import users from '../schemas/users.js';

class usersController {
    contructor() {}

    async getAll(req, res) {
        try {
            const data = await usersModel.getAll()
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async profile(req, res) {
        try {
            const data = await usersModel.getOne({email : req.emailOn})
            res.status(201).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async register(req, res) {
        try {
            const { email, name, phone, password } = req.body

            // verificamos email unico
            const userExists = await usersModel.getOne({ email });
            if (userExists) {
                return res.status(400).json({error: "email is already linked"})
            }

            // encripado del password
            const criptedPW = await bcrypt.hash(password, 10)

            console.log(criptedPW)
            // generar data
            const data = await usersModel.create({
                email,
                name,
                phone,
                password: criptedPW
            });
            console.log(data)

            res.status(201).json(data);

        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    }

    async login(req, res) {
        const { email, password } = req.body
        // verificamos email unico
        const userExists = await usersModel.getOne({ email });
        console.log(userExists)
        if (!userExists) {
            return res.status(400).json({error: "email not registered"})
        }

        // comparacion de password con la encriptacion de bcrypt
        const pwOK = await bcrypt.compare(password, userExists.password)
        console.log(pwOK)
        if (!pwOK) {
            return res.status(400).json({error: "password is not OK"})
        }

        // generar token
        const token = genToken(email)
        return res.status(200).json({msg: "connected user", token})
    }

}

export default new usersController()