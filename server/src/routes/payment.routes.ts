import { FastifyInstance } from "fastify";
import { paymentController } from "../controllers/payment.controller";
import { auth } from "../config/auth";

export async function paymentRoutes(fastify: FastifyInstance) {
  const authHandler = async (request: any, reply: any) => {
    const session = await auth.api.getSession({ headers: request.headers as any });
    if (!session) return reply.status(401).send({ message: "Unauthorized" });
    request.user = session.user;
  };

  fastify.post("/create-order", { preHandler: [authHandler] }, paymentController.createOrder);
  fastify.post("/verify-payment", { preHandler: [authHandler] }, paymentController.verifyPayment);
}
