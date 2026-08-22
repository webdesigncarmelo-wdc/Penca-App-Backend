import matchesModel from "../models/matches.js"
import matchdaysModel from "../models/matchdays.js";
import championshipsModel from "../models/championships.js"

export async function canCreateMatch(data) {
    // valido matchday
    const matchday = await matchdaysModel.getOne(data.matchday)
    if (!matchday) return { allowed: false, message: "Matchday not found" }
    // valido championship y recupero su lista de equipos
    const championship = await championshipsModel.getOne(matchday.championship)
    if (!championship) return { allowed: false, message: "Championship not found" }
    // estan incluidos Hometeam y Awayteam en championship.teams
    if (!championship.teams.includes(data.homeTeam)) {
        return { allowed: false, message: "Hometeam does not belong to championship" }}
    if (!championship.teams.includes(data.awayTeam)) {
        return { allowed: false, message: "Awayteam does not belong to championship" }}
    
    return { allowed: true }
}

export async function canUpdateMatch(matchId, data) {

    // valido q matchId sea valido
    const match = await matchesModel.getOne(matchId);
    if (!match) return { allowed: false, message: "Match not found" }

    // recupero el objeto matchday, desde data si existe o desde matchday sino
    const matchday = await matchdaysModel.getOne(data.matchday || match.matchday)
    if (!matchday) { return { allowed: false, message: "Matchday not found" }}

    // valido championship y recupero su lista de equipos
    const championship = await championshipsModel.getOne(matchday.championship)
    if (!championship) return { allowed: false, message: "Championship not found" }

    // estan incluidos Hometeam y Awayteam en championship.teams
    if (!championship.teams.includes(data.homeTeam || match.homeTeam._id)) {
        return { allowed: false, message: "Hometeam does not belong to championship" }}
    if (!championship.teams.includes(data.awayTeam || match.awayTeam._id)) {
        return { allowed: false, message: "Awayteam does not belong to championship" }}

    return { allowed: true }
}