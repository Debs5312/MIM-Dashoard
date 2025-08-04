const incidentModel = require('../models/incidentModel');

const getAllIncidents = (req, res) => {
  incidentModel.readIncidents((err, records) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read or parse incidents data' });
    }
    res.json(records);
  });
};

const getIncidentsByPriority = (priority) => {
  return (req, res) => {
    incidentModel.readIncidents((err, records) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to read or parse incidents data' });
      }
      const filtered = records.filter(incident => incident.priority === priority);
      res.json(filtered);
    });
  };
};

const getIncidentsListByPriority = (priority) => {
  return (req, res) => {
    incidentModel.readIncidents((err, records) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to read or parse incidents data' });
      }
      const filteredList = records
        .filter(incident => incident.priority === priority)
        .map(incident => ({
          'incident_no': incident.incident_no,
          'description': incident.description,
          'created_on': incident.created_on,
          'created_by': incident.created_by
        }));
      res.json(filteredList);
    });
  };
};

module.exports = {
  getAllIncidents,
  getIncidentsByPriority,
  getIncidentsListByPriority,
};
