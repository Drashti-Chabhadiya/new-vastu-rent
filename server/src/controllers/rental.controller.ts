import { FastifyRequest, FastifyReply } from "fastify";
import { rentalService } from "../services/rental.service.js";

export class RentalController {
  async createRental(request: FastifyRequest, reply: FastifyReply) {
    const userId = (request as any).user.id;
    const rental = await rentalService.createRental({ ...request.body as any, renterId: userId });
    return { rental };
  }

  async getMyRentals(request: FastifyRequest, reply: FastifyReply) {
    const userId = (request as any).user.id;
    const rentals = await rentalService.getMyRentals(userId);
    return { rentals };
  }

  async getAllRentals(request: FastifyRequest, reply: FastifyReply) {
    const user = (request as any).user;
    if (user.role !== "admin" && user.role !== "superAdmin") {
      return reply.status(403).send({ message: "Forbidden: Admin access required" });
    }
    const rentals = await rentalService.getAllRentals();
    return { rentals };
  }

  async getOrders(request: FastifyRequest, reply: FastifyReply) {
    const user = (request as any).user;
    
    // Check if user has permission (Owner, Admin, or SuperAdmin)
    if (user.role !== "admin" && user.role !== "superAdmin" && user.role !== "owner") {
      return reply.status(403).send({ message: "Forbidden: Access restricted to Owners and Admins" });
    }
    
    if (user.role === "admin" || user.role === "superAdmin") {
      const rentals = await rentalService.getAllRentals();
      return { rentals };
    }
    
    if (user.role === "owner") {
      const rentals = await rentalService.getOwnerOrders(user.id);
      return { rentals };
    }

    return { rentals: [] };
  }

  async updateStatus(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const { status } = request.body as { status: string };
    const user = (request as any).user;

    // Optional: Add logic to check if this user is the owner of the product
    // For now, allow admin/superAdmin/owner
    if (user.role !== "admin" && user.role !== "superAdmin" && user.role !== "owner") {
      return reply.status(403).send({ message: "Forbidden" });
    }

    const rental = await rentalService.updateRentalStatus(id, status);
    return { rental };
  }

  async getProductRentals(request: FastifyRequest, reply: FastifyReply) {
    const { productId } = request.params as { productId: string };
    const rentals = await rentalService.getProductRentals(productId);
    return { rentals };
  }
}

export const rentalController = new RentalController();
