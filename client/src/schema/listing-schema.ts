import { z } from "zod";

export const listingSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title too long"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be a positive number"),
  location: z.string().min(2, "Location is required"),
  categoryId: z.string().min(1, "Please select a category"),
  ownerId: z.string().min(1, "Please assign an owner"),
  images: z.array(z.string()).min(1, "At least one image is required"),
});

export type ListingSchema = z.infer<typeof listingSchema>;
