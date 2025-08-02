import axios from 'axios';
import type { Incident, IncidentResponse } from '../models/incidentModel';

const API_BASE_URL = 'http://localhost:3000/incident';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const incidentService = {

  // Fetch P1 incidents list
  getP1IncidentsList: async (): Promise<Incident[]> => {
    try {
      const response = await apiClient.get<IncidentResponse>('/p1/list');
      return response.data.records || [];
    } catch (error) {
      console.error('Error fetching P1 incidents list:', error);
      throw error;
    }
  },

  // Fetch P2 incidents list
  getP2IncidentsList: async (): Promise<Incident[]> => {
    try {
      const response = await apiClient.get<IncidentResponse>('/p2/list');
      return response.data.records || [];
    } catch (error) {
      console.error('Error fetching P2 incidents list:', error);
      throw error;
    }
  },
};
