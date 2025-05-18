
import React from 'react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 tech-text animate-float">
          Hanley's Hood
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl mb-10 text-foreground/90">
            Computer Science resources for Java and AP Computer Science students
          </p>
          <Button asChild className="bg-tech-purple hover:bg-tech-purple/80 text-white text-lg py-6 px-8">
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
