const request = require('supertest');
const fs = require('fs');
const path = require('path');

const app = require('../BackEnd/index.js'); // Import the express app

// Use the actual data file path from the backend
const incidentFilePath = path.join(__dirname, '../BackEnd/Data/incident.json');
const backupFilePath = path.join(__dirname, '../BackEnd/Data/incident_backup.json');

describe('Incident Management API Tests', () => {
  
  describe('GET /incident/', () => {
    const incidentFilePath = path.join(__dirname, '../BackEnd/Data/incident.json');
    const backupFilePath = path.join(__dirname, '../BackEnd/Data/incident_backup.json');

    before(() => {
      if (fs.existsSync(incidentFilePath)) {
        fs.renameSync(incidentFilePath, backupFilePath);
      }
    });

    after(() => {
      if (fs.existsSync(backupFilePath)) {
        fs.renameSync(backupFilePath, incidentFilePath);
      }
    });

    it('should respond with all incidents when incident.json is valid', (done) => {
      const sampleData = [
        {
          incident_no: 'INC001',
          description: 'Test incident 1',
          priority: 'P2',
          created_on: '2023-01-01',
          created_by: 'user1'
        },
        {
          incident_no: 'INC002',
          description: 'Test incident 2',
          priority: 'P1',
          created_on: '2023-01-02',
          created_by: 'user2'
        }
      ];
      fs.writeFileSync(incidentFilePath, JSON.stringify(sampleData));

      request(app)
        .get('/incident/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!Array.isArray(res.body)) throw new Error('Response is not an array');
          if (res.body.length !== 2) throw new Error('Expected 2 incidents');
        })
        .end(done);
    });

    it('should respond with 500 error when incident.json is missing', (done) => {
      if (fs.existsSync(incidentFilePath)) {
        fs.unlinkSync(incidentFilePath);
      }

      request(app)
        .get('/incident/')
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
        .get('/incident/')
        .expect(500)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!res.body.error) throw new Error('Error message missing');
        })
        .end(done);
    });
  });

  describe('GET /incident/p2', () => {
    const incidentFilePath = path.join(__dirname, '../BackEnd/Data/incident.json');
    const backupFilePath = path.join(__dirname, '../BackEnd/Data/incident_backup.json');

    before(() => {
      if (fs.existsSync(incidentFilePath)) {
        fs.renameSync(incidentFilePath, backupFilePath);
      }
    });

    after(() => {
      if (fs.existsSync(backupFilePath)) {
        fs.renameSync(backupFilePath, incidentFilePath);
      }
    });

    it('should respond with priority 2 incidents', (done) => {
      const sampleData = [
        {
          incident_no: 'INC001',
          description: 'Test incident 1',
          priority: 'P2',
          created_on: '2023-01-01',
          created_by: 'user1'
        },
        {
          incident_no: 'INC002',
          description: 'Test incident 2',
          priority: 'P1',
          created_on: '2023-01-02',
          created_by: 'user2'
        },
        {
          incident_no: 'INC003',
          description: 'Test incident 3',
          priority: 'P2',
          created_on: '2023-01-03',
          created_by: 'user3'
        }
      ];
      fs.writeFileSync(incidentFilePath, JSON.stringify(sampleData));

      request(app)
        .get('/incident/p2')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!Array.isArray(res.body)) throw new Error('Response is not an array');
          if (res.body.length !== 2) throw new Error('Expected 2 priority 2 incidents');
          res.body.forEach(incident => {
            if (incident.priority !== 'P2') throw new Error('Non-priority 2 incident found');
          });
        })
        .end(done);
    });
  });

  describe('GET /incident/p1', () => {
    const incidentFilePath = path.join(__dirname, '../BackEnd/Data/incident.json');
    const backupFilePath = path.join(__dirname, '../BackEnd/Data/incident_backup.json');

    before(() => {
      if (fs.existsSync(incidentFilePath)) {
        fs.renameSync(incidentFilePath, backupFilePath);
      }
    });

    after(() => {
      if (fs.existsSync(backupFilePath)) {
        fs.renameSync(backupFilePath, incidentFilePath);
      }
    });

    it('should respond with priority 1 incidents', (done) => {
      const sampleData = [
        {
          incident_no: 'INC001',
          description: 'Test incident 1',
          priority: 'P1',
          created_on: '2023-01-01',
          created_by: 'user1'
        },
        {
          incident_no: 'INC002',
          description: 'Test incident 2',
          priority: 'P2',
          created_on: '2023-01-02',
          created_by: 'user2'
        },
        {
          incident_no: 'INC003',
          description: 'Test incident 3',
          priority: 'P1',
          created_on: '2023-01-03',
          created_by: 'user3'
        }
      ];
      fs.writeFileSync(incidentFilePath, JSON.stringify(sampleData));

      request(app)
        .get('/incident/p1')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!Array.isArray(res.body)) throw new Error('Response is not an array');
          if (res.body.length !== 2) throw new Error('Expected 2 priority 1 incidents');
          res.body.forEach(incident => {
            if (incident.priority !== 'P1') throw new Error('Non-priority 1 incident found');
          });
        })
        .end(done);
    });
  });

  describe('GET /incident/p2/list', () => {
    const incidentFilePath = path.join(__dirname, '../BackEnd/Data/incident.json');
    const backupFilePath = path.join(__dirname, '../BackEnd/Data/incident_backup.json');

    before(() => {
      if (fs.existsSync(incidentFilePath)) {
        fs.renameSync(incidentFilePath, backupFilePath);
      }
    });

    after(() => {
      if (fs.existsSync(backupFilePath)) {
        fs.renameSync(backupFilePath, incidentFilePath);
      }
    });

    it('should respond with filtered priority 2 incidents list', (done) => {
      const sampleData = [
        {
          incident_no: 'INC001',
          description: 'Test incident 1',
          priority: 'P2',
          created_on: '2023-01-01',
          created_by: 'user1'
        },
        {
          incident_no: 'INC002',
          description: 'Test incident 2',
          priority: 'P1',
          created_on: '2023-01-02',
          created_by: 'user2'
        },
        {
          incident_no: 'INC003',
          description: 'Test incident 3',
          priority: 'P2',
          created_on: '2023-01-03',
          created_by: 'user3'
        }
      ];
      fs.writeFileSync(incidentFilePath, JSON.stringify(sampleData));

      request(app)
        .get('/incident/p2/list')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!Array.isArray(res.body)) throw new Error('Response is not an array');
          if (res.body.length !== 2) throw new Error('Expected 2 priority 2 incidents');
          res.body.forEach(incident => {
            if (!incident.incident_no || !incident.description || !incident.created_on || !incident.created_by) {
              throw new Error('Missing required fields in incident');
            }
            // Ensure priority field is not included in list response
            if (incident.priority !== undefined) {
              throw new Error('Priority field should not be included in list response');
            }
          });
        })
        .end(done);
    });
  });

  describe('GET /incident/p1/list', () => {
    const incidentFilePath = path.join(__dirname, '../BackEnd/Data/incident.json');
    const backupFilePath = path.join(__dirname, '../BackEnd/Data/incident_backup.json');

    before(() => {
      if (fs.existsSync(incidentFilePath)) {
        fs.renameSync(incidentFilePath, backupFilePath);
      }
    });

    after(() => {
      if (fs.existsSync(backupFilePath)) {
        fs.renameSync(backupFilePath, incidentFilePath);
      }
    });

    it('should respond with filtered priority 1 incidents list', (done) => {
      const sampleData = [
        {
          incident_no: 'INC001',
          description: 'Test incident 1',
          priority: 'P1',
          created_on: '2023-01-01',
          created_by: 'user1'
        },
        {
          incident_no: 'INC002',
          description: 'Test incident 2',
          priority: 'P2',
          created_on: '2023-01-02',
          created_by: 'user2'
        },
        {
          incident_no: 'INC003',
          description: 'Test incident 3',
          priority: 'P1',
          created_on: '2023-01-03',
          created_by: 'user3'
        }
      ];
      fs.writeFileSync(incidentFilePath, JSON.stringify(sampleData));

      request(app)
        .get('/incident/p1/list')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!Array.isArray(res.body)) throw new Error('Response is not an array');
          if (res.body.length !== 2) throw new Error('Expected 2 priority 1 incidents');
          res.body.forEach(incident => {
            if (!incident.incident_no || !incident.description || !incident.created_on || !incident.created_by) {
              throw new Error('Missing required fields in incident');
            }
            // Ensure priority field is not included in list response
            if (incident.priority !== undefined) {
              throw new Error('Priority field should not be included in list response');
            }
          });
        })
        .end(done);
    });
  });

  describe('Error Handling', () => {
    const incidentFilePath = path.join(__dirname, '../BackEnd/Data/incident.json');
    const backupFilePath = path.join(__dirname, '../BackEnd/Data/incident_backup.json');

    before(() => {
      if (fs.existsSync(incidentFilePath)) {
        fs.renameSync(incidentFilePath, backupFilePath);
      }
    });

    after(() => {
      if (fs.existsSync(backupFilePath)) {
        fs.renameSync(backupFilePath, incidentFilePath);
      }
    });

    it('should handle missing file gracefully for all endpoints', (done) => {
      if (fs.existsSync(incidentFilePath)) {
        fs.unlinkSync(incidentFilePath);
      }

      request(app)
        .get('/incident/p1/list')
        .expect(500)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!res.body.error) throw new Error('Error message missing');
        })
        .end(done);
    });

    it('should handle invalid JSON gracefully for all endpoints', (done) => {
      fs.writeFileSync(incidentFilePath, 'invalid json');

      request(app)
        .get('/incident/p2')
        .expect(500)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!res.body.error) throw new Error('Error message missing');
        })
        .end(done);
    });
  });

  describe('Logging Middleware', () => {
    const logFilePath = path.join(__dirname, '../BackEnd/log/api.log');
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
      const sampleData = [
        {
          incident_no: 'INC001',
          description: 'Test incident 1',
          priority: 'P1',
          created_on: '2023-01-01',
          created_by: 'user1'
        }
      ];
      fs.writeFileSync(incidentFilePath, JSON.stringify(sampleData));

      request(app)
        .get('/incident/')
        .expect(200)
        .end(async (err) => {
          if (err) return done(err);
          try {
            const logContent = await fsPromises.readFile(logFilePath, 'utf8');
            const logLines = logContent.trim().split('\n');
            if (logLines.length === 0) throw new Error('No log entries found');
            const logEntry = logLines[0];
            // Check if log entry contains basic components
            if (!logEntry.includes('GET') || !logEntry.includes('/incident/')) {
              throw new Error(`Log entry does not contain expected components: ${logEntry}`);
            }
            done();
          } catch (readErr) {
            done(readErr);
          }
        });
    });
  });
});
