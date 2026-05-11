import { FastifyRequest, FastifyReply } from "fastify";
import { rentalService } from "../services/rental.service";

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
    const rentals = await rentalService.getAllRentals();
    return { rentals };
  }
}

export const rentalController = new RentalController();
