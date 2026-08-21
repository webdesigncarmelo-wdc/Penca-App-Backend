import predictsModel from '../models/predicts.js'
import { canCreatePredict } from '../services/predictsService.js'

class predictsController {
    constructor() {}

    async getAll(req, res) {
        const filter = {};
        if (req.query.user) filter.user = req.query.user;
        if (req.query.match) filter.match = req.query.match;
        try {
            const data = await predictsModel.getAll(filter)
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async getOne(req, res) {
        try {
            const data = await predictsModel.getOne(req.params.id)
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async upsert(req, res) {
        try {

            const result = await canCreatePredict(req.body.match)

            if (!result.allowed) return res.status(400).json({ message: result.message })

            const data = await predictsModel.upsert(req.body)

            res.status(201).json(data)

        } catch (e) {
            console.error(e)
            res.status(500).send(e)
        }
    }

    async delete(req, res) {
        try {
            const data = await predictsModel.delete(req.params.id)
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }
}

export default new predictsController()