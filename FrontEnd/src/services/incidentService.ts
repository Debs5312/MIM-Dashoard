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
  // Fetch all incidents
  getAllIncidents: async (): Promise<Incident[]> => {
    try {
      const response = await apiClient.get<IncidentResponse>('/');
      return response.data.records || [];
    } catch (error) {
      console.error('Error fetching all incidents:', error);
      throw error;
    }
  },

  // Fetch P1 incidents
  getP1Incidents: async (): Promise<Incident[]> => {
    try {
      const response = await apiClient.get<IncidentResponse>('/p1');
      return response.data.records || [];
    } catch (error) {
      console.error('Error fetching P1 incidents:', error);
      throw error;
    }
  },

  // Fetch P2 incidents
  getP2Incidents: async (): Promise<Incident[]> => {
    try {
      const response = await apiClient.get<IncidentResponse>('/p2');
      return response.data.records || [];
    } catch (error) {
      console.error('Error fetching P2 incidents:', error);
      throw error;
    }
  },

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
