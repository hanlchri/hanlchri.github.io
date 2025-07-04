
import galleryConfig from '@/config/galleryItems.json';
import { GalleryItem, GalleryConfig } from '@/types/gallery';

export class GalleryManager {
  private static config: GalleryConfig = galleryConfig;

  static getAllItems(): GalleryItem[] {
    return this.config.items;
  }

  static getItemBySlug(slug: string): GalleryItem | undefined {
    return this.config.items.find(item => item.slug === slug);
  }

  static getItemsByType(type: string): GalleryItem[] {
    return this.config.items.filter(item => item.type === type);
  }

  static getItemsByCategory(category: string): GalleryItem[] {
    return this.config.items.filter(item => item.category === category);
  }

  // Helper method to generate download URL
  static getDownloadUrl(item: GalleryItem): string {
    return `/gallery/files/${item.fileName}`;
  }

  // Helper method to check if item needs build process
  static requiresBuild(item: GalleryItem): boolean {
    return item.buildRequired;
  }

  // Search functionality
  static searchItems(query: string): GalleryItem[] {
    const searchTerm = query.toLowerCase();
    return this.config.items.filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.type.toLowerCase().includes(searchTerm) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
  }
}
