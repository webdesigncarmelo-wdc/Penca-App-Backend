import predictsModel from '../models/predicts.js'

class predictsController {
    constructor() {}

    async getAll(req, res) {
        const filter = {};
        /*if (req.query.active !== undefined) {
            filter.active = req.query.active === "true";
        }*/
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

    async getByUserAndMatch(req, res) {
        const filter = {};
        if (req.query.user) filter.user = req.query.user;
        if (req.query.match) filter.match = req.query.match;
        try {
            const data = await predictsModel.getOne({ user: filter.user, match: filter.umatch })
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }
    
    async create(req, res) {
        try {
            const data = await predictsModel.create(req.body)
            res.status(201).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async update(req, res) {
        try {
            const data = await predictsModel.update(req.params.id, req.body)
            res.status(200).json(data)
        } catch (e) {
            console.log(e)
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