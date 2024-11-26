import { prisma } from "../app";

export const createUser = async (username: string, email: string, password: string, role: number) => {
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return {
          success: false,
          code: 401,
          message: "User already exists"
        };
      } else {
        await prisma.user.create({
          data: { username, email, password, },
          include: {
            roles: {
              
            }
          }
        });

        return {
          success: true,
          code: 201,
          message: "User create successfully"
        };
      }
  } catch (error) {
    console.log('Error while creating user: ', error);
    return {
      success: false,
      code: 500,
      message: "Internal server error"
    };
  }
};

export const getAllUsers = async () => {
    return await prisma.user.findMany({
      include: {
        roles: {
          select: {
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
}

export const editUser = async (userId: number, updatedFields: Partial<{ username: string; email: string; password: string; }>) => {
  return await prisma.user.update({
    where: { id: userId },
    data: updatedFields,
  });
};

export const assignRoleToUser = async (userId: number, roleId: number) => {
  return await prisma.userRole.create({
    data: { userId, roleId },
  });
};
