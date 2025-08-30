
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

const Index = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [watermarkText, setWatermarkText] = useState('');
  const fullText = "Computer Science resources for Java and AP Computer Science students";
  const watermarkFullText = "Created by Hassaan Vani, Class of 2027";
  const [characterIndex, setCharacterIndex] = useState(0);
  const [watermarkIndex, setWatermarkIndex] = useState(0);
  const [showWatermark, setShowWatermark] = useState(false);
  
  useEffect(() => {
    if (characterIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[characterIndex]);
        setCharacterIndex(characterIndex + 1);
      }, 50); // Speed of typing effect
      
      return () => clearTimeout(timer);
    } else if (!showWatermark) {
      // Start watermark typing after a brief pause
      const timer = setTimeout(() => {
        setShowWatermark(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [characterIndex, fullText, showWatermark]);

  useEffect(() => {
    if (showWatermark && watermarkIndex < watermarkFullText.length) {
      const timer = setTimeout(() => {
        setWatermarkText(prev => prev + watermarkFullText[watermarkIndex]);
        setWatermarkIndex(watermarkIndex + 1);
      }, 30); // Slightly faster for watermark
      
      return () => clearTimeout(timer);
    }
  }, [watermarkIndex, watermarkFullText, showWatermark]);
  
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 terminal-title animate-pulse">
          Hanley's Hood
        </h1>
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-4 font-mono min-h-[3rem] sm:h-16">
            {displayedText}
            {characterIndex < fullText.length && <span className="animate-terminal-blink">_</span>}
          </p>
          <p className="text-xs text-muted-foreground/70 mb-8 sm:mb-10 font-mono min-h-[1rem] px-2">
            {watermarkText}
            {showWatermark && watermarkIndex < watermarkFullText.length && <span className="animate-terminal-blink">_</span>}
          </p>
          <Button asChild className="bg-tech-neon hover:bg-tech-neon/80 text-black font-mono text-base sm:text-lg py-4 sm:py-6 px-6 sm:px-8 font-bold">
            <Link to="/about">About</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mt-12 sm:mt-20 w-full max-w-7xl px-4">
          <Link to="/java" className="floating-card group">
            <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-tech-purple transition-colors">Java</h3>
            <p className="text-sm sm:text-base text-muted-foreground">Resources for Java programming and concepts</p>
          </Link>
          
          <Link to="/ap-cs" className="floating-card group">
            <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-tech-purple transition-colors">AP Computer Science</h3>
            <p className="text-sm sm:text-base text-muted-foreground">Materials for AP Computer Science A course</p>
          </Link>
          
          <Link to="/gallery" className="floating-card group">
            <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-tech-purple transition-colors">Gallery</h3>
            <p className="text-sm sm:text-base text-muted-foreground">Interactive examples, games, and student projects</p>
          </Link>
          
          <Link to="/references" className="floating-card group">
            <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-tech-purple transition-colors">References</h3>
            <p className="text-sm sm:text-base text-muted-foreground">Useful links, resources and documentation</p>
          </Link>
          
          <Link to="/contact" className="floating-card group xl:col-span-1 sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-tech-purple transition-colors">Contact</h3>
            <p className="text-sm sm:text-base text-muted-foreground">Get in touch with Mr. Hanley</p>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
