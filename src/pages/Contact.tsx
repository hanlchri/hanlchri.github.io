
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct Gmail URL with pre-filled data
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=hanlchri@shenschools.org&su=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    
    // Open Gmail in new tab
    window.open(gmailUrl, '_blank');
    
    // Show success toast
    toast({
      title: "Opening Gmail",
      description: "Your message has been prepared in Gmail. Please review and send.",
      duration: 5000,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10">
        <div className="bg-black/30 backdrop-blur-md border border-teal-500/20 rounded-lg p-4 sm:p-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-teal-400">Contact</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-teal-300">Contact Information</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">Email</h3>
                  <p className="text-teal-400">hanlchri@shenschools.org</p>
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
              <h2 className="text-2xl font-bold mb-4 text-teal-400">Send a Message</h2>
              
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
                    className="bg-secondary/50 border-teal-400/30 focus:border-teal-400"
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
                    className="bg-secondary/50 border-teal-400/30 focus:border-teal-400"
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
                    className="bg-secondary/50 border-teal-400/30 focus:border-teal-400"
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
                    className="bg-secondary/50 border-teal-400/30 focus:border-teal-400"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-teal-500 hover:bg-teal-500/80"
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
