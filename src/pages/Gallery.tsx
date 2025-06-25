
import React from 'react';
import Layout from '@/components/Layout';
import GalleryBackground from '@/components/GalleryBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Play, Code, Gamepad2, Palette, Calculator } from 'lucide-react';

const Gallery = () => {
  const examples = [
    {
      title: "P5.js Interactive Game",
      description: "A creative JavaScript game built with p5.js featuring dynamic graphics and user interaction",
      icon: <Gamepad2 className="h-6 w-6" />,
      type: "JavaScript/P5.js",
      link: "#",
      demo: true
    },
    {
      title: "Java Swing Calculator",
      description: "A fully functional calculator application built with Java Swing demonstrating GUI programming",
      icon: <Calculator className="h-6 w-6" />,
      type: "Java Swing",
      link: "#",
      demo: true
    },
    {
      title: "Interactive Art Canvas",
      description: "Digital art creation tool with brush effects, color mixing, and layer support",
      icon: <Palette className="h-6 w-6" />,
      type: "P5.js/Canvas",
      link: "#",
      demo: true
    },
    {
      title: "Sorting Algorithm Visualizer",
      description: "Visual representation of different sorting algorithms with step-by-step animation",
      icon: <Code className="h-6 w-6" />,
      type: "JavaScript",
      link: "#",
      demo: true
    },
    {
      title: "Physics Simulation",
      description: "Real-time physics engine demonstrating gravity, collisions, and particle systems",
      icon: <Play className="h-6 w-6" />,
      type: "P5.js",
      link: "#",
      demo: true
    },
    {
      title: "Data Structure Explorer",
      description: "Interactive visualization of trees, graphs, and other computer science data structures",
      icon: <Code className="h-6 w-6" />,
      type: "JavaScript",
      link: "#",
      demo: true
    }
  ];

  const handleDemoClick = (title: string) => {
    // For now, just show a placeholder - in a real implementation, 
    // these would link to actual demos or open in modals
    alert(`Opening ${title} demo...`);
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
            {examples.map((example, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-background/80 backdrop-blur-sm border-tech-purple/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-lg bg-tech-purple/10 text-tech-purple group-hover:bg-tech-purple group-hover:text-white transition-colors">
                        {example.icon}
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
                    <Button
                      onClick={() => handleDemoClick(example.title)}
                      className="flex-1 bg-tech-purple hover:bg-tech-purple/80"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Run Demo
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDemoClick(example.title)}
                      className="border-tech-purple/30 hover:bg-tech-purple/10"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <div className="bg-background/60 backdrop-blur-sm rounded-lg p-8 border border-tech-purple/20">
              <h2 className="text-2xl font-bold mb-4 tech-text">Want to Submit Your Own Project?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Students can showcase their programming projects here! Submit your Java Swing applications, 
                P5.js games, or other interactive examples to be featured in the gallery.
              </p>
              <Button className="bg-tech-neon hover:bg-tech-neon/80 text-black font-bold">
                Submit Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;
