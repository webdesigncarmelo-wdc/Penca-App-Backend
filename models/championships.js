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
        // recupero todos los matchdays de un campeonato
        const matchdays = await matchdaysModel.getAll({ championship: id });
        // extraigo los matchday._id
        const matchdayIds = matchdays.map(matchday => matchday._id);
        // recupero todos los partidos con ese matchday._id + filter
        const matches = await matchesModel.getAll({ matchday: { $in: matchdayIds } , ...filter });

        return matches;
    }

    /* para medir rendimiento
    
    async getMatches(id, filter) {
        console.log("react native")
        // medir Matchdays
        const startMatchdays = performance.now();

        const matchdays = await matchdaysModel.getAll({
            championship: id
        });

        const endMatchdays = performance.now();

        console.log(
            `Matchdays: ${(endMatchdays - startMatchdays).toFixed(2)} ms`
        );


        // extraigo los IDs
        const matchdayIds = matchdays.map(
            matchday => matchday._id
        );


        // medir Matches
        const startMatches = performance.now();

        const matches = await matchesModel.getAll({
            matchday: { $in: matchdayIds },
            ...filter
        });

        const endMatches = performance.now();

        console.log(
            `Matches: ${(endMatches - startMatches).toFixed(2)} ms`
        );


        return matches;
    }*/

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