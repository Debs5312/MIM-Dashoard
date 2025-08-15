const fs = require('fs').promises;
const path = require('path');

const incidentFilePath = path.join(__dirname, '..', 'Data', 'incident.json');

const readIncidents = async () => {
  try {
    const data = await fs.readFile(incidentFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading or parsing incident.json:', error);
    throw error;
  }
};

const updateIncident = async (incidentNo, mimEligibilityStatus) => {
  try {
    const incidents = await readIncidents();
    
    const incidentIndex = incidents.findIndex(
      incident => incident.incident_no === incidentNo
    );

    if (incidentIndex === -1) {
      throw new Error('Incident not found');
    }

    // Update the mim_eligibility_status
    incidents[incidentIndex].mim_eligibility_status = mimEligibilityStatus;

    // Write updated incidents back to file
    await fs.writeFile(
      incidentFilePath,
      JSON.stringify(incidents, null, 2),
      'utf8'
    );

    return incidents[incidentIndex];
  } catch (error) {
    console.error('Error updating incident:', error);
    throw error;
  }
};

module.exports = {
  readIncidents,
  updateIncident,
};
