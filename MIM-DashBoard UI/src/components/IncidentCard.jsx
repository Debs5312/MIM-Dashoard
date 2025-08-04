import React, { useState } from 'react';
import './IncidentCard.css';

const IncidentCard = ({ incident }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="incident-card">
      <div className="incident-card-summary">
        <h3>{incident.incident_no}</h3>
        <p><strong>Created by:</strong> {incident.created_by}</p>
        <p><strong>Date:</strong> {incident.created_on}</p>
        <button onClick={toggleDetails}>
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
      
      {showDetails && (
        <div className="incident-card-details">
          <p><strong>Description:</strong> {incident.description}</p>
        </div>
      )}
    </div>
  );
};

export default IncidentCard;
