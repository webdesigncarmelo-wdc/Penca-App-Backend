import teamsModel from "../models/teams.js";
import matchesModel from "../models/matches.js";

class StandingsService {
    async getAll(filter) {

        // recupero los equipos activos
        const teams = await teamsModel.getAll({ active: true });

        // construyo la tabla para los equipos activos
        const standings = teams.map(team => ({
            team,
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            goalDifference: 0,
            points: 0,
        }));

        // recupero todos los partidos jugados
        const matches = await matchesModel.getAll({ status: "played" });

        // cada partido agrega valor a la tabla
        matches.forEach(match => {

            // referencio cada team en standings para poder modificarlos
            const homeTeamStanding = standings.find(s => s.team._id.toString() === match.homeTeam._id.toString());
            const awayTeamStanding = standings.find(s => s.team._id.toString() === match.awayTeam._id.toString());

            // partidos jugaods
            homeTeamStanding.played += 1
            awayTeamStanding.played += 1
            // goles hechos
            homeTeamStanding.goalsFor += match.homeGoals
            awayTeamStanding.goalsFor += match.awayGoals
            // goles recibidos
            homeTeamStanding.goalsAgainst += match.awayGoals
            awayTeamStanding.goalsAgainst += match.homeGoals
            // diferencia de goles
            homeTeamStanding.goalDifference += (match.homeGoals - match.awayGoals)
            awayTeamStanding.goalDifference += (match.awayGoals - match.homeGoals)

            if (match.homeGoals > match.awayGoals) {
                // gana el local
                homeTeamStanding.won += 1
                awayTeamStanding.lost += 1
                // puntos
                homeTeamStanding.points += 3
            } else if (match.homeGoals === match.awayGoals) {
                // empate
                homeTeamStanding.drawn += 1
                awayTeamStanding.drawn += 1
                // puntos
                homeTeamStanding.points += 1
                awayTeamStanding.points += 1
            } else {
                // gana el visitante
                homeTeamStanding.lost += 1
                awayTeamStanding.won += 1
                // puntos
                awayTeamStanding.points += 3
            }

        });

    return [...standings].sort((a, b) => {

        if (b.points !== a.points) {
            return b.points - a.points;
        }

        if (b.goalDifference !== a.goalDifference) {
            return b.goalDifference - a.goalDifference;
        }

        return b.goalsFor - a.goalsFor;

    });

    }
}

export default new StandingsService();