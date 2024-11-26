import { Request, Response, NextFunction } from 'express';
import { prisma } from '../app';

export const rolePermissionMiddleware = (moduleName: string, actionName: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user.id;

    try {
      const userRoles = await prisma.userRole.findUnique({
        where: { id: userId },
        include: {
          role: {
            include: {
              moduleActionsRoles: {
                include: {
                  moduleAction: {
                    include: {
                      module: true,
                      action: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const hasPermission = userRoles?.role.moduleActionsRoles.some(
        (moduleActionsRole) =>
          moduleActionsRole.moduleAction.module.name === moduleName &&
          moduleActionsRole.moduleAction.action.name === actionName
      )

      if (!hasPermission) {
        return res.status(403).json({ status: 'error', message: 'Access denied: Insufficient permissions' });
      }

      next();
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Error checking permissions', error: (error as any).message });
    }
  };
};
