import mongoose from 'mongoose'
import Matchday from '../schemas/matchdays.js'
import populate from "../services/populate.js";

class matchdaysModel {

    async getAll(filter = {}) {
        return await Matchday.find(filter)
        .select("-createdAt -updatedAt -__v")
        .populate(populate.matchday)
    }

    async getOne(id) {
        return await Matchday.findOne({ _id: new mongoose.Types.ObjectId(id) })
        .select("-createdAt -updatedAt -__v")
        .populate(populate.matchday)
}

    async create(matchday) {
        return await Matchday.create(matchday)
    }

    async update(id, matchday) {
        // {new:true} retorna objeto actualizado
        return await Matchday.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, matchday, {new:true})
    }

    async delete(id) {
        return await Matchday.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) })
    }
}

export default new matchdaysModel