export interface Incident {
  incident_no: string
  description: string
  created_on: string
  created_by: string
}

export interface IncidentResponse {
  records: Incident[];
}


