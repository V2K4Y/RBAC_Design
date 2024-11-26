import bcrypt from 'bcrypt';
import {prisma} from '../app';
import { generateToken } from '../utils/jwtUtils';


// Sign Up Logic
export const signUpUser = async (username: string, email: string, password: string) => {
  // Check if a user already exists with the same email
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  // Check if the "User" role exists
  let userRole = await prisma.role.findUnique({
    where: { name: 'User' },
  });

  // If the "User" role does not exist, create it
  if (!userRole) {
    userRole = await prisma.role.create({
      data: {
        name: 'User', // Name of the role
      },
    });
  }

  // Assign the "User" role to the new user
  await prisma.userRole.create({
    data: {
      userId: newUser.id,
      roleId: userRole.id,
    },
  });

  // Generate a token for the new user
  const token = generateToken(newUser.id, newUser.username);

  // Fetch the roles assigned to the user
  const roles = await prisma.role.findMany({
    where: {
      users: {
        some: {
          userId: newUser.id,
        },
      },
    },
  });

  return {
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      roles: roles.map((role) => role.name),
    },
    token,
  };
};


// Login Logic
export const loginUser = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        roles: {
          select: {
            role: {
              select: {
                name: true, // Select only the role name
              },
            },
          },
        },
      },
    });
    if (!user) {
      throw new Error('Invalid email or password');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }
  
    const token = generateToken(user.id, user.username);

    // Extract role names from the user roles
    const roles = user.roles.map((userRole) => userRole.role.name);
    return { user: { id: user.id, username: user.username, email: user.email, roles }, token };

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Server Error!');
    } else {
      throw new Error('Server Error!');
    }
  }
};
