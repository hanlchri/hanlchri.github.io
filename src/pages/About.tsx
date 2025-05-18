
import React from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10">
        <motion.div 
          className="content-section backdrop-blur-lg border border-purple-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-8 text-center font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-tech-cyan animate-crt-flicker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            About Chris Hanley
          </motion.h1>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="relative">
                <div className="absolute inset-0 border-2 border-purple-500/50 rounded-lg transform translate-x-4 translate-y-4"></div>
                <img 
                  src="/lovable-uploads/33ce3620-5527-4883-b107-ec91e1a2b3b2.png" 
                  alt="Chris Hanley" 
                  className="rounded-lg border-2 border-tech-purple shadow-lg shadow-tech-purple/20 w-full max-w-md mx-auto relative z-10"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10"></div>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="space-y-4 font-sans">
                <motion.p 
                  className="text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  Mr. Chris Hanley is a Java, AP Computer Science, and Digital Electronics teacher
                  at Shenendehowa High School. He has taught at Shen for 25 years.
                </motion.p>
                
                <motion.p 
                  className="text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                >
                  He attended Gordon College and majored in Math and Computer Science.
                </motion.p>
                
                <motion.p 
                  className="text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  Mr. Hanley enjoys playing tennis, Smash Ultimate, and Minecraft.
                </motion.p>
                
                <motion.div 
                  className="mt-6 p-4 rounded-lg bg-black/30 border border-purple-500/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                >
                  <h3 className="text-xl font-bold mb-2 text-purple-300 font-mono">Teaching Philosophy</h3>
                  <p className="text-gray-300">
                    "I believe in hands-on learning and building projects that solve real problems.
                    Computer Science is about creativity and problem-solving, not just memorizing syntax."
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default About;
