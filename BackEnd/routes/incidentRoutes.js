const express = require('express');
const router = express.Router();

const {
  getAllIncidents,
  getIncidentsByPriority,
  getIncidentsListByPriority,
} = require('../controllers/incidentController');

router.get('/', getAllIncidents);

router.get('/p1', (req, res) => getIncidentsByPriority('P1')(req, res));

router.get('/p2', (req, res) => getIncidentsByPriority('P2')(req, res));

router.get('/p2/list', (req, res) => getIncidentsListByPriority('P2')(req, res));

router.get('/p1/list', (req, res) => getIncidentsListByPriority('P1')(req, res));

module.exports = router;
