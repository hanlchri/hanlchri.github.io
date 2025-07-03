
import React from 'react';
import Layout from '@/components/Layout';
import GalleryBackground from '@/components/GalleryBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Play, Download, Code } from 'lucide-react';
import { GalleryManager } from '@/utils/galleryManager';

const Gallery = () => {
  const galleryItems = GalleryManager.getAllItems();

  const getIcon = (type: string) => {
    if (type.toLowerCase().includes('java')) return <Code className="h-6 w-6" />;
    if (type.toLowerCase().includes('javascript') || type.toLowerCase().includes('p5')) return <Play className="h-6 w-6" />;
    return <Play className="h-6 w-6" />;
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
      <div className="max-w-6xl mx-auto mt-10 relative z-10">
        <div className="content-section">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center tech-text">
            Interactive Gallery
          </h1>
          <p className="text-xl text-center mb-12 text-muted-foreground max-w-3xl mx-auto">
            Explore interactive examples, games, and applications created for learning and demonstration
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <Card key={item.slug} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-background/80 backdrop-blur-sm border-tech-purple/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-lg bg-tech-purple/10 text-tech-purple group-hover:bg-tech-purple group-hover:text-white transition-colors">
                        {getIcon(item.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-tech-purple transition-colors">
                          {item.title}
                        </CardTitle>
                        <div className={`text-sm font-mono px-2 py-1 rounded-full inline-block mt-1 ${getBadgeColor(item.type)}`}>
                          {item.type}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 text-muted-foreground">
                    {item.description}
                  </CardDescription>
                  <div className="flex space-x-2">
                    <Button
                      as="a"
                      href={GalleryManager.getDownloadUrl(item)}
                      download
                      className="flex-1 bg-tech-purple hover:bg-tech-purple/80"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {GalleryManager.requiresBuild(item) ? 'Download Source' : 'Download Demo'}
                    </Button>
                  </div>
                  {GalleryManager.requiresBuild(item) && (
                    <p className="text-xs text-muted-foreground mt-2 flex items-center">
                      <Code className="h-3 w-3 mr-1" />
                      Requires build process (npm/build tools needed)
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-6 bg-secondary/30 rounded-lg border border-tech-purple/20">
            <h2 className="text-2xl font-bold mb-4 text-tech-cyan">Adding New Gallery Items</h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold text-tech-purple">Step 1: Add your files</h3>
                <p className="text-muted-foreground">Place your built files in <code className="bg-background px-2 py-1 rounded">/public/gallery/files/</code></p>
              </div>
              <div>
                <h3 className="font-semibold text-tech-purple">Step 2: Update configuration</h3>
                <p className="text-muted-foreground">Edit <code className="bg-background px-2 py-1 rounded">src/config/galleryItems.json</code> to add your new item</p>
              </div>
              <div>
                <h3 className="font-semibold text-tech-purple">Step 3: Deploy</h3>
                <p className="text-muted-foreground">Changes will automatically appear after deployment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;
