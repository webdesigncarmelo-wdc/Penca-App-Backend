import mongoose from 'mongoose'
import Championship from '../schemas/championships.js'
import matchdaysModel from './matchdays.js'
import matchesModel from './matches.js'

class championshipsModel {

    async getAll(filter = {}) {
        return await Championship.find(filter)
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
        const matchdays = await matchdaysModel.getAll({ championship: id });

        const matches = [];

        for (const matchday of matchdays) {
            const dayMatches = await matchesModel.getAll({ matchday: matchday._id, ...filter });

             matches.push(...dayMatches);
             }

        return matches;
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