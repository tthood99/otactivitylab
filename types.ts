
export interface Intervention {
  title: string;
  description: string;
  materials: string[];
  clinicalRationale: string;
  gradingType: 'DOWNGRADE' | 'TARGET' | 'UPGRADE';
}

export interface ActivityAnalysisResponse {
  goalSummary: string;
  interventions: Intervention[];
}
