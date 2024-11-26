import {prisma} from '../app';

// Assign Action to Module
export const assignActionToModule = async (moduleId: number, actionId: number) => {
  const existingMapping = await prisma.moduleAction.findUnique({
    where: {
      moduleId_actionId: { moduleId, actionId },
    },
  });

  if (existingMapping) {
    throw new Error('Action is already assigned to this module');
  }

  return prisma.moduleAction.create({
    data: {
      moduleId,
      actionId,
    },
  });
};

// Get Actions for a Module
export const getActionsForModule = async (moduleId: number) => {
  return prisma.moduleAction.findMany({
    where: { moduleId },
    include: {
      action: true, // Include action details like name, description
    },
  });
};
