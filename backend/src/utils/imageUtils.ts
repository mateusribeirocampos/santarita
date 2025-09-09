/**
 * Utility functions for handling image URLs
 */

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

/**
 * Converts a relative image path to an absolute URL
 * @param imagePath - The relative path (e.g., "/uploads/image-123.jpg") or null/undefined
 * @returns The absolute URL or null
 */
export function getAbsoluteImageUrl(imagePath: string | null | undefined): string | null {
  if (!imagePath) {
    return null;
  }
  
  // If already absolute URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If relative path, convert to absolute
  if (imagePath.startsWith('/uploads/')) {
    return `${BACKEND_URL}${imagePath}`;
  }
  
  // Invalid path
  return null;
}

/**
 * Transforms event/news objects to include absolute image URLs
 */
export function transformImageUrls<T extends { image?: string | null }>(item: T): T {
  if (!item.image) {
    return item;
  }
  
  return {
    ...item,
    image: getAbsoluteImageUrl(item.image)
  };
}

/**
 * Transforms array of event/news objects to include absolute image URLs
 */
export function transformImageUrlsArray<T extends { image?: string | null }>(items: T[]): T[] {
  return items.map(transformImageUrls);
}