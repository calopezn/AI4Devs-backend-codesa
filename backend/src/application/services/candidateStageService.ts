import { PrismaClient } from '@prisma/client';
import { UpdateCandidateStageRequest, UpdateCandidateStageResponse } from '../../domain/models/CandidateStage';

export class CandidateStageService {
  constructor(private prisma: PrismaClient) {}

  async updateCandidateStage(
    candidateId: number,
    data: UpdateCandidateStageRequest
  ): Promise<UpdateCandidateStageResponse> {
    try {
      // Verificar si el candidato existe y tiene una aplicación activa
      const application = await this.prisma.application.findFirst({
        where: {
          candidateId: candidateId,
        },
        include: {
          interviewStep: true
        }
      });

      if (!application) {
        throw new Error('No se encontró una aplicación activa para este candidato');
      }

      // Verificar si la nueva etapa existe
      const newInterviewStep = await this.prisma.interviewStep.findUnique({
        where: {
          id: data.interviewStepId
        }
      });

      if (!newInterviewStep) {
        throw new Error('La etapa de entrevista especificada no existe');
      }

      // Verificar que la nueva etapa pertenece al mismo flujo de entrevista
      if (newInterviewStep.interviewFlowId !== application.interviewStep.interviewFlowId) {
        throw new Error('La nueva etapa no pertenece al mismo flujo de entrevista');
      }

      // Actualizar la etapa del candidato
      const updatedApplication = await this.prisma.application.update({
        where: {
          id: application.id
        },
        data: {
          currentInterviewStep: data.interviewStepId
        },
        include: {
          interviewStep: true
        }
      });

      return {
        id: updatedApplication.id,
        candidateId: updatedApplication.candidateId,
        positionId: updatedApplication.positionId,
        currentInterviewStep: updatedApplication.currentInterviewStep,
        interviewStepName: updatedApplication.interviewStep.name,
        updatedAt: new Date()
      };
    } catch (error) {
      console.error('Error al actualizar la etapa del candidato:', error);
      throw error;
    }
  }
} 