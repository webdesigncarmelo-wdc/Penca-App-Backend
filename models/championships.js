import mongoose from 'mongoose'
import Championship from '../schemas/championships.js'
import matchdaysModel from './matchdays.js'
import matchesModel from './matches.js'

class championshipsModel {

    async getAll(filter = {}) {
        return await Championship.find(filter)
        .select("-createdAt -updatedAt -__v")
    }
    
    // podria filtrarse por query (opcional)
    async getBySeason(id) {
        return await Championship.find({ season : id })
        .select("-createdAt -updatedAt -__v")
    }

    async getOne(id) {
        return await Championship.findOne({ _id: new mongoose.Types.ObjectId(id) })
        .select("-createdAt -updatedAt -__v")
    }

    async getTeams(id) {
        return await Championship.findById(id)
            .populate("teams", "name image")
            .select("teams")
    }

    async getMatches(id, filter) {
        // recupero todos los matchdays de un campeonato
        const matchdays = await matchdaysModel.getAll({ championship: id });
        // extraigo los matchday._id
        const matchdayIds = matchdays.map(matchday => matchday._id);
        // recupero todos los partidos con ese matchday._id + filter
        const matches = await matchesModel.getAll({ matchday: { $in: matchdayIds } , ...filter });

        return matches;
    }

    async getMatchdays(id) {
        // devuelvo todos los matchdays de un campeonato
        return await matchdaysModel.getAll2({ championship: id })
    }

    async create(championship) {
        return await Championship.create(championship)
    }

    async update(id, championship) {
        // {new:true} retorna objeto actualizado
        return await Championship.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, championship, {new:true})
    }

    async delete(id) {
        return await Championship.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) })
    }
}

export default new championshipsModel