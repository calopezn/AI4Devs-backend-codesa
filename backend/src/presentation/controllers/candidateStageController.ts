import { Request, Response } from 'express';
import { CandidateStageService } from '../../application/services/candidateStageService';
import { UpdateCandidateStageRequest } from '../../domain/models/CandidateStage';

export class CandidateStageController {
  constructor(private candidateStageService: CandidateStageService) {}

  async updateCandidateStage(req: Request, res: Response): Promise<void> {
    try {
      const candidateId = parseInt(req.params.id, 10);
      const data: UpdateCandidateStageRequest = req.body;

      if (isNaN(candidateId)) {
        res.status(400).json({ error: 'ID de candidato inválido' });
        return;
      }

      if (!data.interviewStepId) {
        res.status(400).json({ error: 'Se requiere el ID de la etapa de entrevista' });
        return;
      }

      console.log(`Actualizando etapa del candidato ${candidateId} a la etapa ${data.interviewStepId}`);
      
      const result = await this.candidateStageService.updateCandidateStage(candidateId, data);
      
      res.json({
        message: 'Etapa del candidato actualizada exitosamente',
        data: result
      });
    } catch (error) {
      console.error('Error al actualizar la etapa del candidato:', error);
      
      if (error instanceof Error) {
        res.status(400).json({ 
          error: 'Error al actualizar la etapa del candidato',
          details: error.message
        });
      } else {
        res.status(500).json({ 
          error: 'Error interno del servidor',
          details: 'Error desconocido'
        });
      }
    }
  }
} 