import matchesModel from '../models/matches.js'
import { dateHelper } from '../helpers/dateHelper.js';
import { canCreateMatch, canUpdateMatch } from '../services/matchesService.js'

class matchesController {
    constructor() {}

    async getAll(req, res) {
        const filter = {};
        if (req.query.status) filter.status = req.query.status;
        try {
            const data = await matchesModel.getAll(filter)
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async getOne(req, res) {
        try {
            const data = await matchesModel.getOne(req.params.id)
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async getByMatchday(req, res) {
        try {
            const data = await matchesModel.getByMatchday(req.params.id)
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async getMatchesByTeam(req, res) {
        try {
            const data = await matchesModel.getAll(req.params.id)
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }
    
    async create(req, res) {
        try {
            // validacion de la fecha y hora
            if (req.body.date) req.body.date = dateHelper(req.body.date)
            
            // validacion de los datos
            const result = await canCreateMatch(req.body)
            if (!result.allowed) return res.status(400).json({ message: result.message })
            
            const data = await matchesModel.create(req.body)
            res.status(201).json(data)
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: e.message,
                error: e
            });
        }
    }

    async update(req, res) {
        try {
            // validacion de la fecha y hora
            if (req.body.date) req.body.date = dateHelper(req.body.date)

            // validacion de los datos
            const result = await canUpdateMatch(req.params.id, req.body)
            if (!result.allowed) return res.status(400).json({ message: result.message })
            
            const data = await matchesModel.update(req.params.id, req.body)
            res.status(200).json(data)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }

    async delete(req, res) {
        try {
            const data = await matchesModel.delete(req.params.id)
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }
}

export default new matchesController()
