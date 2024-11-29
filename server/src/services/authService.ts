import bcrypt from 'bcrypt';
import {prisma} from '../app';
import { generateToken } from '../utils/jwtUtils';


// Sign Up Logic
export const signUpUser = async (username: string, email: string, password: string) => {

  const ROLE_ADMIN = "Admin";
  const ROLE_USER = "User";
  
  // Check if the user if first to register an if yes then the user already exists with the same email
  return await prisma.$transaction( async (prisma) => {
    const userCount = await prisma.user.count();
    const roleName = userCount === 0 ? ROLE_ADMIN : ROLE_USER;
    if(userCount !== 0) {
      const existingUser = await prisma.user.findUnique({
        where: {email},
        select: {
          id: true,
          email: true,
          username: true,
        }
      })
      if(existingUser) {
        throw new Error('User already exists with this email')
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user
    const userDetails = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
      }
    })

    let roleDetails = await prisma.role.findUnique({
      where: {name: roleName},
      select: {id: true, name: true}
    })

    if(!roleDetails) {
      roleDetails = await prisma.role.create({
        data: {
          name: roleName,
        }
      })
    }

    await prisma.userRole.create({
      data: {
        userId: userDetails.id,
        roleId: roleDetails.id,
      }
    })

    const role = await prisma.role.findMany({
      where: {
        users: {
          some: {
            userId: userDetails.id,
          }
        }
      },
      select: {
        name: true,
      }
    })
    const token = generateToken(userDetails.id, userDetails.username);

    return {
      user: {
        id: userDetails.id,
        username: userDetails.username,
        email: userDetails.email,
        roles: role.map((r) => r.name)
      },
      token
    }
  })
};


// Login Logic
export const loginUser = async (email: string, password: string) => {
  try {

    // Although this query is efficient for small database but may take latency issue for large database so we'll different approach for larger databases
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

export const status = async (userId: number) => {
  return await prisma.user.findUnique({
    where: {id: userId},
    select: {
      username: true,
      roles: {
        select: {
          role: {
            select: {
              name: true,
            }
          }
        }
      }
    }
  })
}