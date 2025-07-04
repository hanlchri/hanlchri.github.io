
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
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 terminal-title animate-pulse">
          Hanley's Hood
        </h1>
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-10 font-mono h-12 sm:h-16 lg:h-20">
            {displayedText}
            <span className="animate-terminal-blink">_</span>
          </p>
          <Button asChild className="bg-tech-neon hover:bg-tech-neon/80 text-black font-mono text-base sm:text-lg md:text-xl py-4 sm:py-6 md:py-8 px-6 sm:px-8 md:px-10 font-bold">
            <Link to="/about">About</Link>
          </Button>
        </div>
        
        {/* Improved grid layout for all screen sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 lg:mt-20 w-full max-w-7xl px-4">
          <Link to="/java" className="floating-card group">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 group-hover:text-tech-purple transition-colors">Java</h3>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">Resources for Java programming and concepts</p>
          </Link>
          
          <Link to="/ap-cs" className="floating-card group">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 group-hover:text-tech-purple transition-colors">AP Computer Science</h3>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">Materials for AP Computer Science A course</p>
          </Link>
          
          <Link to="/gallery" className="floating-card group">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 group-hover:text-tech-purple transition-colors">Gallery</h3>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">Interactive examples, games, and student projects</p>
          </Link>
          
          <Link to="/references" className="floating-card group">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 group-hover:text-tech-purple transition-colors">References</h3>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">Useful links, resources and documentation</p>
          </Link>
          
          <Link to="/contact" className="floating-card group xl:col-span-1 sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 group-hover:text-tech-purple transition-colors">Contact</h3>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">Get in touch with Mr. Hanley</p>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
