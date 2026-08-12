import mongoose from 'mongoose'
import Competition from '../schemas/competitions.js'

class competitionsModel {

    async getAll(filter = {}) {
        return await Competition.find(filter)
        .select("-createdAt -updatedAt -__v")
    }

    async getOne(id) {
        return await Competition.findOne({ _id: new mongoose.Types.ObjectId(id) })
        .select("-createdAt -updatedAt -__v")
    }

    async create(competition) {
        return await Competition.create(competition)
    }

    async update(id, competition) {
        // {new:true} retorna objeto actualizado
        return await Competition.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, competition, {new:true})
        .select("-createdAt -updatedAt -__v")
    }

    async delete(id) {
        return await Competition.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) })
    }
}

export default new competitionsModel