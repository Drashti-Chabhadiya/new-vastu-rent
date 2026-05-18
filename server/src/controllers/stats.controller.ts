import { FastifyRequest, FastifyReply } from "fastify";
import { userService } from "../services/user.service.js";
import { productService } from "../services/product.service.js";
import { rentalService } from "../services/rental.service.js";

export class StatsController {
  async getDashboardStats(request: FastifyRequest, reply: FastifyReply) {
    try {
      const [users, products, rentalStats] = await Promise.all([
        userService.getAllUsers({}),
        productService.getAllProducts({}),
        rentalService.getStats(),
      ]);

      return {
        stats: {
          totalUsers: users.length,
          totalListings: products.length,
          totalBookings: rentalStats.totalBookings,
          totalRevenue: rentalStats.totalRevenue,
        }
      };
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export const statsController = new StatsController();
