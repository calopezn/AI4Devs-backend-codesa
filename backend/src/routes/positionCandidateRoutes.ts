import { Router } from 'express';
import { PositionCandidateController } from '../presentation/controllers/positionCandidateController';
import { PositionCandidateService } from '../application/services/positionCandidateService';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();
const positionCandidateService = new PositionCandidateService(prisma);
const positionCandidateController = new PositionCandidateController(positionCandidateService);

router.get('/:id/candidates', (req, res) => positionCandidateController.getPositionCandidates(req, res));

export default router; 