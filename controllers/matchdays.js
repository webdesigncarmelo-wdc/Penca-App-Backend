import matchdaysModel from '../models/matchdays.js'
import matchesModel from '../models/matches.js'

class matchdaysController {
    contructor() {}

    async getAll(req, res) {
        try {
            const data = await matchdaysModel.getAll()
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async getOne(req, res) {
        try {
            const data = await matchdaysModel.getOne(req.params.id)
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async getMatches(req, res) {
        try {
            const data = await matchesModel.getByMatchday(req.params.id)
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }
    
    async create(req, res) {
        try {
            const data = await matchdaysModel.create(req.body)
            res.status(201).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async update(req, res) {
        try {
            const data = await matchdaysModel.update(req.params.id, req.body)
            res.status(200).json(data)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }

    async delete(req, res) {
        try {
            const data = await matchdaysModel.delete(req.params.id)
            res.status(206).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }
}

export default new matchdaysController()