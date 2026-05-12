import { FastifyInstance } from "fastify";
import { rentalController } from "../controllers/rental.controller";
import { auth } from "../config/auth";

export async function rentalRoutes(fastify: FastifyInstance) {
  // Protected Routes (Session check)
  fastify.addHook("preHandler", async (request, reply) => {
    const session = await auth.api.getSession({ headers: request.headers as any });
    if (!session) return reply.status(401).send({ message: "Unauthorized" });
    (request as any).user = session.user;
  });

  fastify.post("/", rentalController.createRental);
  fastify.get("/my", rentalController.getMyRentals);
  fastify.get("/orders", rentalController.getOrders);
  fastify.get("/all", rentalController.getAllRentals);
  fastify.patch("/:id/status", rentalController.updateStatus);
}
