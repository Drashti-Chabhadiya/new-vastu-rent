import { app } from "./app.js"; 
import { connectPrisma } from "./config/prisma.js";
import awsLambdaFastify from "@fastify/aws-lambda";

// રનટાઈમ પર સર્વર લેસ ફંક્શન માટે હેન્ડલર
let proxy: any;

export const handler = async (event: any, context: any) => {
  if (!proxy) {
    // પહેલીવાર રન થાય ત્યારે ડેટાબેઝ કનેક્ટ કરો
    await connectPrisma();
    // Fastify ને Lambda-ready બનાવો
    proxy = awsLambdaFastify(app);
  }
  return proxy(event, context);
};

// લોકલ ડેવલપમેન્ટ માટે (npm run dev વખતે ચાલશે)
if (process.env.NODE_ENV !== "production") {
  const start = async () => {
    try {
      await connectPrisma();
      await app.listen({ port: 4000, host: "0.0.0.0" });
      console.log("🚀 Local server running on http://localhost:4000");
    } catch (err) {
      app.log.error(err);
      process.exit(1);
    }
  };
  start();
}

// Vercel માટે ડિફોલ્ટ એક્સપોર્ટ (જૂની રીત માટે બેકઅપ)
export default async (req: any, res: any) => {
  await app.ready();
  app.server.emit('request', req, res);
};
// import { app } from "./app";
// import { connectPrisma } from "./config/prisma";

// const start = async () => {
//   try {
//     await connectPrisma();
//     await app.listen({ port: 4000, host: "0.0.0.0" });
//     console.log("🚀 Server running on http://localhost:4000");
//     console.log("🔐 Auth endpoints: http://localhost:4000/api/auth/**");
//   } catch (err) {
//     app.log.error(err);
//     process.exit(1);
//   }
// };

// start();

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
