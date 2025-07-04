
export interface GalleryItem {
  title: string;
  description: string;
  type: string;
  slug: string;
  fileName: string;
  category?: 'game' | 'demo' | 'educational' | 'interactive';
  tags?: string[];
  createdDate?: string;
  lastUpdated?: string;
}

export interface GalleryConfig {
  items: GalleryItem[];
}
