import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secretkey';

export const generateToken = (id: number, name: string) => {
  return jwt.sign({ id, name }, secret, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};
