import standingsService from "../services/standingsService.js";

class StandingsController {
    constructor() {}

    async getAll(req, res) {
        const filter = {};
        if (req.query.league) filter.league = req.query.league;
        if (req.query.tournament) filter.tournament = req.query.tournament;
        try {
            const data = await standingsService.getAll(filter);
            res.status(200).json(data);
        } catch (e) {
            res.status(500).send(e);
        }
    }
}

export default new StandingsController();