const incidentModel = require('../models/incidentModel');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');

const getAllIncidents = asyncErrorHandler(async (req, res) => {
  const incidents = await incidentModel.readIncidents();
  res.json(incidents);
});

const getIncidentsListByPriority = (priority) => {
  return asyncErrorHandler(async (req, res) => {
    const incidents = await incidentModel.readIncidents();
    const filteredList = incidents.filter(incident => incident.priority === priority);
    res.json(filteredList);
  });
};

const updateIncidentStatus = asyncErrorHandler(async (req, res) => {
  const { incident_no, mim_eligibility_status } = req.params;

  // Validate mim_eligibility_status
  const validStatuses = ['accepted', 'rejected'];
  if (!validStatuses.includes(mim_eligibility_status)) {
    return res.status(400).json({ 
      error: 'Invalid mim_eligibility_status. Must be "accepted" or "rejected"' 
    });
  }

  const updatedIncident = await incidentModel.updateIncident(
    incident_no, 
    mim_eligibility_status
  );
  
  res.json({
    message: 'Incident updated successfully',
    incident: updatedIncident
  });
});


module.exports = {
  getAllIncidents,
  getIncidentsListByPriority,
  updateIncidentStatus,
};
