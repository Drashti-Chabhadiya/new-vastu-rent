import "dotenv/config";
import Fastify from "fastify";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import { authRoutes } from "./routes/auth.routes";
import { userRoutes } from "./routes/user.routes";
import { productRoutes } from "./routes/product.routes";
import { categoryRoutes } from "./routes/category.routes";
import { reviewRoutes } from "./routes/review.routes";
import { rentalRoutes } from "./routes/rental.routes";
import { statsRoutes } from "./routes/stats.routes";

import multipart from "@fastify/multipart";
import { uploadRoutes } from "./routes/upload.routes";
import { likeRoutes } from "./routes/like.routes";
import { deleteRequestRoutes } from "./routes/delete-request.routes";
import { paymentRoutes } from "./routes/payment.routes";

export const app = Fastify({ logger: true });

// ─── Plugins ─────────────────────────────────────────────────────────────────

app.register(cookie);
app.register(multipart, {
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

app.register(cors, {
  origin: process.env.CLIENT_URL ?? "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

// ─── Routes ──────────────────────────────────────────────────────────────────

// Better Auth
app.register(authRoutes, { prefix: "/api/auth" });

// Entity Routes
app.register(userRoutes, { prefix: "/api/admin/users" });
app.register(productRoutes, { prefix: "/api/products" });
app.register(categoryRoutes, { prefix: "/api/categories" });
app.register(reviewRoutes, { prefix: "/api/reviews" });
app.register(rentalRoutes, { prefix: "/api/rentals" });
app.register(statsRoutes, { prefix: "/api/admin/stats" });
app.register(uploadRoutes, { prefix: "/api/upload" });
app.register(likeRoutes, { prefix: "/api/likes" });
app.register(deleteRequestRoutes, { prefix: "/api/delete-requests" });
app.register(paymentRoutes, { prefix: "/api/payments" });

// Aliases for backward compatibility with the frontend
app.register(productRoutes, { prefix: "/api/admin/products" });
app.register(categoryRoutes, { prefix: "/api/admin/categories" });
app.register(reviewRoutes, { prefix: "/api/admin/reviews" });


// Legacy redirects
app.get("/api/my-rentals", async (req, reply) => reply.redirect("/api/rentals/my"));
app.get("/api/my-listings", async (req, reply) => reply.redirect("/api/products/my-listings"));