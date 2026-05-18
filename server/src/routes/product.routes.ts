import { FastifyInstance } from "fastify";
import { productController } from "../controllers/product.controller.js";
import { auth } from "../config/auth.js";

export async function productRoutes(fastify: FastifyInstance) {
  // ─── Public Routes ──────────────────────────────────────────────────────────
  fastify.get("/", productController.getAllProducts);
  fastify.get("/recent", productController.getRecentProducts);
  fastify.get("/:id", productController.getProductById);

  // ─── Protected Routes (Requires Login) ──────────────────────────────────────
  const authHandler = async (request: any, reply: any) => {
    const session = await auth.api.getSession({ headers: request.headers as any });
    if (!session) return reply.status(401).send({ message: "Unauthorized" });
    request.user = session.user;
  };

  const ownerOrAdmin = async (request: any, reply: any) => {
    await authHandler(request, reply);
    const role = request.user.role;
    if (role !== "owner" && role !== "admin" && role !== "superAdmin") {
      return reply.status(403).send({ message: "Forbidden: Owner access required" });
    }
  };

  // Owner/Admin Management
  fastify.post("/", { preHandler: [ownerOrAdmin] }, productController.createProduct);
  fastify.get("/my-listings", { preHandler: [ownerOrAdmin] }, productController.getMyListings);
  fastify.put("/:id", { preHandler: [ownerOrAdmin] }, productController.updateProduct);
  fastify.delete("/:id", { preHandler: [ownerOrAdmin] }, productController.deleteProduct);
  
  // Admin Only
  fastify.post("/:id/available", {
    preHandler: async (request, reply) => {
      const session = await auth.api.getSession({ headers: request.headers as any });
      if (!session || (session.user.role !== "admin" && session.user.role !== "superAdmin")) {
        return reply.status(403).send({ message: "Forbidden: Admin access required" });
      }
    }
  }, productController.toggleAvailability);
}
