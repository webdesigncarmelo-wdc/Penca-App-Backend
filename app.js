import 'dotenv/config'
import express, { Router } from 'express';
import dbClient from './config/db.client.js';
import matchdaysRoute from './routes/matchdays.js'
import matchesRoute from './routes/matches.js'
import usersRoute from './routes/users.js'
import fieldsRoute from './routes/fields.js'
import teamsRoute from './routes/teams.js'
import standingsRoute from './routes/standings.js'
import cors from 'cors'

const app = express();

//cors para el frontend
app.use(cors({ origin: 'http://localhost:8081' }));

// uso del json para la app
app.use(express.json());

// añadido de rutas
app.use('/users', usersRoute);
app.use('/fields', fieldsRoute);
app.use('/teams', teamsRoute);
app.use('/matches', matchesRoute);
app.use('/matchdays', matchdaysRoute);
app.use('/standings', standingsRoute);

try {
    const PORT = process.env.PORT || 5100;
    app.listen(PORT, () => 
        console.log('Server ON: '+PORT))
} catch (e) {
    console.log(e)
}

process.on('SIGINT', async() => {
    dbClient.disconnectDB(),
    process.exit(0);
})