import React from 'react';
import Layout from '@/components/Layout';
import GalleryBackground from '@/components/GalleryBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Play } from 'lucide-react';

const Gallery = () => {
  const examples = [
    {
      title: "P5.js Game",
      description: "A creative JavaScript game built with p5.js created by Mr. Hanley",
      type: "JavaScript/P5.js",
      slug: "p5-interactive-game"
    },
    {
      title: "Java Swing Example",
      description: "Java Swing example demonstrating GUI programming",
      type: "Java Swing",
      slug: "java-swing"
    },
  ];

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
            {examples.map((example) => (
              <Card key={example.slug} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-background/80 backdrop-blur-sm border-tech-purple/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-lg bg-tech-purple/10 text-tech-purple group-hover:bg-tech-purple group-hover:text-white transition-colors">
                        <Play className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-tech-purple transition-colors">
                          {example.title}
                        </CardTitle>
                        <div className="text-sm text-tech-cyan font-mono">
                          {example.type}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 text-muted-foreground">
                    {example.description}
                  </CardDescription>
                  <div className="flex space-x-2">
                    {/* Download file directly */}
                    <Button
                      as="a"
                      href={`/gallery/${example.slug}`}
                      download
                      className="flex-1 bg-tech-purple hover:bg-tech-purple/80"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Download Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;
