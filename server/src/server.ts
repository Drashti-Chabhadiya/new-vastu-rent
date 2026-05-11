import { app } from "./app";
import { connectPrisma } from "./config/prisma";

const start = async () => {
  try {
    await connectPrisma();
    await app.listen({ port: 4000, host: "0.0.0.0" });
    console.log("🚀 Server running on http://localhost:4000");
    console.log("🔐 Auth endpoints: http://localhost:4000/api/auth/**");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();