import mongoose from 'mongoose'
import Season from '../schemas/seasons.js'
import populate from "../services/populate.js";

class seasonsModel {

    async getAll(filter = {}) {
        return await Season.find(filter)
            .select("-createdAt -updatedAt -__v")
            .populate(populate.season)
    }
    async getOne(id) {
        return await Season.findById(id)
            .select("-createdAt -updatedAt -__v")
            .populate(populate.season)
    }

    // podria filtrarse por query (opcional)
    async getByCompetition(id) {
        return await Season.find({ competition : id })
            .select("-createdAt -updatedAt -__v")
            .populate(populate.season)
    }

    async create(season) {
        return await Season.create(season)
    }

    async update(id, season) {
        // {new:true} retorna objeto actualizado
        return await Season.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, season, {new:true})
    }

    async delete(id) {
        return await Season.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) })
    }
}

export default new seasonsModel