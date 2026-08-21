import matchesModel from "../models/matches.js"

export function timeLimit(matchDate) {
    const limit = new Date(matchDate.getTime() - 60 * 60 * 1000)

    return new Date() < limit
}

export async function canCreatePredict(matchId) {

    const match = await matchesModel.getOne(matchId)

    if (!match) {
        return {
            allowed: false,
            message: "Match not found"
        }
    }

    if (!match.date) {
        return {
            allowed: false,
            message: "Match has no date"
        }
    }

    if (!timeLimit(match.date)) {
        return {
            allowed: false,
            message: "Prediction time limit exceeded"
        }
    }

    return {
        allowed: true,
        match
    }
}