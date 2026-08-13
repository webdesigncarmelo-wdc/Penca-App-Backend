import competitionsModel from '../models/competitions.js'

class competitionsController {
    contructor() {}

    async getAll(req, res) {
        const filter = {};
        if (req.query.active !== undefined) {
            filter.active = req.query.active === "true";
        }
        try {
            const data = await competitionsModel.getAll(filter)
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async getOne(req, res) {
        try {
            const data = await competitionsModel.getOne(req.params.id)
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }
    
    async create(req, res) {
        try {
            const data = await competitionsModel.create(req.body)
            res.status(201).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async update(req, res) {
        try {
            const data = await competitionsModel.update(req.params.id, req.body)
            res.status(200).json(data)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }

    async delete(req, res) {
        try {
            const data = await competitionsModel.delete(req.params.id)
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }
}

export default new competitionsController()