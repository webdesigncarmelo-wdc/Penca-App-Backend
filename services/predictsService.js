import matchesModel from "../models/matches.js"
import usersModel from "../models/users.js"
import mongoose from "mongoose";

export function timeLimit(matchDate) {
    const limit = new Date(matchDate.getTime() - 60 * 60 * 1000)

    return new Date() < limit
}

export async function canPredict(data) {

    // valido scores
    if (typeof data.homeGoals !== "number" || typeof data.awayGoals !== "number") {
        return { allowed: false, message: "Score should be an number" }}

    // valudo user
    if (!mongoose.Types.ObjectId.isValid(data.user)) return { allowed: false, message: "Invalid user ID" }
    const user = await usersModel.getOne( data.user )
    if (!user) return { allowed: false, message: "User not found" }

    // valido match
    if (!mongoose.Types.ObjectId.isValid(data.match)) return { allowed: false, message: "Invalid match ID" }
    const match = await matchesModel.getOne(data.match)
    if (!match) return { allowed: false, message: "Match not found" }
    // el formato de partidos viejos no tenia date
    if (!match.date) return { allowed: false, message: "Match has no date" }
    // valido tiempo limite de predict 
    if (!timeLimit(match.date)) return { allowed: false, message: "Prediction time limit exceeded" }


    return { allowed: true, match }
}