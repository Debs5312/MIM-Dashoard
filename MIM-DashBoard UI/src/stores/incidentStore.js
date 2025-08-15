import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { incidentService } from '../services/incidentService';

class IncidentStore {
  p1Incidents = [];
  p2Incidents = [];
  mimIncidents = [];
  loading = true;
  p1Loading = false;
  p2Loading = false;
  error = null;
  p1Error = null;
  p2Error = null;

  constructor() {
    makeAutoObservable(this);
    
    // Auto-observable technique: reaction to filter incidents by mim_eligibility_status
    reaction(
      () => [this.p1Incidents, this.p2Incidents],
      ([p1Incidents, p2Incidents]) => {
        runInAction(() => {
            const allCombinedIncidents = [...p1Incidents, ...p2Incidents];
            this.mimIncidents = allCombinedIncidents.filter(
              incident => incident.mim_eligibility_status === "accepted"
            );
        });
      }
    );
  }

  // Fetch all incident data from the API
  fetchData = async () => {
    this.loading = true;
    this.error = null;
    
    // Fetch P1 incidents list
    this.p1Loading = true;
    this.p1Error = null;
    try {
      const p1Data = await incidentService.getP1IncidentsList();
      runInAction(() => {
        this.p1Incidents = p1Data;
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch P1 incidents';
      runInAction(() => {
        this.p1Error = `P1 Incidents Error: ${errorMessage}`;
      });
      console.error('Error fetching P1 data:', err);
    } finally {
      runInAction(() => {
        this.p1Loading = false;
      });
    }
    
    // Fetch P2 incidents
    runInAction(() => {
        this.p2Loading = true;
        this.p2Error = null;
    });
    try {
      const p2Data = await incidentService.getP2IncidentsList();
      runInAction(() => {
        this.p2Incidents = p2Data;
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch P2 incidents';
      runInAction(() => {
        this.p2Error = `P2 Incidents Error: ${errorMessage}`;
      });
      console.error('Error fetching P2 data:', err);
    } finally {
      runInAction(() => {
        this.p2Loading = false;
      });
    }

    runInAction(() => {
        this.loading = false;
    });
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
