import { prisma } from "../app";

// Create Module
export const createModule = async (name: string) => {
    const existingModule = await prisma.module.findUnique({ where: { name } });
    if (existingModule) {
      throw new Error('Module already exists');
    }
  
    return prisma.module.create({
      data: {
        name,
      },
    });
  };


// Get all modules
export const getAllModules = async () => {
    return prisma.module.findMany({
      select: {
        id: true,
        name: true,
      },
    });
};


// Update Module
export const updateModule = async (moduleId: number, name: string) => {
    const existingModule = await prisma.module.findUnique({ where: { id: moduleId } });
    if (!existingModule) {
      throw new Error('Module not found');
    }
  
    return prisma.module.update({
      where: { id: moduleId },
      data: { name },
    });
};  

// Delete Module
export const deleteModule = async (moduleId: number) => {
    const existingModule = await prisma.module.findUnique({ where: { id: moduleId } });
    if (!existingModule) {
      throw new Error('Module not found');
    }
  
    return prisma.module.delete({
      where: { id: moduleId },
    });
};