
export interface GalleryItem {
  title: string;
  description: string;
  type: string;
  slug: string;
  fileName: string;
  buildRequired?: boolean; // Made optional since it's no longer needed
  category?: 'game' | 'demo' | 'educational' | 'interactive';
  tags?: string[];
  createdDate?: string;
  lastUpdated?: string;
}

export interface GalleryConfig {
  items: GalleryItem[];
}
