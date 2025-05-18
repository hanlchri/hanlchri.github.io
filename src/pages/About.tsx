
import React from 'react';
import Layout from '@/components/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const About = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10">
        <div className="content-section animate-slide-up" style={{ backdropFilter: 'blur(8px)' }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center tech-text">About Chris Hanley</h1>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <img 
                src="/lovable-uploads/33ce3620-5527-4883-b107-ec91e1a2b3b2.png" 
                alt="Chris Hanley" 
                className="rounded-lg border-2 border-tech-purple/30 shadow-lg shadow-tech-purple/20 w-full max-w-md mx-auto pixelated"
                style={{ 
                  imageRendering: 'pixelated',
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
                }}
              />
            </div>
            
            <div className="md:w-1/2">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="teaching" className="border-tech-purple/20">
                  <AccordionTrigger className="font-bold text-tech-cyan hover:text-tech-cyan/80">
                    Teaching
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4 font-mono">
                      Mr. Chris Hanley is a Java, AP Computer Science, and Digital Electronics teacher
                      at Shenendehowa High School. He has taught at Shen for 25 years.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="education" className="border-tech-purple/20">
                  <AccordionTrigger className="font-bold text-tech-cyan hover:text-tech-cyan/80">
                    Education
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4 font-mono">
                      He attended Gordon College and majored in Math and Computer Science.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="interests" className="border-tech-purple/20">
                  <AccordionTrigger className="font-bold text-tech-cyan hover:text-tech-cyan/80">
                    Interests
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="font-mono">
                      Mr. Hanley enjoys playing tennis, Smash Ultimate, and Minecraft.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
