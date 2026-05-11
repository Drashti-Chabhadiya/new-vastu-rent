import { FastifyInstance } from "fastify";
import { rentalController } from "../controllers/rental.controller";
import { auth } from "../config/auth";

export async function rentalRoutes(fastify: FastifyInstance) {
  // Protected Routes
  fastify.addHook("preHandler", async (request, reply) => {
    const session = await auth.api.getSession({ headers: request.headers as any });
    if (!session) return reply.status(401).send({ message: "Unauthorized" });
    (request as any).user = session.user;
  });

  fastify.post("/", rentalController.createRental);
  fastify.get("/my", rentalController.getMyRentals);

  // Admin Only
  fastify.get("/all", {
    preHandler: async (request, reply) => {
      const session = await auth.api.getSession({ headers: request.headers as any });
      if (!session || (session.user.role !== "admin" && session.user.role !== "superAdmin")) {
        return reply.status(403).send({ message: "Forbidden: Admin access required" });
      }
    }
  }, rentalController.getAllRentals);
}
