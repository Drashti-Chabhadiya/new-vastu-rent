import { FastifyInstance } from "fastify";
import { uploadController } from "../controllers/upload.controller";

export async function uploadRoutes(app: FastifyInstance) {
  // We'll need a middleware to check authentication for profile uploads
  // For now, we'll assume the user is authenticated if they hit this route
  // Better Auth stores session in cookies which Fastify can read.
  
  app.post("/profile", uploadController.uploadProfileImage);
  app.post("/product", uploadController.uploadProductImage);
}
