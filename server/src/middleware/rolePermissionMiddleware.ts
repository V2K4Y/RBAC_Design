import { Request, Response, NextFunction } from 'express';
import { prisma } from '../app';

export const rolePermissionMiddleware = (moduleName: string, actionName: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user.id;

    try {
      // Getting users roles and permission
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

      // Verifying if user have sufficient permission.
      const hasPermission = userRoles?.role.moduleActionsRoles.some(
        (moduleActionsRole) =>
          moduleActionsRole.moduleAction.module.name === moduleName &&
          moduleActionsRole.moduleAction.action.name === actionName
      )

      if (!hasPermission) {
        res.status(403).json({ status: 'error', message: 'Access denied: Insufficient permissions' });
        return
      }

      next();
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Error checking permissions', error: (error as any).message });
      return 
    }
  };
};
