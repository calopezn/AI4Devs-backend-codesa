export interface UpdateCandidateStageRequest {
  interviewStepId: number;
}

export interface UpdateCandidateStageResponse {
  id: number;
  candidateId: number;
  positionId: number;
  currentInterviewStep: number;
  interviewStepName: string;
  updatedAt: Date;
} 