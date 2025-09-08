import { PrismaClient, User as PrismaUser } from '@prisma/client';
import { User, UserCreateInput } from '@/types';

const prisma = new PrismaClient();

export class UserRepository {
  async findByEmail(email: string): Promise<PrismaUser | null> {
    return await prisma.user.findUnique({
      where: { email }
    });
  }

  async findById(id: string): Promise<Omit<User, 'password'> | null> {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async create(userData: UserCreateInput & { password: string }): Promise<Omit<User, 'password'>> {
    return await prisma.user.create({
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async update(id: string, userData: Partial<User>): Promise<Omit<User, 'password'>> {
    return await prisma.user.update({
      where: { id },
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async delete(id: string): Promise<PrismaUser> {
    return await prisma.user.update({
      where: { id },
      data: { isActive: false }
    });
  }
}

export default new UserRepository();