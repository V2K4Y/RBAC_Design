import { Request, Response, NextFunction } from 'express';
import { prisma } from '../app';
import { verifyToken } from '../utils/jwtUtils';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ status: 'error', message: 'Authorization token is required' });
    return
  }

  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    const decoded = verifyToken(token);
    (req as any).user = decoded;

    const user = await prisma.user.findUnique({ where: { id: (decoded as any).id } });
    if (!user) {
      res.status(401).json({ status: 'error', message: 'Invalid token: User not found' });
      return
    }

    next();
  } catch (error) {
    res.status(401).json({ status: 'error', message: 'Invalid or expired token' });
    return
  }
};
