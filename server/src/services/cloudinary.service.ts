import { cloudinary } from '../config/cloudinary.js';

export class CloudinaryService {
  /**
   * Upload an image to Cloudinary
   * @param fileBuffer The file buffer or base64 string
   * @param folder The folder to store the image in (e.g., 'products', 'profiles')
   */
  async uploadImage(file: string, folder: string): Promise<{ url: string; publicId: string }> {
    try {
      const result = await cloudinary.uploader.upload(file, {
        folder: `vastu-rent/${folder}`,
        resource_type: 'auto',
      });
      
      return {
        url: result.secure_url,
        publicId: result.public_id,
      };
    } catch (error) {
      console.error('Cloudinary Upload Error:', error);
      throw new Error('Failed to upload image to Cloudinary');
    }
  }

  /**
   * Delete an image from Cloudinary
   * @param publicId The public ID of the image to delete
   */
  async deleteImage(publicId: string): Promise<void> {
    try {
      if (!publicId) return;
      
      const result = await cloudinary.uploader.destroy(publicId);
      
      if (result.result !== 'ok' && result.result !== 'not found') {
        console.warn('Cloudinary Delete Warning:', result);
      }
    } catch (error) {
      console.error('Cloudinary Delete Error:', error);
      // We don't necessarily want to throw here to avoid breaking the main flow
      // if the image is already gone or there's a temporary network issue.
    }
  }

  /**
   * Extract Public ID from a Cloudinary URL
   * Useful for deleting images when you only have the URL stored
   */
  extractPublicId(url: string): string | null {
    try {
      if (!url || !url.includes('cloudinary.com')) return null;
      
      // Cloudinary URL format: https://res.cloudinary.com/[cloud_name]/image/upload/v[version]/[public_id].[ext]
      const parts = url.split('/');
      const uploadIndex = parts.findIndex(part => part === 'upload');
      if (uploadIndex === -1) return null;
      
      // Public ID is everything after the version (v1234567) or the upload index if no version
      const publicIdWithExt = parts.slice(uploadIndex + 2).join('/');
      const publicId = publicIdWithExt.split('.')[0];
      
      return publicId;
    } catch (error) {
      return null;
    }
  }
}

export const cloudinaryService = new CloudinaryService();
