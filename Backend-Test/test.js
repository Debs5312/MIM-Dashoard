const request = require('supertest');
const app = require('../BackEnd/index.js');

describe('Incident Management API Tests - Fixed', () => {
  
  describe('GET /incident/', () => {
    it('should respond with all incidents', (done) => {
      // Based on actual incident.json which has 30 incidents
      const expectedCount = 30;
      request(app)
        .get('/incident/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!Array.isArray(res.body)) throw new Error('Response is not an array');
          if (res.body.length !== expectedCount) throw new Error(`Expected ${expectedCount} incidents, got ${res.body.length}`);
        })
        .end(done);
    });
  });

  describe('GET /incident/p2', () => {
    it('should respond with priority 2 incidents', (done) => {
      // Based on actual incident.json which has 20 P2 incidents
      const expectedP2Count = 20;
      request(app)
        .get('/incident/p2')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!Array.isArray(res.body)) throw new Error('Response is not an array');
          if (res.body.length !== expectedP2Count) throw new Error(`Expected ${expectedP2Count} priority 2 incidents`);
          res.body.forEach(incident => {
            if (incident.priority !== 'P2') throw new Error('Non-priority 2 incident found');
          });
        })
        .end(done);
    });
  });

  describe('GET /incident/p1', () => {
    it('should respond with priority 1 incidents', (done) => {
      // Based on actual incident.json which has 10 P1 incidents
      const expectedP1Count = 10;
      request(app)
        .get('/incident/p1')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!Array.isArray(res.body)) throw new Error('Response is not an array');
          if (res.body.length !== expectedP1Count) throw new Error(`Expected ${expectedP1Count} priority 1 incidents`);
          res.body.forEach(incident => {
            if (incident.priority !== 'P1') throw new Error('Non-priority 1 incident found');
          });
        })
        .end(done);
    });
  });

  describe('GET /incident/p2/list', () => {
    it('should respond with filtered priority 2 incidents list', (done) => {
      // Based on actual incident.json which has 20 P2 incidents
      const expectedP2Count = 20;
      request(app)
        .get('/incident/p2/list')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!Array.isArray(res.body)) throw new Error('Response is not an array');
          if (res.body.length !== expectedP2Count) throw new Error(`Expected ${expectedP2Count} priority 2 incidents`);
          res.body.forEach(incident => {
            if (!incident.incident_no || !incident.description || !incident.created_on || !incident.created_by) {
              throw new Error('Missing required fields in incident');
            }
            if (!incident.hasOwnProperty('priority') || incident.priority !== 'P2') {
              throw new Error('Priority field should be P2 for priority 2 incidents');
            }
          });
        })
        .end(done);
    });
  });

  describe('GET /incident/p1/list', () => {
    it('should respond with filtered priority 1 incidents list', (done) => {
      // Based on actual incident.json which has 10 P1 incidents
      const expectedP1Count = 10;
      request(app)
        .get('/incident/p1/list')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!Array.isArray(res.body)) throw new Error('Response is not an array');
          if (res.body.length !== expectedP1Count) throw new Error(`Expected ${expectedP1Count} priority 1 incidents`);
          res.body.forEach(incident => {
            if (!incident.incident_no || !incident.description || !incident.created_on || !incident.created_by) {
              throw new Error('Missing required fields in incident');
            }
            if (!incident.hasOwnProperty('priority') || incident.priority !== 'P1') {
              throw new Error('Priority field should be P1 for priority 1 incidents');
            }
          });
        })
        .end(done);
    });
  });
});
