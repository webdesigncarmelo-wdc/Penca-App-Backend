import fieldsModel from '../models/fields.js'

class fieldsController {
    contructor() {}

    async getAll(req, res) {
        try {
            const data = await fieldsModel.getAll({ status: req.query.status })
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async getOne(req, res) {
        try {
            const data = await fieldsModel.getOne(req.params.id)
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }
    
    async create(req, res) {
        try {
            const data = await fieldsModel.create(req.body)
            res.status(201).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async update(req, res) {
        try {
            const data = await fieldsModel.update(req.params.id, req.body)
            res.status(200).json(data)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }

    async delete(req, res) {
        try {
            const data = await fieldsModel.delete(req.params.id)
            res.status(206).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }
}

export default new fieldsController()