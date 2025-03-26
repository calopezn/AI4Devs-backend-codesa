import { Router } from 'express';
import { CandidateStageController } from '../presentation/controllers/candidateStageController';
import { CandidateStageService } from '../application/services/candidateStageService';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();
const candidateStageService = new CandidateStageService(prisma);
const candidateStageController = new CandidateStageController(candidateStageService);

router.put('/:id/stage', (req, res) => candidateStageController.updateCandidateStage(req, res));

export default router; 