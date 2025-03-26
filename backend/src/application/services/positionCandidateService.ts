import { PrismaClient } from '@prisma/client';
import { PositionCandidate, PositionCandidateResponse } from '../../domain/models/PositionCandidate';

type ApplicationWithSelectedFields = {
  candidate: {
    id: number;
    firstName: string;
    lastName: string;
  };
  interviewStep: {
    name: string;
  };
  interviews: {
    score: number | null;
  }[];
};

export class PositionCandidateService {
  constructor(private prisma: PrismaClient) {}

  async getPositionCandidates(positionId: number): Promise<PositionCandidateResponse> {
    try {
      // Verificar si la posición existe
      const position = await this.prisma.position.findUnique({
        where: { id: positionId }
      });

      if (!position) {
        console.log(`No se encontró la posición con ID: ${positionId}`);
        return {
          candidates: [],
          total: 0
        };
      }

      console.log(`Buscando candidatos para la posición: ${position.title}`);
      
      const applications = await this.prisma.application.findMany({
        where: {
          positionId: positionId
        },
        select: {
          candidate: {
            select: {
              id: true,
              firstName: true,
              lastName: true
            }
          },
          interviewStep: {
            select: {
              name: true
            }
          },
          interviews: {
            select: {
              score: true
            }
          }
        }
      });

      console.log(`Se encontraron ${applications.length} aplicaciones`);

      const candidates: PositionCandidate[] = applications.map((application: ApplicationWithSelectedFields) => {
        const averageScore = application.interviews.length > 0
          ? application.interviews.reduce((acc: number, interview: { score: number | null }) => acc + (interview.score || 0), 0) / application.interviews.length
          : 0;

        return {
          id: application.candidate.id,
          fullName: `${application.candidate.firstName} ${application.candidate.lastName}`,
          currentInterviewStep: application.interviewStep.name,
          averageScore: Number(averageScore.toFixed(2))
        };
      });

      return {
        candidates,
        total: candidates.length
      };
    } catch (error) {
      console.error('Error al obtener candidatos:', error);
      throw new Error('Error al obtener los candidatos de la posición');
    }
  }
} 