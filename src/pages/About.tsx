
import React from 'react';
import Layout from '@/components/Layout';

const About = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10">
        <div className="content-section backdrop-blur-sm bg-black/50 border border-purple-500/20">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            About Chris Hanley
          </h1>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <img
                  src="/pictures/Hanley3.jpeg"
                  alt="Chris Hanley" // You might want to update the alt text as well
                  className="rounded-lg border-2 border-tech-purple/30 shadow-lg shadow-tech-purple/20 w-full max-w-md mx-auto"
              />
            </div>
            
            <div className="md:w-1/2">
              <p className="text-lg mb-4 font-sans">
                Mr. Chris Hanley is a Java, AP Computer Science, and Digital Electronics teacher
                at Shenendehowa High School. He has taught at Shen for 25 years.
              </p>
              
              <p className="text-lg mb-4 font-sans">
                He attended Gordon College and majored in Math and Computer Science.
              </p>
              
              <p className="text-lg font-sans">
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
