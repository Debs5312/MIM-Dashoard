const express = require('express');
const router = express.Router();

const {
  getAllIncidents,
  getIncidentsByPriority,
  getIncidentsListByPriority,
} = require('../controllers/incidentController');

router.get('/', getAllIncidents);

router.get('/p1', (req, res) => getIncidentsByPriority('1')(req, res));

router.get('/p2', (req, res) => getIncidentsByPriority('2')(req, res));

router.get('/p2/list', (req, res) => getIncidentsListByPriority('2')(req, res));

router.get('/p1/list', (req, res) => getIncidentsListByPriority('1')(req, res));

module.exports = router;
