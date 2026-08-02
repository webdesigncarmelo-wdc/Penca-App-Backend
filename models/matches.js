import mongoose from 'mongoose'
import Match from '../schemas/matches.js'

class matchesModel {

    async getAll(filter = {}) {
        return await Match.find(filter)
            .populate("homeTeam")
            .populate("awayTeam");
    }

    async getOne(id) {
        return await Match.findById(id)
            .populate("homeTeam")
            .populate("awayTeam");
    }

    async getByMatchday(id) {
        return await Match.find({ matchday : id })
            .populate("homeTeam")
            .populate("awayTeam");
    }

    async getByTeam(id) {
        return await Match.find({ $or: [
            { homeTeam: id },
            { awayTeam: id }]})
            .populate("homeTeam")
            .populate("awayTeam");
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