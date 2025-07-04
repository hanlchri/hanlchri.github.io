
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create Gmail compose URL with form data
    const subject = encodeURIComponent(formData.subject || 'Contact from Hanley\'s Hood');
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=hanlchri@shenschools.org&su=${subject}&body=${body}`;
    
    // Open Gmail in new tab
    window.open(gmailUrl, '_blank');
    
    // Show success toast
    toast({
      title: "Opening Gmail",
      description: "Your message has been prepared in Gmail. Please send it from there.",
      duration: 5000,
    });
  };
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto mt-6 sm:mt-10">
        <div className="bg-black/20 backdrop-blur-sm border border-contact-accent/20 rounded-lg p-4 sm:p-6 lg:p-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center contact-text">Contact</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-contact-secondary">Contact Information</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-2">Email</h3>
                  <p className="text-contact-accent text-lg lg:text-xl">hanlchri@shenschools.org</p>
                </div>
                
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-2">Office</h3>
                  <p className="text-lg lg:text-xl">Room 129, Shenendehowa High School</p>
                </div>
                
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-2">Office Hours</h3>
                  <p className="text-lg lg:text-xl mb-2">Monday - Friday: 7:30 AM - 2:30 PM</p>
                  <p className="text-lg lg:text-xl">Extra help available after school by appointment</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-contact-accent">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-lg lg:text-xl">Name</label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Your name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                    className="bg-secondary/50 border-contact-accent/30 focus:border-contact-accent text-base lg:text-lg h-12 lg:h-14"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-lg lg:text-xl">Email</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Your email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                    className="bg-secondary/50 border-contact-accent/30 focus:border-contact-accent text-base lg:text-lg h-12 lg:h-14"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-lg lg:text-xl">Subject</label>
                  <Input 
                    id="subject" 
                    type="text" 
                    placeholder="Subject" 
                    value={formData.subject}
                    onChange={handleInputChange}
                    required 
                    className="bg-secondary/50 border-contact-accent/30 focus:border-contact-accent text-base lg:text-lg h-12 lg:h-14"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-lg lg:text-xl">Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="Your message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    required 
                    rows={6}
                    className="bg-secondary/50 border-contact-accent/30 focus:border-contact-accent text-base lg:text-lg min-h-[150px]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-contact-accent hover:bg-contact-accent/80 text-lg lg:text-xl h-12 lg:h-14 font-semibold"
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
