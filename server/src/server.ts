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

// import { app } from "./app";
// import { connectPrisma } from "./config/prisma";

// const start = async () => {
//   try {
//     await connectPrisma();
//     // Only listen if NOT on Vercel
//     if (process.env.NODE_ENV !== 'production') {
//        await app.listen({ port: 4000, host: "0.0.0.0" });
//     }
//   } catch (err) {
//     app.log.error(err);
//     process.exit(1);
//   }
// };

// start();

// // Export the app for Vercel
// export default async (req: any, res: any) => {
//   await app.ready();
//   app.server.emit('request', req, res);
// }
