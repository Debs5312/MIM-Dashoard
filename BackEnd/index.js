const express = require('express');
const app = express();

const incidentRoutes = require('./routes/incidentRoutes');

const loggerMiddleware = require('./middleware/logger');
const cqrsMiddleware = require('./middleware/cqrsMiddleware');
const corsMiddleware = require('./middleware/corsMiddleware');

app.use(loggerMiddleware);
app.use(cqrsMiddleware);
app.use(corsMiddleware);

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/incident', incidentRoutes);

module.exports = app;

