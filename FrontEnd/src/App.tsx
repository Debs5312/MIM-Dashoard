import './App.css';
import { p1Incidents, p2Incidents } from './data/incidents';

function App() {
  return (
    <div className="header">
      <h1>MIM DASHBOARD</h1>
      <div className="container">
        <div className="block">
          <h2>P1 Incidents</h2>
          {p1Incidents.map((incident, index) => (
            <p key={index}>{incident}</p>
          ))}
        </div>
        <div className="central-block">
          <h2>All MIM Incidents</h2>
          <p>Placeholder for all MIM incidents with scroll bar</p>
          {[...Array(30)].map((_, i) => (
            <p key={i}>Incident {i + 1}</p>
          ))}
        </div>
        <div className="block">
          <h2>P2 Incidents</h2>
          {p2Incidents.map((incident, index) => (
            <p key={index}>{incident}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
