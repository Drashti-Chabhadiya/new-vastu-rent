import { prisma } from "../config/prisma";

export class ProductService {
  async getAllProducts(filters: { search?: string; categoryId?: string; status?: string; minPrice?: string; maxPrice?: string; isAvailable?: boolean; ids?: string | string[] }) {
    const { search, categoryId, status, minPrice, maxPrice, isAvailable, ids } = filters;
    const where: any = {};

    if (ids) {
      const idArray = Array.isArray(ids) ? ids : ids.split(',');
      where.id = { in: idArray };
    }

    if (isAvailable !== undefined) where.isAvailable = isAvailable;
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (categoryId) where.categoryId = categoryId;
    if (status === 'available') where.isAvailable = true;
    if (status === 'unavailable') where.isAvailable = false;

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    return prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        owner: {
          select: { id: true, name: true, email: true, image: true },
        },
      },
    });
  }

  async getRecentProducts() {
    return prisma.product.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        owner: { select: { name: true } },
      },
    });
  }

  async getProductById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        owner: { select: { id: true, name: true, email: true, image: true } },
        reviews: {
          include: { user: { select: { name: true, image: true } } },
          orderBy: { createdAt: "desc" }
        }
      },
    });
  }

  async createProduct(data: any) {
    return prisma.product.create({
      data: {
        ...data,
        price: parseFloat(data.price),
        securityDeposit: data.securityDeposit ? parseFloat(data.securityDeposit) : 0,
        images: data.images || [],
        isAvailable: true,
      },
    });
  }

  async updateProduct(id: string, data: any, userId?: string, role?: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new Error("Product not found");

    if (userId && role && product.ownerId !== userId && role !== "admin" && role !== "superAdmin") {
      throw new Error("Forbidden: You do not own this listing");
    }

    return prisma.product.update({
      where: { id },
      data: {
        ...data,
        price: data.price ? parseFloat(data.price) : undefined,
      },
    });
  }

  async deleteProduct(id: string, userId?: string, role?: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new Error("Product not found");

    const isOwner = userId && product.ownerId === userId;
    const isSuperAdmin = role === "superAdmin";
    const isAdmin = role === "admin";

    if (!isOwner && !isSuperAdmin) {
      if (isAdmin) {
        throw new Error("Forbidden: Admin must request SuperAdmin approval to delete products they do not own");
      }
      throw new Error("Forbidden: You do not own this listing");
    }

    // Delete images from Cloudinary
    if (product.images && product.images.length > 0) {
      const { cloudinaryService } = await import("./cloudinary.service");
      for (const imageUrl of product.images) {
        const publicId = cloudinaryService.extractPublicId(imageUrl);
        if (publicId) {
          await cloudinaryService.deleteImage(publicId);
        }
      }
    }

    return prisma.product.delete({ where: { id } });
  }

  async toggleAvailability(id: string, isAvailable: boolean) {
    return prisma.product.update({
      where: { id },
      data: { isAvailable },
    });
  }

  async getOwnerListings(ownerId: string) {
    return prisma.product.findMany({
      where: { ownerId },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
  }
}

export const productService = new ProductService();
