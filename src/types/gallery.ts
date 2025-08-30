
export interface GalleryItem {
  title: string;
  description: string;
  type: string;
  slug: string;
  link: string; // Universal link field - can be file path, external URL, or internal path
  category?: 'game' | 'demo' | 'educational' | 'interactive';
  tags?: string[];
  createdDate?: string;
  lastUpdated?: string;
}

export interface GalleryConfig {
  items: GalleryItem[];
}
