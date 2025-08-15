const express = require('express');
const request = require('supertest');

// Mock incident data based on incident.json structure
const mockIncidents = [
  {
    incident_no: "INC1001",
    description: "Critical outage",
    priority: "P1",
    created_on: "2025-08-06 12:15:30",
    created_by: "System",
    status: "Open",
    impact: "All services down",
    affected_users: "All users",
    affected_system: "Core API",
    mim_eligibility_status: "accepted"
  },
  {
    incident_no: "INC1002",
    description: "Minor bug",
    priority: "P2",
    created_on: "2025-08-07 09:00:00",
    created_by: "QA",
    status: "Open",
    impact: "Some users affected",
    affected_users: "Subset",
    affected_system: "UI",
    mim_eligibility_status: "open"
  },
  // Edge case: missing optional fields
  {
    incident_no: "INC1003",
    description: "",
    priority: "P1",
    created_on: "",
    created_by: "",
    status: "",
    impact: "",
    affected_users: "",
    affected_system: "",
    mim_eligibility_status: "open"
  }
];

// Mock Express app and routes
function createMockApp() {
  const app = express();
  app.use(express.json());

  app.get('/incident/', (req, res) => {
    res.json(mockIncidents);
  });

  app.get('/incident/p1/list', (req, res) => {
    res.json(mockIncidents.filter(i => i.priority === 'P1'));
  });

  app.get('/incident/p2/list', (req, res) => {
    res.json(mockIncidents.filter(i => i.priority === 'P2'));
  });

  return app;
}

const app = createMockApp();

describe('Incident Management API (Mocked)', () => {
  test('GET /incident/ - should return all incidents with required fields', async () => {
    const response = await request(app)
      .get('/incident/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(mockIncidents.length);

    response.body.forEach(incident => {
      expect(incident).toHaveProperty('incident_no');
      expect(incident).toHaveProperty('description');
      expect(incident).toHaveProperty('priority');
      expect(incident).toHaveProperty('created_on');
      expect(incident).toHaveProperty('created_by');
      expect(incident).toHaveProperty('status');
      expect(incident).toHaveProperty('impact');
      expect(incident).toHaveProperty('affected_users');
      expect(incident).toHaveProperty('affected_system');
      expect(incident).toHaveProperty('mim_eligibility_status');
    });
  });

  test('GET /incident/p1/list - should return only P1 incidents', async () => {
    const response = await request(app)
      .get('/incident/p1/list')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach(incident => {
      expect(incident.priority).toBe('P1');
      expect(incident).toHaveProperty('incident_no');
      expect(incident).toHaveProperty('description');
    });
  });

  test('GET /incident/p2/list - should return only P2 incidents', async () => {
    const response = await request(app)
      .get('/incident/p2/list')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach(incident => {
      expect(incident.priority).toBe('P2');
      expect(incident).toHaveProperty('incident_no');
      expect(incident).toHaveProperty('description');
    });
  });

  test('GET /incident/ - should handle edge cases (missing fields, empty strings)', async () => {
    const response = await request(app)
      .get('/incident/')
      .expect('Content-Type', /json/)
      .expect(200);

    // Check for at least one incident with empty fields
    const edgeCase = response.body.find(i => i.incident_no === "INC1003");
    expect(edgeCase).toBeDefined();
    expect(edgeCase.description).toBe("");
    expect(edgeCase.created_on).toBe("");
    expect(edgeCase.created_by).toBe("");
  });

  test('GET /incident/ - should return empty array if no incidents', async () => {
    // Create a new app with no incidents
    const emptyApp = express();
    emptyApp.get('/incident/', (req, res) => res.json([]));
    const response = await request(emptyApp)
      .get('/incident/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);
  });
});