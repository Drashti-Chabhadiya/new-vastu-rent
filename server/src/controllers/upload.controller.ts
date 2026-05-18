import { FastifyRequest, FastifyReply } from "fastify";
import { cloudinaryService } from "../services/cloudinary.service.js";
import { prisma } from "../config/prisma.js";

export class UploadController {
  async uploadProfileImage(request: FastifyRequest, reply: FastifyReply) {
    try {
      const data = await request.file();
      if (!data) return reply.status(400).send({ message: "No file uploaded" });

      const buffer = await data.toBuffer();
      const base64 = `data:${data.mimetype};base64,${buffer.toString('base64')}`;
      
      const { url } = await cloudinaryService.uploadImage(base64, 'profiles');
      
      const userId = (request as any).user?.id;
      if (!userId) return reply.status(401).send({ message: "Unauthorized" });

      // Get old image to delete it
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (user?.image) {
        const oldPublicId = cloudinaryService.extractPublicId(user.image);
        if (oldPublicId) {
          await cloudinaryService.deleteImage(oldPublicId);
        }
      }

      // Update user with new image
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { image: url },
      });

      return { url, user: updatedUser };
    } catch (error: any) {
      console.error('Upload Error:', error);
      return reply.status(500).send({ message: error.message || "Internal server error" });
    }
  }

  async uploadProductImage(request: FastifyRequest, reply: FastifyReply) {
    try {
      const data = await request.file();
      if (!data) return reply.status(400).send({ message: "No file uploaded" });

      const buffer = await data.toBuffer();
      const base64 = `data:${data.mimetype};base64,${buffer.toString('base64')}`;
      
      const { url } = await cloudinaryService.uploadImage(base64, 'products');
      return { url };
    } catch (error: any) {
      return reply.status(500).send({ message: "Upload failed" });
    }
  }
}

export const uploadController = new UploadController();
