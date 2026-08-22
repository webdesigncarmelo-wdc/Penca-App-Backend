import mongoose from 'mongoose'
import User from '../schemas/users.js'

class usersModel {

    async getAll() {
        return await User.find()
    }

    async getOne(id) {
        return await User.findById(id)
    }
    
    async create(user) {
        return await User.create(user)
    }

}

export default new usersModel