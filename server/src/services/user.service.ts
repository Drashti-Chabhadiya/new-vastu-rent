import { prisma } from "../config/prisma";

export class UserService {
  async getRecentUsers() {
    return prisma.user.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        image: true,
      },
    });
  }

  async getAllUsers(filters: { search?: string; role?: any; status?: string }) {
    const { search, role, status } = filters;
    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (role) where.role = role;
    if (status === 'banned') where.banned = true;
    if (status === 'active') where.banned = false;

    return prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        banned: true,
        createdAt: true,
        image: true,
        banReason: true,
      },
    });
  }

  async banUser(id: string, banned: boolean, reason?: string) {
    return prisma.user.update({
      where: { id },
      data: {
        banned: !!banned,
        banReason: reason || null,
      },
    });
  }

  async updateUserRole(id: string, role: any) {
    return prisma.user.update({
      where: { id },
      data: { role },
    });
  }

  async deleteUser(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (user?.image) {
      const { cloudinaryService } = await import("./cloudinary.service");
      const publicId = cloudinaryService.extractPublicId(user.image);
      if (publicId) {
        await cloudinaryService.deleteImage(publicId);
      }
    }
    return prisma.user.delete({ where: { id } });
  }

  async getUserById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }
}

export const userService = new UserService();
