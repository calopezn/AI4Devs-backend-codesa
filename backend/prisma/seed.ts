import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Crear una compañía
    const company = await prisma.company.create({
      data: {
        name: 'Tech Solutions Inc.'
      }
    });

    // Crear un flujo de entrevista
    const interviewFlow = await prisma.interviewFlow.create({
      data: {
        description: 'Flujo de entrevista estándar'
      }
    });

    // Crear tipos de entrevista
    const technicalType = await prisma.interviewType.create({
      data: {
        name: 'Técnica',
        description: 'Evaluación de habilidades técnicas'
      }
    });

    const hrType = await prisma.interviewType.create({
      data: {
        name: 'RRHH',
        description: 'Evaluación de habilidades blandas'
      }
    });

    // Crear pasos de entrevista
    const technicalStep = await prisma.interviewStep.create({
      data: {
        name: 'Entrevista Técnica',
        orderIndex: 1,
        interviewFlowId: interviewFlow.id,
        interviewTypeId: technicalType.id
      }
    });

    const hrStep = await prisma.interviewStep.create({
      data: {
        name: 'Entrevista RRHH',
        orderIndex: 2,
        interviewFlowId: interviewFlow.id,
        interviewTypeId: hrType.id
      }
    });

    // Crear una posición
    const position = await prisma.position.create({
      data: {
        companyId: company.id,
        interviewFlowId: interviewFlow.id,
        title: 'Desarrollador Full Stack Senior',
        description: 'Buscamos un desarrollador Full Stack con experiencia en React y Node.js',
        location: 'Remoto',
        jobDescription: 'Desarrollo de aplicaciones web usando React y Node.js',
        status: 'Active',
        isVisible: true
      }
    });

    // Crear un empleado (entrevistador)
    const employee = await prisma.employee.create({
      data: {
        companyId: company.id,
        name: 'Juan Pérez',
        email: 'juan.perez@techsolutions.com',
        role: 'Tech Lead',
        isActive: true
      }
    });

    // Crear un candidato
    const candidate = await prisma.candidate.create({
      data: {
        firstName: 'Ana',
        lastName: 'García',
        email: 'ana.garcia@gmail.com',
        phone: '123456789',
        address: 'Calle Principal 123'
      }
    });

    // Crear una aplicación
    const application = await prisma.application.create({
      data: {
        positionId: position.id,
        candidateId: candidate.id,
        currentInterviewStep: technicalStep.id,
        applicationDate: new Date(),
        notes: 'Candidata con experiencia relevante'
      }
    });

    // Crear una entrevista
    await prisma.interview.create({
      data: {
        applicationId: application.id,
        interviewStepId: technicalStep.id,
        employeeId: employee.id,
        interviewDate: new Date(),
        result: 'Aprobado',
        score: 85,
        notes: 'Excelente conocimiento técnico'
      }
    });

    console.log('Datos de prueba creados exitosamente');
  } catch (error) {
    console.error('Error al crear datos de prueba:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
