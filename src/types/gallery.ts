
export interface GalleryItem {
  title: string;
  description: string;
  type: string;
  slug: string;
  fileName?: string; // Optional for file downloads
  externalUrl?: string; // For external links
  internalPath?: string; // For internal page links
  linkType: 'file' | 'external' | 'internal'; // Type of link
  category?: 'game' | 'demo' | 'educational' | 'interactive';
  tags?: string[];
  createdDate?: string;
  lastUpdated?: string;
}

export interface GalleryConfig {
  items: GalleryItem[];
}
