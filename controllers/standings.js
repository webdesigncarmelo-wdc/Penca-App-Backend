import standingsService from "../services/standingsService.js";

class StandingsController {
    constructor() {}

    async getAll(req, res) {
        const filter = {};
        if (req.query.championship) filter.championship = req.query.championship;

        // debugs everywhere
        // if (req.query.status) filter.status = req.query.status;
        // console.log(filter.championship)
        // console.log(filter.status)
        try {
            const data = await standingsService.getAll(filter);
            res.status(200).json(data);
        } catch (e) {
            res.status(500).send(e);
        }
    }
}

export default new StandingsController();