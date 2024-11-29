import { prisma } from '../app';

// Assign a ModuleAction to a Role
export const assignModuleActionToRole = async (roleId: number, moduleActionId: number) => {
  const existingMapping = await prisma.moduleActionsRole.findUnique({
    where: {
      roleId_moduleActionId: { roleId, moduleActionId },
    },
  });

  if (existingMapping) {
    throw new Error('This ModuleAction is already assigned to the Role');
  }

  return prisma.moduleActionsRole.create({
    data: {
      roleId,
      moduleActionId,
    },
  });
};

// Get ModuleActions for a Role
export const getModuleActionsForRole = async (roleId: number) => {
  // return prisma.moduleActionsRole.findMany({
  //   include: {
  //     moduleAction: {
  //       include: {
  //         module: true, // Include module details
  //         action: true, // Include action details
  //       },
  //     },
  //   },
  // });
  return prisma.role.findMany({
    select: {
      id: true,
      name: true,
      moduleActionsRoles: {
        select: {
          moduleAction: {
            select: {
              module: {
                select: {
                  name: true,
                },
              },
              action: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });  
};

// Get Roles for a ModuleAction
export const getRolesForModuleAction = async (moduleActionId: number) => {
  return prisma.moduleActionsRole.findMany({
    where: { moduleActionId },
    include: {
      role: true, // Include role details
    },
  });
};

// Delete a Role-to-ModuleAction Mapping
export const deleteModuleActionRoleMapping = async (roleId: number, moduleActionId: number) => {
  const existingMapping = await prisma.moduleActionsRole.findUnique({
    where: {
      roleId_moduleActionId: { roleId, moduleActionId },
    },
  });

  if (!existingMapping) {
    throw new Error('Mapping not found');
  }

  return prisma.moduleActionsRole.delete({
    where: {
      id: existingMapping.id,
    },
  });
};
