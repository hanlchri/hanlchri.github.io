import { GalleryItem, GalleryConfig } from '@/types/gallery';

export class GalleryManager {
  private static config: GalleryConfig | null = null;
  private static loadingPromise: Promise<GalleryConfig> | null = null;

  private static async loadConfig(): Promise<GalleryConfig> {
    if (this.config) {
      return this.config;
    }

    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = fetch('/galleryItems.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load gallery config: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.config = data;
        this.loadingPromise = null;
        return data;
      })
      .catch(error => {
        this.loadingPromise = null;
        throw error;
      });

    return this.loadingPromise;
  }

  static async getAllItems(): Promise<GalleryItem[]> {
    const config = await this.loadConfig();
    return config.items;
  }

  static async getItemBySlug(slug: string): Promise<GalleryItem | undefined> {
    const config = await this.loadConfig();
    return config.items.find(item => item.slug === slug);
  }

  static async getItemsByType(type: string): Promise<GalleryItem[]> {
    const config = await this.loadConfig();
    return config.items.filter(item => item.type === type);
  }

  static async getItemsByCategory(category: string): Promise<GalleryItem[]> {
    const config = await this.loadConfig();
    return config.items.filter(item => item.category === category);
  }

  // Helper method to generate appropriate URL based on link type
  static getItemUrl(item: GalleryItem): string {
    switch (item.linkType) {
      case 'file':
        return `/gallery/files/${item.fileName}`;
      case 'external':
        return item.externalUrl || '#';
      case 'internal':
        return item.internalPath || '#';
      default:
        return '#';
    }
  }

  // Legacy method for backward compatibility
  static getDownloadUrl(item: GalleryItem): string {
    return this.getItemUrl(item);
  }

  // Search functionality
  static async searchItems(query: string): Promise<GalleryItem[]> {
    const config = await this.loadConfig();
    const searchTerm = query.toLowerCase();
    return config.items.filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.type.toLowerCase().includes(searchTerm) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
  }

  // Optional: Method to refresh config (useful for development)
  static clearCache(): void {
    this.config = null;
    this.loadingPromise = null;
  }
}
