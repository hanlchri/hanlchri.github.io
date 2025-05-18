
import React, { useEffect, useRef, useState } from 'react';

interface InteractiveBackgroundProps {
  variant?: 'java' | 'apcs' | 'references' | 'contact' | 'search';
}

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ 
  variant = 'java'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = variant === 'java' ? 80 
      : variant === 'apcs' ? 120 
      : variant === 'references' ? 60 
      : variant === 'contact' ? 100 
      : 70;
    
    const mouseRadius = 150;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Mouse move event handler
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      baseSize: number;
      speed: number;
      directionX: number;
      directionY: number;
      color: string;
      variant: string;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseSize = Math.random() * 3 + 1;
        this.size = this.baseSize;
        this.speed = Math.random() * 1.5 + 0.5;
        
        // Random direction
        const angle = Math.random() * Math.PI * 2;
        this.directionX = Math.cos(angle) * this.speed;
        this.directionY = Math.sin(angle) * this.speed;
        
        // Color based on variant
        this.variant = variant;
        switch(variant) {
          case 'java':
            this.color = `rgba(255, 166, 87, ${Math.random() * 0.5 + 0.3})`; // Java orange
            break;
          case 'apcs':
            this.color = `rgba(30, 174, 219, ${Math.random() * 0.5 + 0.3})`; // Blue
            break;
          case 'references':
            this.color = `rgba(139, 92, 246, ${Math.random() * 0.5 + 0.3})`; // Purple
            break;
          case 'contact':
            this.color = `rgba(16, 185, 129, ${Math.random() * 0.5 + 0.3})`; // Green
            break;
          case 'search':
            this.color = `rgba(236, 72, 153, ${Math.random() * 0.5 + 0.3})`; // Pink
            break;
          default:
            this.color = `rgba(139, 92, 246, ${Math.random() * 0.5 + 0.3})`;
        }
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        
        if (this.variant === 'java') {
          // Coffee cup for Java
          if (this.size > 2) {
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          } else {
            // Small coffee bean-like shape
            ctx.ellipse(this.x, this.y, this.size, this.size * 0.7, Math.PI / 4, 0, Math.PI * 2);
          }
        } else if (this.variant === 'apcs') {
          // Code brackets for APCS
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        } else if (this.variant === 'references') {
          // Books/documents shape for references
          ctx.rect(this.x - this.size, this.y - this.size/2, this.size * 2, this.size);
        } else if (this.variant === 'contact') {
          // Message/envelope shape for contact
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        } else {
          // Default circle
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        }
        
        ctx.fill();
      }
      
      update() {
        // Movement
        this.x += this.directionX;
        this.y += this.directionY;
        
        // Bounce on edges
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
          this.directionX = -this.directionX;
        }
        
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
          this.directionY = -this.directionY;
        }
        
        // Mouse interaction
        const dx = mousePosition.x - this.x;
        const dy = mousePosition.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRadius) {
          // Expand particles near mouse
          const scaleFactor = 1 + (mouseRadius - distance) / mouseRadius;
          this.size = this.baseSize * scaleFactor;
          
          // Move away from mouse if very close
          if (distance < mouseRadius * 0.5) {
            const pushFactor = (mouseRadius * 0.5 - distance) / (mouseRadius * 0.5) * 0.5;
            this.x -= dx * pushFactor;
            this.y -= dy * pushFactor;
          }
        } else {
          // Revert to original size when away from mouse
          this.size = this.baseSize;
        }
      }
    }
    
    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw all particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Connect particles based on variant
      if (variant !== 'search') {
        connectParticles();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Connect particles with lines
    const connectParticles = () => {
      const connectionDistance = variant === 'java' ? 120 
        : variant === 'apcs' ? 150 
        : variant === 'references' ? 180
        : 140;
      
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 0.6 * (1 - distance / connectionDistance);
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    initParticles();
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition, variant]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default InteractiveBackground;
