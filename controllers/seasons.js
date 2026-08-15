import seasonsModel from '../models/seasons.js'
import competitionsModel from "../models/competitions.js";

class seasonsController {
    constructor() {}

    async getAll(req, res) {
        const filter = {};
        if (req.query.status) filter.status = req.query.status;
        if (req.query.competition) filter.competition = req.query.competition;
        try {
            const data = await seasonsModel.getAll(filter)
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async getOne(req, res) {
        try {
            const data = await seasonsModel.getOne(req.params.id)
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async getByCompetition(req, res) {
        try {
            const data = await seasonsModel.getByCompetition(req.params.id)
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }
    
    async create(req, res) {
        try {
            
            //validacion de competition
            const competition = await competitionsModel.getOne(req.body.competition)
            if (!competition) { return res.status(400).json({message: "Competition not found"});}

            const data = await seasonsModel.create(req.body)
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
            const data = await seasonsModel.update(req.params.id, req.body)
            res.status(200).json(data)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }

    async delete(req, res) {
        try {
            const data = await seasonsModel.delete(req.params.id)
            res.status(200).json(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }
}

export default new seasonsController()
