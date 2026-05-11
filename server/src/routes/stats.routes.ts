import { FastifyInstance } from "fastify";
import { statsController } from "../controllers/stats.controller";
import { auth } from "../config/auth";

export async function statsRoutes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", async (request, reply) => {
    const session = await auth.api.getSession({ headers: request.headers as any });
    if (!session || (session.user.role !== "admin" && session.user.role !== "superAdmin")) {
      return reply.status(403).send({ message: "Forbidden: Admin access required" });
    }
  });

  fastify.get("/", statsController.getDashboardStats);
}
