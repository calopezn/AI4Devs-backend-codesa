export interface PositionCandidate {
  id: number;
  fullName: string;
  currentInterviewStep: string;
  averageScore: number;
}

export interface PositionCandidateResponse {
  candidates: PositionCandidate[];
  total: number;
} 