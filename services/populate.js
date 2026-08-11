const populateService = {
    predict: {
        path: "match",
        populate: [
            {
                path: "homeTeam",
                select: "name shortName image"
            },
            {
                path: "awayTeam",
                select: "name shortName image"
            },
            {
                path: "matchday",
                select: "number"
            }
        ]
    },

    match: [
        {
            path: "matchday",
            select: "number"
        },
        {
            path: "homeTeam",
            select: "shortName name image active"
        },
        {
            path: "awayTeam",
            select: "shortName name image active"
        }
    ],

    user: [
        {
            path: "user",
            select: "username",
        }
    ],

    team: [],

    matchday: [],
};

export default populateService;