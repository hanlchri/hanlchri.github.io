
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show success toast instead of actually submitting
    toast({
      title: "Contact form submitted",
      description: "Thank you for your message! Mr. Hanley will get back to you soon.",
      duration: 5000,
    });
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10">
        <div className="content-section">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center tech-text">Contact</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-tech-cyan">Contact Information</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">Email</h3>
                  <p className="text-tech-purple">hanlchri@shenschools.org</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold">Office</h3>
                  <p>Room 129, Shenendehowa High School</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold">Office Hours</h3>
                  <p>Monday - Friday: 7:30 AM - 2:30 PM</p>
                  <p>Extra help available after school by appointment</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4 text-tech-purple">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block">Name</label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Your name" 
                    required 
                    className="bg-secondary/50 border-tech-purple/30 focus:border-tech-purple"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block">Email</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Your email" 
                    required 
                    className="bg-secondary/50 border-tech-purple/30 focus:border-tech-purple"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="block">Subject</label>
                  <Input 
                    id="subject" 
                    type="text" 
                    placeholder="Subject" 
                    required 
                    className="bg-secondary/50 border-tech-purple/30 focus:border-tech-purple"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block">Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="Your message" 
                    required 
                    rows={5}
                    className="bg-secondary/50 border-tech-purple/30 focus:border-tech-purple"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-tech-purple hover:bg-tech-purple/80"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
