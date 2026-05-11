import { prisma } from "../config/prisma";

export class RentalService {
  async createRental(data: { productId: string; renterId: string; startDate: string; endDate: string; totalPrice: number }) {
    return prisma.rental.create({
      data: {
        productId: data.productId,
        renterId: data.renterId,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        totalPrice: data.totalPrice,
        status: "pending",
      },
    });
  }

  async getMyRentals(userId: string) {
    return prisma.rental.findMany({
      where: { renterId: userId },
      include: {
        product: { include: { category: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getAllRentals() {
    return prisma.rental.findMany({
      include: {
        product: true,
        renter: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getStats() {
    const [rentalCount, totalRevenue] = await Promise.all([
      prisma.rental.count(),
      prisma.rental.aggregate({
        _sum: {
          totalPrice: true,
        },
      }),
    ]);

    return {
      totalBookings: rentalCount,
      totalRevenue: totalRevenue._sum.totalPrice || 0,
    };
  }
}

export const rentalService = new RentalService();
