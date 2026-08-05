import mongoose from 'mongoose'
import Team from '../schemas/teams.js'

class teamsModel {

    async getAll(filter = {}) {
        return await Team.find(filter)
    }

    async getOne(id) {
                return await Team.findOne({ _id: new mongoose.Types.ObjectId(id) })
    }

    async create(team) {
        return await Team.create(team)
    }

    async update(id, team) {
        // {new:true} retorna objeto actualizado
        return await Team.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, team, {new:true})
    }

    async delete(id) {
        return await Team.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) })
    }
}

export default new teamsModel