
import React from 'react';
import Layout from '@/components/Layout';

const About = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10">
        <div className="content-section">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center tech-text">About Chris Hanley</h1>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <img 
                src="/lovable-uploads/33ce3620-5527-4883-b107-ec91e1a2b3b2.png" 
                alt="Chris Hanley" 
                className="rounded-lg border-2 border-tech-purple/30 shadow-lg shadow-tech-purple/20 w-full max-w-md mx-auto"
              />
            </div>
            
            <div className="md:w-1/2">
              <p className="text-lg mb-4">
                Mr. Chris Hanley is a Java, AP Computer Science, and Digital Electronics teacher
                at Shenendehowa High School. He has taught at Shen for 25 years.
              </p>
              
              <p className="text-lg mb-4">
                He attended Gordon College and majored in Math and Computer Science.
              </p>
              
              <p className="text-lg">
                Mr. Hanley enjoys playing tennis, Smash Ultimate, and Minecraft.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
