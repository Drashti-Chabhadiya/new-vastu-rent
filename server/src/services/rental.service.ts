import { prisma } from "../config/prisma";

export class RentalService {
  async createRental(data: { productId: string; renterId: string; startDate: string; endDate: string; totalPrice: number }) {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    // Check for overlapping rentals
    const overlappingRental = await prisma.rental.findFirst({
      where: {
        productId: data.productId,
        status: { not: "cancelled" },
        OR: [
          {
            // Case 1: New rental starts during an existing rental
            startDate: { lte: endDate },
            endDate: { gte: startDate },
          },
        ],
      },
    });

    if (overlappingRental) {
      throw new Error("This product is already booked for the selected dates.");
    }

    return prisma.rental.create({
      data: {
        productId: data.productId,
        renterId: data.renterId,
        startDate,
        endDate,
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
        product: { include: { category: true } },
        renter: { select: { name: true, email: true, image: true } },
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
  async getOwnerOrders(ownerId: string) {
    return prisma.rental.findMany({
      where: {
        product: { ownerId: ownerId }
      },
      include: {
        product: { include: { category: true } },
        renter: { select: { name: true, email: true, image: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async updateRentalStatus(id: string, status: string) {
    return prisma.rental.update({
      where: { id },
      data: { status },
      include: {
        product: true,
        renter: true,
      },
    });
  }
}

export const rentalService = new RentalService();
