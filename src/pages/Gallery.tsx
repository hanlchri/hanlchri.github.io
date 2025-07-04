
import React from 'react';
import Layout from '@/components/Layout';
import GalleryBackground from '@/components/GalleryBackground';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Code, Play } from 'lucide-react';
import { GalleryManager } from '@/utils/galleryManager';

const Gallery = () => {
  const galleryItems = GalleryManager.getAllItems();

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
      <GalleryBackground />
      <div className="max-w-7xl mx-auto mt-6 sm:mt-10 relative z-10 px-4">
        <div className="gallery-content-section">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center gallery-text">
            Interactive Gallery
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-center mb-8 sm:mb-12 text-muted-foreground max-w-3xl mx-auto px-2">
            Explore interactive examples, games, and applications created for learning and demonstration
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {galleryItems.map((item) => (
              <Card key={item.slug} className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-background/95 backdrop-blur-sm border-gallery-accent/20 flex flex-col h-full">
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
                    <a
                      href={GalleryManager.getDownloadUrl(item)}
                      download
                      className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gallery-accent text-white hover:bg-gallery-accent/80 h-10 px-4 py-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Demo
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-secondary/30 rounded-lg border border-gallery-accent/20 max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gallery-secondary">Adding New Gallery Items</h2>
            <div className="space-y-3 sm:space-y-4 text-sm">
              <div>
                <h3 className="font-semibold text-gallery-accent text-sm sm:text-base">Step 1: Add your files</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">Place your files in <code className="bg-background px-2 py-1 rounded text-xs">/public/gallery/files/</code></p>
              </div>
              <div>
                <h3 className="font-semibold text-gallery-accent text-sm sm:text-base">Step 2: Update configuration</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">Edit <code className="bg-background px-2 py-1 rounded text-xs">src/config/galleryItems.json</code> to add your new item</p>
              </div>
              <div>
                <h3 className="font-semibold text-gallery-accent text-sm sm:text-base">Step 3: Deploy</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">Changes will automatically appear after deployment</p>
              </div>
            </div>
          </div>

          {/* Watermark */}
          <div className="mt-12 text-center">
            <p className="text-xs text-muted-foreground/50">Created by Hassaan Vani, Class of 2027</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;
