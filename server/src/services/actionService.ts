import { prisma } from "../app";

export const createAction = async (name: string, description?: string) => {
    const existingAction = await prisma.action.findUnique({ where: { name } });
    if (existingAction) {
      throw new Error('Action already exists');
    }
  
    return prisma.action.create({
      data: {
        name,
        description,
      },
    });
  };
  
  // Get all Actions
  export const getAllActions = async () => {
    return prisma.action.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
  };

// Update Action
export const updateAction = async (actionId: number, name: string, description?: string) => {
    const existingAction = await prisma.action.findUnique({ where: { id: actionId } });
    if (!existingAction) {
      throw new Error('Action not found');
    }
  
    return prisma.action.update({
      where: { id: actionId },
      data: { name, description },
    });
};

// Delete Action
export const deleteAction = async (actionId: number) => {
    const existingAction = await prisma.action.findUnique({ where: { id: actionId } });
    if (!existingAction) {
      throw new Error('Action not found');
    }
  
    return prisma.action.delete({
      where: { id: actionId },
    });
};