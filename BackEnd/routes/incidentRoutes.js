const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');

// GET all incidents
router.get('/', incidentController.getAllIncidents);

// GET P1 incidents
router.get('/p1/list', incidentController.getIncidentsListByPriority('P1'));

// GET P2 incidents
router.get('/p2/list', incidentController.getIncidentsListByPriority('P2'));

// PUT update incident status
router.put('/:incident_no/status/:mim_eligibility_status', incidentController.updateIncidentStatus);

module.exports = router;
