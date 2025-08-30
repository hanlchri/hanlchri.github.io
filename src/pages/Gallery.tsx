import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Code, Play } from 'lucide-react';
import { GalleryManager } from '@/utils/galleryManager';
import { GalleryItem } from '@/types/gallery';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGalleryItems = async () => {
      try {
        setLoading(true);
        const items = await GalleryManager.getAllItems();
        setGalleryItems(items);
      } catch (err) {
        console.error('Failed to load gallery items:', err);
        setError(err instanceof Error ? err.message : 'Failed to load gallery items');
      } finally {
        setLoading(false);
      }
    };

    loadGalleryItems();
  }, []);

  const getIcon = (type: string) => {
    if (type.toLowerCase().includes('java')) return <Code className="h-5 w-5 sm:h-6 sm:w-6" />;
    if (type.toLowerCase().includes('javascript') || type.toLowerCase().includes('p5')) return <Play className="h-5 w-5 sm:h-6 sm:w-6" />;
    return <Play className="h-5 w-5 sm:h-6 sm:w-6" />;
  };

  const getBadgeColor = (type: string) => {
    if (type.toLowerCase().includes('java')) return 'bg-orange-500/10 text-orange-500';
    if (type.toLowerCase().includes('javascript')) return 'bg-yellow-500/10 text-yellow-500';
    if (type.toLowerCase().includes('p5')) return 'bg-pink-500/10 text-pink-500';
    return 'bg-gallery-accent/10 text-gallery-accent';
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto mt-6 sm:mt-10 relative z-10 px-4">
        <div className="gallery-content-section">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center gallery-text">
            Interactive Gallery
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-center mb-8 sm:mb-12 text-muted-foreground max-w-3xl mx-auto px-2">
            Explore interactive examples, games, and applications created for learning and demonstration
          </p>
          
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gallery-accent"></div>
              <span className="ml-3 text-muted-foreground">Loading gallery...</span>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <div className="bg-red-500/10 text-red-500 px-4 py-3 rounded-lg inline-block">
                <p className="font-medium">Error loading gallery</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          {!loading && !error && galleryItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {galleryItems.map((item) => (
                <Card key={item.slug} className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-background/90 backdrop-blur-sm border-gallery-accent/20 flex flex-col h-full">
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start space-x-3 min-w-0 flex-1">
                        <div className="p-2 rounded-lg bg-gallery-accent/10 text-gallery-accent group-hover:bg-gallery-accent group-hover:text-white transition-colors flex-shrink-0">
                          {getIcon(item.type)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-base sm:text-lg group-hover:text-gallery-accent transition-colors leading-tight">
                            {item.title}
                          </CardTitle>
                          <div className={`text-xs sm:text-sm font-mono px-2 py-1 rounded-full inline-block mt-2 ${getBadgeColor(item.type)}`}>
                            {item.type}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <CardDescription className="mb-4 text-muted-foreground text-sm sm:text-base flex-1">
                      {item.description}
                    </CardDescription>
                    <div className="mt-auto">
                      {(() => {
                        const url = GalleryManager.getItemUrl(item);
                        const linkType = GalleryManager.getLinkType(item);
                        const isExternal = linkType === 'external';
                        const isFile = linkType === 'file';
                        
                        return isFile ? (
                          <a
                            href={url}
                            download
                            className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gallery-accent text-white hover:bg-gallery-accent/80 h-10 px-4 py-2"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </a>
                        ) : (
                          <a
                            href={url}
                            target={isExternal ? '_blank' : '_self'}
                            rel={isExternal ? 'noopener noreferrer' : undefined}
                            className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gallery-accent text-white hover:bg-gallery-accent/80 h-10 px-4 py-2"
                          >
                            <Play className="h-4 w-4" />
                            {isExternal ? 'Open Link' : 'View Page'}
                          </a>
                        );
                      })()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && !error && galleryItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No gallery items found</p>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground/50">Created by Hassaan Vani, Class of 2027</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;
