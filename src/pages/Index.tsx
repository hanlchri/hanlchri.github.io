import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

const Index = () => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = "Computer Science resources for Java and AP Computer Science students";
  const [characterIndex, setCharacterIndex] = useState(0);
  
  useEffect(() => {
    if (characterIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[characterIndex]);
        setCharacterIndex(characterIndex + 1);
      }, 50); // Speed of typing effect
      
      return () => clearTimeout(timer);
    }
  }, [characterIndex, fullText]);
  
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 terminal-title animate-pulse">
          Hanley's Hood
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl mb-10 font-mono h-16">
            {displayedText}
            <span className="animate-terminal-blink">_</span>
          </p>
          <Button asChild className="bg-tech-neon hover:bg-tech-neon/80 text-black font-mono text-lg py-6 px-8 font-bold">
            <Link to="/about">About</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <Link to="/java" className="floating-card group">
            <h3 className="text-xl font-bold mb-2 group-hover:text-tech-purple transition-colors">Java</h3>
            <p className="text-muted-foreground">Resources for Java programming and concepts</p>
          </Link>
          
          <Link to="/ap-cs" className="floating-card group">
            <h3 className="text-xl font-bold mb-2 group-hover:text-tech-purple transition-colors">AP Computer Science</h3>
            <p className="text-muted-foreground">Materials for AP Computer Science A course</p>
          </Link>
          
          <Link to="/gallery" className="floating-card group">
            <h3 className="text-xl font-bold mb-2 group-hover:text-tech-purple transition-colors">Gallery</h3>
            <p className="text-muted-foreground">Interactive examples, games, and student projects</p>
          </Link>
          
          <Link to="/references" className="floating-card group">
            <h3 className="text-xl font-bold mb-2 group-hover:text-tech-purple transition-colors">References</h3>
            <p className="text-muted-foreground">Useful links, resources and documentation</p>
          </Link>
          
          <Link to="/contact" className="floating-card group">
            <h3 className="text-xl font-bold mb-2 group-hover:text-tech-purple transition-colors">Contact</h3>
            <p className="text-muted-foreground">Get in touch with Mr. Hanley</p>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
