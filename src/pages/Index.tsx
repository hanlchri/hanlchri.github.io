
import React from 'react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Index = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <Layout>
      <motion.div 
        className="flex flex-col items-center justify-center min-h-[80vh] text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 font-mono text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-tech-cyan animate-float">
            Hanley's Hood
          </h1>
        </motion.div>
        
        <motion.div variants={item} className="max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl mb-10 text-foreground/90 font-sans">
            Computer Science resources for Java and AP Computer Science students
          </p>
        </motion.div>
        
        <motion.div variants={item}>
          <Button asChild className="bg-green-500 hover:bg-green-600 text-white text-lg py-6 px-8 font-mono">
            <Link to="/about">About</Link>
          </Button>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <Link to="/java" className="floating-card group hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <h3 className="text-xl font-bold mb-2 group-hover:text-green-500 transition-colors font-mono">Java</h3>
              <p className="text-muted-foreground font-sans">Resources for Java programming and concepts</p>
            </Link>
          </motion.div>
          
          <motion.div variants={item}>
            <Link to="/ap-cs" className="floating-card group hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <h3 className="text-xl font-bold mb-2 group-hover:text-green-500 transition-colors font-mono">AP Computer Science</h3>
              <p className="text-muted-foreground font-sans">Materials for AP Computer Science A course</p>
            </Link>
          </motion.div>
          
          <motion.div variants={item}>
            <Link to="/references" className="floating-card group hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <h3 className="text-xl font-bold mb-2 group-hover:text-green-500 transition-colors font-mono">References</h3>
              <p className="text-muted-foreground font-sans">Useful links, resources and documentation</p>
            </Link>
          </motion.div>
          
          <motion.div variants={item}>
            <Link to="/contact" className="floating-card group hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <h3 className="text-xl font-bold mb-2 group-hover:text-green-500 transition-colors font-mono">Contact</h3>
              <p className="text-muted-foreground font-sans">Get in touch with Mr. Hanley</p>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default Index;
