import {prisma} from '../app';

// Assign a Role to a User
export const assignRoleToUser = async (userId: number, roleId: number) => {
  const existingMapping = await prisma.userRole.findUnique({
    where: {
      userId_roleId: { userId, roleId },
    },
  });

  if (existingMapping) {
    throw new Error('Role is already assigned to this user');
  }

  return prisma.userRole.create({
    data: {
      userId,
      roleId,
    },
  });
};

// Get Roles for a User
export const getRolesForUser = async (userId: number) => {
  return prisma.userRole.findMany({
    where: { userId },
    include: {
      role: true, // Include role details
    },
  });
};

// Get Users for a Role
export const getUsersForRole = async (roleId: number) => {
  return prisma.userRole.findMany({
    where: { roleId },
    include: {
      user: true, // Include user details
    },
  });
};

// Remove a Role from a User
export const removeRoleFromUser = async (userId: number, roleId: number) => {
  const existingMapping = await prisma.userRole.findUnique({
    where: {
      userId_roleId: { userId, roleId },
    },
  });

  if (!existingMapping) {
    throw new Error('Role is not assigned to this user');
  }

  return prisma.userRole.delete({
    where: {
      id: existingMapping.id,
    },
  });
};
