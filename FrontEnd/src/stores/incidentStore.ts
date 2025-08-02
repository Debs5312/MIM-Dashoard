import { makeAutoObservable, reaction } from 'mobx';
import { incidentService } from '../services/incidentService';
import type { Incident } from '../models/incidentModel';

class IncidentStore {
  p1Incidents: Incident[] = [];
  p2Incidents: Incident[] = [];
  allIncidents: Incident[] = [];
  loading: boolean = true;
  p1Loading: boolean = false;
  p2Loading: boolean = false;
  error: string | null = null;
  p1Error: string | null = null;
  p2Error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    
    // Auto-observable technique: reaction to automatically combine incidents
    reaction(
      () => [this.p1Incidents, this.p2Incidents],
      ([p1Incidents, p2Incidents]) => {
        this.allIncidents = [...p1Incidents as Incident[], ...p2Incidents as Incident[]];
      }
    );
  }

  // Fetch all incident data from the API
  fetchData = async () => {
    try {
      this.loading = true;
      this.error = null;
      
      // Fetch P1 incidents list
      this.p1Loading = true;
      this.p1Error = null;
      try {
        const p1Data = await incidentService.getP1IncidentsList();
        this.p1Incidents = p1Data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch P1 incidents';
        this.p1Error = `P1 Incidents Error: ${errorMessage}`;
        console.error('Error fetching P1 data:', err);
      } finally {
        this.p1Loading = false;
      }
      
      // Fetch P2 incidents
      this.p2Loading = true;
      this.p2Error = null;
      try {
        const p2Data = await incidentService.getP2IncidentsList();
        this.p2Incidents = p2Data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch P2 incidents';
        this.p2Error = `P2 Incidents Error: ${errorMessage}`;
        console.error('Error fetching P2 data:', err);
      } finally {
        this.p2Loading = false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch incidents';
      this.error = `General Error: ${errorMessage}`;
      console.error('Error fetching data:', err);
    } finally {
      this.loading = false;
    }
  };

  // Refresh all incident data
  refreshData = async () => {
    await this.fetchData();
  };
}

// Create a singleton instance of the store
const incidentStore = new IncidentStore();

// Export the singleton instance
export { incidentStore };
