import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkData() {
  try {
    // Verificar posiciones
    const positions = await prisma.position.findMany({
      select: {
        id: true,
        title: true,
        applications: {
          select: {
            id: true
          }
        }
      }
    });

    console.log('Posiciones encontradas:', positions);

    // Verificar aplicaciones
    const applications = await prisma.application.findMany({
      select: {
        id: true,
        positionId: true,
        candidateId: true,
        currentInterviewStep: true
      }
    });

    console.log('Aplicaciones encontradas:', applications);

    // Verificar candidatos
    const candidates = await prisma.candidate.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        applications: {
          select: {
            id: true
          }
        }
      }
    });

    console.log('Candidatos encontrados:', candidates);

  } catch (error) {
    console.error('Error al verificar datos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkData(); 