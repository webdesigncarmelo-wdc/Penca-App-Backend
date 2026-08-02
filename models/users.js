import mongoose from 'mongoose'
import User from '../schemas/users.js'

class usersModel {

    async getAll() {
        return await User.find()
    }

    async create(user) {
        return await User.create(user)
    }

    async getOne(filter) {
        return await User.findOne(filter)
    }

}

export default new usersModel