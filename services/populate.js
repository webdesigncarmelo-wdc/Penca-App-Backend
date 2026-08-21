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

    matchday: [
        {
            path: "championship",
            select: "name"
        },
    ],

    fullMatchday: [
        {
            path: "championship",
            select: "name season",
            populate: {
                path: "season",
                select: "name competition",
                populate: {
                    path: "competition",
                    select: "name"
                }
            }
        }
    ],

    season:[
        {
            path: "competition",
            select: "name"
        },
    ],
};

export default populateService;