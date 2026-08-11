import mongoose from 'mongoose'
import Match from '../schemas/matches.js'
import populate from "../services/populate.js";

class matchesModel {

    async getAll(filter = {}) {
        return await Match.find(filter)
            .select("-createdAt -updatedAt -__v")
            .populate(populate.match)
    }

    async getOne(id) {
        return await Match.findById(id)
            .select("-createdAt -updatedAt -__v")
            .populate(populate.match)
    }

    async getByMatchday(id) {
        return await Match.find({ matchday : id })
            .select("-createdAt -updatedAt -__v")
            .populate(populate.match)
    }

    async getByTeam(id) {
        return await Match.find({ $or: [
            { homeTeam: id },
            { awayTeam: id }]})
            .select("-createdAt -updatedAt -__v")
            .populate(populate.match)
    }

    async create(match) {
        return await Match.create(match)
    }

    async update(id, match) {
        // {new:true} retorna objeto actualizado
        return await Match.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, match, {new:true})
    }

    async delete(id) {
        return await Match.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) })
    }
}

export default new matchesModel