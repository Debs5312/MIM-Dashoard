const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Logging middleware to log each API call to api.log file
app.use((req, res, next) => {
  const now = new Date();
  const timeString = now.toTimeString().split(' ')[0]; // hh:mm:ss
  const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
  const logEntry = `date-{${timeString}} - ${clientIp} - ${req.method} - ${req.originalUrl}\n`;
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

const readIncidents = (callback) => {
  const filePath = path.join(__dirname, 'incident.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading incident.json:', err);
      return callback(err);
    }
    try {
      const incidents = JSON.parse(data);
      callback(null, incidents.records);
    } catch (parseErr) {
      console.error('Error parsing incident.json:', parseErr);
      callback(parseErr);
    }
  });
};

app.get('/incidents', (req, res) => {
  readIncidents((err, records) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read or parse incidents data' });
    }
    res.json(records);
  });
});

app.get('/incident/p1', (req, res) => {
  readIncidents((err, records) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read or parse incidents data' });
    }
    const p1Incidents = records.filter(incident => incident.priority === '1');
    res.json(p1Incidents);
  });
});

app.get('/incident/p2', (req, res) => {
  readIncidents((err, records) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read or parse incidents data' });
    }
    const p2Incidents = records.filter(incident => incident.priority === '2');
    res.json(p2Incidents);
  });
});

app.get('/incident/p2/list', (req, res) => {
  readIncidents((err, records) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read or parse incidents data' });
    }
    const p2IncidentsList = records
      .filter(incident => incident.priority === '2')
      .map(incident => ({
        'incident_no': incident.number,
        'description': incident.description,
        'created_on': incident.sys_created_on,
        'created_by': incident.sys_created_by
      }));
    res.json(p2IncidentsList);
  });
});

module.exports = app;
