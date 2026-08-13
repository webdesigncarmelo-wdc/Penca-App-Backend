import championshipsModel from '../models/championships.js'

class championshipsController {
    constructor() {}

    async getAll(req, res) {
        try {
            const data = await championshipsModel.getAll()
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async getOne(req, res) {
        try {
            const data = await championshipsModel.getOne(req.params.id)
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async getTeams(req, res) {
        try {
            const data = await championshipsModel.getTeams(req.params.id)
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async getMatches(req, res) {
        const start = performance.now();

        const filter = {};
        if (req.query.status) filter.status = req.query.status;
        try {
            const data = await championshipsModel.getMatches(req.params.id, filter)
        
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }
    
    async create(req, res) {
        try {
            const data = await championshipsModel.create(req.body)
            res.status(201).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async update(req, res) {
        try {
            const data = await championshipsModel.update(req.params.id, req.body)
            res.status(200).json(data)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }

    async delete(req, res) {
        try {
            const data = await championshipsModel.delete(req.params.id)
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }
}

export default new championshipsController()