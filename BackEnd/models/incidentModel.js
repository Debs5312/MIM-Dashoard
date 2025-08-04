const fs = require('fs');
const path = require('path');

const incidentFilePath = path.join(__dirname, '..', 'Data', 'incident.json');

const readIncidents = (callback) => {
  fs.readFile(incidentFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading incident.json:', err);
      return callback(err);
    }
    try {
      const incidents = JSON.parse(data);
      callback(null, incidents.records);
    } catch (parseErr) {
      console.error('Error parsing incident.json:', parseErr);
      callback(parseErr);
    }
  });
};

module.exports = {
  readIncidents,
};
