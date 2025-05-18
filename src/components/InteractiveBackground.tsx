
import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  originalX: number;
  originalY: number;
}

interface InteractiveBackgroundProps {
  colorScheme?: 'purple' | 'cyan' | 'green' | 'orange' | 'mixed';
}

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ colorScheme = 'mixed' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number, y: number } | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 100;
    const connectionDistance = 150;
    const mouseInfluence = 120;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(); // Reinitialize particles on resize
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Get color based on the chosen color scheme
    const getColor = (): string => {
      switch (colorScheme) {
        case 'purple':
          return `hsla(${260 + Math.random() * 20}, 80%, 70%, 0.8)`;
        case 'cyan':
          return `hsla(${180 + Math.random() * 30}, 80%, 70%, 0.8)`;
        case 'green':
          return `hsla(${120 + Math.random() * 30}, 80%, 70%, 0.8)`;
        case 'orange':
          return `hsla(${20 + Math.random() * 30}, 80%, 70%, 0.8)`;
        case 'mixed':
        default:
          // For mixed, choose between several color ranges
          const colorRanges = [
            [220, 280], // Purple to blue
            [170, 200], // Cyan
            [100, 140], // Green
            [20, 50]    // Orange
          ];
          const selectedRange = colorRanges[Math.floor(Math.random() * colorRanges.length)];
          return `hsla(${selectedRange[0] + Math.random() * (selectedRange[1] - selectedRange[0])}, 80%, 70%, 0.8)`;
      }
    };
    
    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
          x,
          y,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: getColor(),
          originalX: x,
          originalY: y
        });
      }
    };
    
    // Update mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    // Reset mouse position when mouse leaves
    const handleMouseLeave = () => {
      setMousePosition(null);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    // Connect particles with lines
    const connect = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            // Opacity based on distance
            const opacity = 1 - (distance / connectionDistance);
            
            // Gradient line
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            
            switch (colorScheme) {
              case 'purple':
                gradient.addColorStop(0, `rgba(139, 92, 246, ${opacity * 0.5})`);
                gradient.addColorStop(1, `rgba(168, 85, 247, ${opacity * 0.5})`);
                break;
              case 'cyan':
                gradient.addColorStop(0, `rgba(30, 174, 219, ${opacity * 0.5})`);
                gradient.addColorStop(1, `rgba(6, 182, 212, ${opacity * 0.5})`);
                break;
              case 'green':
                gradient.addColorStop(0, `rgba(52, 211, 153, ${opacity * 0.5})`);
                gradient.addColorStop(1, `rgba(110, 231, 183, ${opacity * 0.5})`);
                break;
              case 'orange':
                gradient.addColorStop(0, `rgba(249, 115, 22, ${opacity * 0.5})`);
                gradient.addColorStop(1, `rgba(251, 146, 60, ${opacity * 0.5})`);
                break;
              case 'mixed':
              default:
                gradient.addColorStop(0, `rgba(30, 174, 219, ${opacity * 0.5})`);
                gradient.addColorStop(1, `rgba(139, 92, 246, ${opacity * 0.5})`);
                break;
            }
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Apply mouse influence
        if (mousePosition) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseInfluence) {
            const forceFactor = (1 - distance / mouseInfluence) * 0.2;
            particle.x -= dx * forceFactor;
            particle.y -= dy * forceFactor;
          } else {
            // Return slowly to original position when not under mouse influence
            particle.x += (particle.originalX - particle.x) * 0.01;
            particle.y += (particle.originalY - particle.y) * 0.01;
          }
        } else {
          // Return to original position if no mouse
          particle.x += (particle.originalX - particle.x) * 0.05;
          particle.y += (particle.originalY - particle.y) * 0.05;
        }
        
        // Wrap around screen edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      connect();
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    initParticles();
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [colorScheme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-70 animate-fade-in"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default InteractiveBackground;
