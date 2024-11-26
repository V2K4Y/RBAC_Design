import { prisma } from '../app';

export const createRole = async (name: string, description?: string) => {
  const existingRole = await prisma.role.findUnique({ where: { name } });
  if (existingRole) {
    throw new Error('Role already exists with this name');
  }

  return prisma.role.create({
    data: { name, description },
  });
};

export const getAllRoles = async () => {
  return prisma.role.findMany({
    select: {
      id: true,
      name: true,
      description: true,
    },
  });
};

export const deleteRole = async (roleId: number) => {
  const existingRole = await prisma.role.findUnique({ where: { id: roleId } });
  if (!existingRole) {
    throw new Error('Role not found');
  }

  return prisma.role.delete({ where: { id: roleId } });
};
