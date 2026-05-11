import { FastifyInstance } from "fastify";
import { userController } from "../controllers/user.controller";
import { auth } from "../config/auth";

export async function userRoutes(fastify: FastifyInstance) {
  // Admin Routes (Prefixed with /api/admin/users in app.ts)
  fastify.addHook("preHandler", async (request, reply) => {
    const session = await auth.api.getSession({ headers: request.headers as any });
    if (!session || (session.user.role !== "admin" && session.user.role !== "superAdmin")) {
      return reply.status(403).send({ message: "Forbidden: Admin access required" });
    }
  });

  fastify.get("/", userController.getAllUsers);
  fastify.get("/recent", userController.getRecentUsers);
  fastify.post("/:id/ban", userController.banUser);
  fastify.post("/:id/role", userController.updateUserRole);
  fastify.delete("/:id", userController.deleteUser);
}
