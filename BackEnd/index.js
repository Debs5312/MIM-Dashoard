const express = require('express');
const app = express();

const incidentRoutes = require('./routes/incidentRoutes');

const loggerMiddleware = require('./middleware/logger');
app.use(loggerMiddleware);

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/incident', incidentRoutes);

module.exports = app;
