
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
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const emailBody = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(formData.message)}`;
    const mailtoLink = `mailto:hanleyc@shenet.org?subject=${encodeURIComponent(formData.subject)}&body=${emailBody}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Show success toast
    toast({
      title: "Email client opened",
      description: "Your default email application should now open with the message pre-filled. Please send the email to complete your message to Mr. Hanley.",
      duration: 7000,
    });
    
    // Clear form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
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
                  <p className="text-tech-purple">hanleyc@shenet.org</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold">Office</h3>
                  <p>Room 205, Shenendehowa High School</p>
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
                    value={formData.name}
                    onChange={handleInputChange}
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
                    value={formData.email}
                    onChange={handleInputChange}
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
                    value={formData.subject}
                    onChange={handleInputChange}
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
                    value={formData.message}
                    onChange={handleInputChange}
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
