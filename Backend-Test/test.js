const request = require('supertest');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = require('../BackEnd/index.js'); // Import the express app

describe('Express.js API Tests', () => {
  describe('GET /', () => {
    it('should respond with hello world', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .expect('hello world', done);
    });
  });

  describe('GET /incidents', () => {
    const incidentFilePath = path.join(__dirname, '../BackEnd/incident.json');
    const backupFilePath = path.join(__dirname, '../BackEnd/incident_backup.json');

    before(() => {
      // Backup the incident.json file if it exists
      if (fs.existsSync(incidentFilePath)) {
        fs.renameSync(incidentFilePath, backupFilePath);
      }
    });

    after(() => {
      // Restore the incident.json file after tests
      if (fs.existsSync(backupFilePath)) {
        fs.renameSync(backupFilePath, incidentFilePath);
      }
    });

    it('should respond with incidents records array when incident.json is valid', (done) => {
      const sampleData = {
        records: [
          { id: 1, description: 'Incident 1' },
          { id: 2, description: 'Incident 2' }
        ]
      };
      fs.writeFileSync(incidentFilePath, JSON.stringify(sampleData));

      request(app)
        .get('/incidents')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!Array.isArray(res.body)) throw new Error('Response is not an array');
          if (res.body.length !== 2) throw new Error('Incorrect number of records');
        })
        .end(done);
    });

    it('should respond with 500 error when incident.json is missing', (done) => {
      // Remove incident.json to simulate missing file
      if (fs.existsSync(incidentFilePath)) {
        fs.unlinkSync(incidentFilePath);
      }

      request(app)
        .get('/incidents')
        .expect(500)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!res.body.error) throw new Error('Error message missing');
        })
        .end(done);
    });

    it('should respond with 500 error when incident.json is invalid JSON', (done) => {
      fs.writeFileSync(incidentFilePath, 'invalid json');

      request(app)
        .get('/incidents')
        .expect(500)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!res.body.error) throw new Error('Error message missing');
        })
        .end(done);
    });
  });

describe('GET /incident/p1', () => {
    const incidentFilePath = path.join(__dirname, '../BackEnd/incident.json');
    const backupFilePath = path.join(__dirname, '../BackEnd/incident_backup.json');

    before(() => {
      // Backup the incident.json file if it exists
      if (fs.existsSync(incidentFilePath)) {
        fs.renameSync(incidentFilePath, backupFilePath);
      }
    });

    after(() => {
      // Restore the incident.json file after tests
      if (fs.existsSync(backupFilePath)) {
        fs.renameSync(backupFilePath, incidentFilePath);
      }
    });

    it('should respond with incidents with priority 1', (done) => {
      const sampleData = {
        records: [
          { id: 1, description: 'Incident 1', priority: '1' },
          { id: 2, description: 'Incident 2', priority: '2' },
          { id: 3, description: 'Incident 3', priority: '1' }
        ]
      };
      fs.writeFileSync(incidentFilePath, JSON.stringify(sampleData));

      request(app)
        .get('/incident/p1')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!Array.isArray(res.body)) throw new Error('Response is not an array');
          if (res.body.length !== 2) throw new Error('Incorrect number of priority 1 incidents');
          res.body.forEach(incident => {
            if (incident.priority !== '1') throw new Error('Non-priority 1 incident found');
          });
        })
        .end(done);
    });

    it('should respond with 500 error when incident.json is missing', (done) => {
      if (fs.existsSync(incidentFilePath)) {
        fs.unlinkSync(incidentFilePath);
      }

      request(app)
        .get('/incident/p1')
        .expect(500)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!res.body.error) throw new Error('Error message missing');
        })
        .end(done);
    });

    it('should respond with 500 error when incident.json is invalid JSON', (done) => {
      fs.writeFileSync(incidentFilePath, 'invalid json');

      request(app)
        .get('/incident/p1')
        .expect(500)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!res.body.error) throw new Error('Error message missing');
        })
        .end(done);
    });

    it('should respond with empty array when no priority 1 incidents', (done) => {
      const sampleData = {
        records: [
          { id: 1, description: 'Incident 1', priority: '2' },
          { id: 2, description: 'Incident 2', priority: '3' }
        ]
      };
      fs.writeFileSync(incidentFilePath, JSON.stringify(sampleData));

      request(app)
        .get('/incident/p1')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!Array.isArray(res.body)) throw new Error('Response is not an array');
          if (res.body.length !== 0) throw new Error('Expected empty array for no priority 1 incidents');
        })
        .end(done);
    });
  });

  describe('GET /incident/p2', () => {
    const incidentFilePath = path.join(__dirname, '../BackEnd/incident.json');
    const backupFilePath = path.join(__dirname, '../BackEnd/incident_backup.json');

    before(() => {
      // Backup the incident.json file if it exists
      if (fs.existsSync(incidentFilePath)) {
        fs.renameSync(incidentFilePath, backupFilePath);
      }
    });

    after(() => {
      // Restore the incident.json file after tests
      if (fs.existsSync(backupFilePath)) {
        fs.renameSync(backupFilePath, incidentFilePath);
      }
    });

    it('should respond with incidents with priority 2', (done) => {
      const sampleData = {
        records: [
          { id: 1, description: 'Incident 1', priority: '1' },
          { id: 2, description: 'Incident 2', priority: '2' },
          { id: 3, description: 'Incident 3', priority: '2' }
        ]
      };
      fs.writeFileSync(incidentFilePath, JSON.stringify(sampleData));

      request(app)
        .get('/incident/p2')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!Array.isArray(res.body)) throw new Error('Response is not an array');
          if (res.body.length !== 2) throw new Error('Incorrect number of priority 2 incidents');
          res.body.forEach(incident => {
            if (incident.priority !== '2') throw new Error('Non-priority 2 incident found');
          });
        })
        .end(done);
    });
  });

  describe('Logging Middleware', () => {
    const logFilePath = path.join(__dirname, '../BackEnd/api.log');
    const fsPromises = fs.promises;

    beforeEach(async () => {
      // Clear the log file before each test
      try {
        await fsPromises.writeFile(logFilePath, '');
      } catch (err) {
        // Ignore if file does not exist
      }
    });

    it('should log API calls in the correct format', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .end(async (err) => {
          if (err) return done(err);
          try {
            const logContent = await fsPromises.readFile(logFilePath, 'utf8');
            const logLines = logContent.trim().split('\n');
            if (logLines.length === 0) throw new Error('No log entries found');
            const logEntry = logLines[0];
            const logFormat = /^date-\{\d{2}:\d{2}:\d{2}\} - .* - GET$/;
            if (!logFormat.test(logEntry)) {
              throw new Error(`Log entry does not match format: ${logEntry}`);
            }
            done();
          } catch (readErr) {
            done(readErr);
          }
        });
    });
  });
});
