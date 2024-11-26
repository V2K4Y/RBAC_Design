import bcrypt from 'bcrypt';
import {prisma} from '../app';
import { generateToken } from '../utils/jwtUtils';


// Sign Up Logic
export const signUpUser = async (username: string, email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  const token = generateToken(newUser.id, newUser.username);
  return { user: { id: newUser.id, username: newUser.username, email: newUser.email }, token };
};


// Login Logic
export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user.id, user.username);
  return { user: { id: user.id, username: user.username, email: user.email }, token };
};
