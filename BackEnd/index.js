const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Logging middleware to log each API call to api.log file
app.use((req, res, next) => {
  const now = new Date();
  const timeString = now.toTimeString().split(' ')[0]; // hh:mm:ss
  const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
  const logEntry = `date-{${timeString}} - ${clientIp} - ${req.method}\n`;
  const logFilePath = path.join(__dirname, 'api.log');
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });
  next();
});

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/incidents', (req, res) => {
  const filePath = path.join(__dirname, 'incident.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading incident.json:', err);
      return res.status(500).json({ error: 'Failed to read incidents data' });
    }
    try {
      const incidents = JSON.parse(data);
      res.json(incidents.records);
    } catch (parseErr) {
      console.error('Error parsing incident.json:', parseErr);
      res.status(500).json({ error: 'Failed to parse incidents data' });
    }
  });
});

module.exports = app;
