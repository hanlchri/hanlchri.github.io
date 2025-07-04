
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
    return 'bg-tech-purple/10 text-tech-purple';
  };

  return (
    <Layout>
      <GalleryBackground />
      <div className="max-w-7xl mx-auto mt-6 sm:mt-10 relative z-10 px-4">
        <div className="content-section">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center tech-text">
            Interactive Gallery
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-center mb-8 sm:mb-12 text-muted-foreground max-w-3xl mx-auto px-2">
            Explore interactive examples, games, and applications created for learning and demonstration
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
            {galleryItems.map((item) => (
              <Card key={item.slug} className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-background/80 backdrop-blur-sm border-tech-purple/20 flex flex-col h-full">
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start space-x-3 min-w-0 flex-1">
                      <div className="p-2 rounded-lg bg-tech-purple/10 text-tech-purple group-hover:bg-tech-purple group-hover:text-white transition-colors flex-shrink-0">
                        {getIcon(item.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-base sm:text-lg group-hover:text-tech-purple transition-colors leading-tight">
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
                      className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-tech-purple text-white hover:bg-tech-purple/80 h-10 px-4 py-2"
                    >
                      <Download className="h-4 w-4" />
                      {GalleryManager.requiresBuild(item) ? 'Download Source' : 'Download Demo'}
                    </a>
                    {GalleryManager.requiresBuild(item) && (
                      <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center">
                        <Code className="h-3 w-3 mr-1" />
                        Requires build process (npm/build tools needed)
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-secondary/30 rounded-lg border border-tech-purple/20">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-tech-cyan">Adding New Gallery Items</h2>
            <div className="space-y-3 sm:space-y-4 text-sm">
              <div>
                <h3 className="font-semibold text-tech-purple text-sm sm:text-base">Step 1: Add your files</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">Place your built files in <code className="bg-background px-2 py-1 rounded text-xs">/public/gallery/files/</code></p>
              </div>
              <div>
                <h3 className="font-semibold text-tech-purple text-sm sm:text-base">Step 2: Update configuration</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">Edit <code className="bg-background px-2 py-1 rounded text-xs">src/config/galleryItems.json</code> to add your new item</p>
              </div>
              <div>
                <h3 className="font-semibold text-tech-purple text-sm sm:text-base">Step 3: Deploy</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">Changes will automatically appear after deployment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;
