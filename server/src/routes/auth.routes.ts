import { auth } from "../config/auth.js";
import { FastifyInstance } from "fastify";

export async function authRoutes(app: FastifyInstance) {
  app.all("/*", async (request, reply) => {
    const url = `${request.protocol}://${request.hostname}${request.url}`;
    
    // Convert Fastify body to a string payload for the Web Standard Request
    let body = undefined;
    if (request.method !== "GET" && request.method !== "HEAD" && request.body) {
      body = typeof request.body === "string" ? request.body : JSON.stringify(request.body);
    }

    const req = new Request(url, {
      method: request.method,
      headers: request.headers as any,
      body,
    });

    const response = await auth.handler(req);
    
    reply.status(response.status);
    response.headers.forEach((value: any, key: any) => {
      reply.header(key, value);
    });
    
    return reply.send(await response.text());
  });
}