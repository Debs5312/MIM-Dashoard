const express = require('express');
const router = express.Router();

const {
  getAllIncidents,
  getIncidentsByPriority,
  getIncidentsListByPriority,
} = require('../controllers/incidentController');

router.get('/', getAllIncidents);

router.get('/p1', getIncidentsByPriority('1'));

router.get('/p2', getIncidentsByPriority('2'));

router.get('/p2/list', getIncidentsListByPriority('2'));

router.get('/p1/list', getIncidentsListByPriority('1'));

module.exports = router;
