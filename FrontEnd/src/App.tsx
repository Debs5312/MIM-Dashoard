import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import './App.css';
import { incidentStore } from './stores/incidentStore';

const App = observer(() => {
  useEffect(() => {
    incidentStore.fetchData();
  }, []);

  const { 
    p1Incidents, 
    p2Incidents, 
    allIncidents, 
    loading, 
    p1Loading, 
    p2Loading, 
    error, 
    p1Error, 
    p2Error 
  } = incidentStore;

  const handleRefresh = async () => {
    await incidentStore.refreshData();
  };

  if (loading && p1Incidents.length === 0 && p2Incidents.length === 0) {
    return (
      <div className="header">
        <h1>MIM DASHBOARD</h1>
        <div className="container">
          <div className="block">
            <h2>Loading...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="header">
      <h1>MIM DASHBOARD</h1>
      <button onClick={handleRefresh} disabled={p1Loading || p2Loading}>
        {p1Loading || p2Loading ? 'Refreshing...' : 'Refresh Data'}
      </button>
      {error && <div className="error"><h3>Error: {error}</h3></div>}
      
      <div className="container">
        <div className="block">
          <h2>P1 Incidents</h2>
          {p1Loading ? (
            <p>Loading P1 incidents...</p>
          ) : p1Error ? (
            <p className="error">{p1Error}</p>
          ) : p1Incidents.length > 0 ? (
            p1Incidents.map((incident) => (
              <div key={incident.incident_no} className="incident-item">
                <h3>{incident.incident_no}</h3>
                <p><strong>Description:</strong> {incident.description}</p>
                <p><strong>Created:</strong> {incident.created_on}</p>
                <p><strong>By:</strong> {incident.created_by}</p>
              </div>
            ))
          ) : (
            <p>No P1 incidents found</p>
          )}
        </div>
        
        <div className="central-block">
          <h2>All MIM Incidents ({allIncidents.length})</h2>
          {allIncidents.length > 0 ? (
            allIncidents.map((incident) => (
              <div key={incident.incident_no} className="incident-item">
                <h3>{incident.incident_no}</h3>
                <p><strong>Description:</strong> {incident.description}</p>
                <p><strong>Created:</strong> {incident.created_on}</p>
                <p><strong>By:</strong> {incident.created_by}</p>
              </div>
            ))
          ) : (
            <p>No incidents found</p>
          )}
        </div>
        
        <div className="block">
          <h2>P2 Incidents</h2>
          {p2Loading ? (
            <p>Loading P2 incidents...</p>
          ) : p2Error ? (
            <p className="error">{p2Error}</p>
          ) : p2Incidents.length > 0 ? (
            p2Incidents.map((incident) => (
              <div key={incident.incident_no} className="incident-item">
                <h3>{incident.incident_no}</h3>
                <p><strong>Description:</strong> {incident.description}</p>
                <p><strong>Created:</strong> {incident.created_on}</p>
                <p><strong>By:</strong> {incident.created_by}</p>
              </div>
            ))
          ) : (
            <p>No P2 incidents found</p>
          )}
        </div>
      </div>
    </div>
  );
});

export default App;
