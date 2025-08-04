// Incident data model matching the backend structure
export const createIncident = (data) => ({
  incident_no: data.incident_no || '',
  description: data.description || '',
  created_on: data.created_on || '',
  created_by: data.created_by || ''
});

export const createIncidentResponse = (data) => ({
  records: Array.isArray(data.records) ? data.records.map(createIncident) : []
});
