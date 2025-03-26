import { Request, Response } from 'express';
import { PositionCandidateService } from '../../application/services/positionCandidateService';

export class PositionCandidateController {
  constructor(private positionCandidateService: PositionCandidateService) {}

  async getPositionCandidates(req: Request, res: Response): Promise<void> {
    try {
      const positionId = parseInt(req.params.id, 10);
      
      if (isNaN(positionId)) {
        res.status(400).json({ error: 'ID de posición inválido' });
        return;
      }

      console.log(`Buscando candidatos para la posición ID: ${positionId}`);
      
      const result = await this.positionCandidateService.getPositionCandidates(positionId);
      
      console.log('Resultado de la búsqueda:', result);
      
      if (result.total === 0) {
        res.status(404).json({ 
          message: 'No se encontraron candidatos para esta posición',
          data: result 
        });
      } else {
        res.json(result);
      }
    } catch (error) {
      console.error('Error detallado al obtener candidatos de la posición:', error);
      res.status(500).json({ 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }
} 