export interface Incident {
  id?: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  createdDate: string;
  updatedDate: string;
  // Add other fields as needed based on actual backend data
}

export interface IncidentResponse {
  records: Incident[];
}

export interface P1Incident extends Incident {
  priority: '1';
}

export interface P2Incident extends Incident {
  priority: '2';
}
