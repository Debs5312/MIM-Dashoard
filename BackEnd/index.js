const express = require('express');
const app = express();

const {
  getAllIncidents,
  getIncidentsByPriority,
  getIncidentsListByPriority,
} = require('./controllers/incidentController');

const loggerMiddleware = require('./middleware/logger');
app.use(loggerMiddleware);

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/incidents', getAllIncidents);

app.get('/incident/p1', getIncidentsByPriority('1'));

app.get('/incident/p2', getIncidentsByPriority('2'));

app.get('/incident/p2/list', getIncidentsListByPriority('2'));

app.get('/incident/p1/list', getIncidentsListByPriority('1'));

module.exports = app;
