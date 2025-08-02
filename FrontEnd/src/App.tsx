import { useState, useEffect } from 'react';
import './App.css';
import { incidentService } from './services/incidentService';
import type { Incident } from './models/incidentModel';

function App() {
  const [p1Incidents, setP1Incidents] = useState<Incident[]>([]);
  const [p2Incidents, setP2Incidents] = useState<Incident[]>([]);
  const [allIncidents, setAllIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch all incidents
        const allData = await incidentService.getAllIncidents();
        setAllIncidents(allData);
        
        // Fetch P1 incidents
        const p1Data = await incidentService.getP1Incidents();
        setP1Incidents(p1Data);
        
        // Fetch P2 incidents
        const p2Data = await incidentService.getP2Incidents();
        setP2Incidents(p2Data);
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch incidents. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="header"><h1>Loading...</h1></div>;
  }

  if (error) {
    return <div className="header"><h1>Error: {error}</h1></div>;
  }

  return (
    <div className="header">
      <h1>MIM DASHBOARD</h1>
      <div className="container">
        <div className="block">
          <h2>P1 Incidents</h2>
          {p1Incidents.map((incident, index) => (
            <p key={index}>{incident.title || `P1 Incident ${index + 1}`}</p>
          ))}
        </div>
        <div className="central-block">
          <h2>All MIM Incidents</h2>
          <p>Placeholder for all MIM incidents with scroll bar</p>
          {allIncidents.map((incident, i) => (
            <p key={i}>{incident.title || `Incident ${i + 1}`}</p>
          ))}
        </div>
        <div className="block">
          <h2>P2 Incidents</h2>
          {p2Incidents.map((incident, index) => (
            <p key={index}>{incident.title || `P2 Incident ${index + 1}`}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
