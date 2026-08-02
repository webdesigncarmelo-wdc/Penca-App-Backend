import teamsModel from '../models/teams.js'
import matchesModel from '../models/matches.js'

class teamsController {
    contructor() {}

    async getAll(req, res) {
        try {
            const data = await teamsModel.getAll()
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async getOne(req, res) {
        try {
            const data = await teamsModel.getOne(req.params.id)
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async getMatches(req, res) {
        try {
            const data = await matchesModel.getByTeam(req.params.id)
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }
    
    async create(req, res) {
        try {
            const data = await teamsModel.create(req.body)
            res.status(201).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async update(req, res) {
        try {
            const data = await teamsModel.update(req.params.id, req.body)
            res.status(200).json(data)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }

    async delete(req, res) {
        try {
            const data = await teamsModel.delete(req.params.id)
            res.status(206).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }
}

export default new teamsController()