
import React, { useEffect, useRef } from 'react';

const TerminalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*(){}[]><~^";
    const fontSize = 14;
    const columns = Math.floor(window.innerWidth / fontSize);
    let drops: number[] = [];
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drops = Array(columns).fill(1);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Drawing the characters
    const draw = () => {
      // Add semi-transparent black background to create fade effect
      ctx.fillStyle = 'rgba(26, 31, 44, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#33C3F0'; // tech-cyan
      ctx.font = `${fontSize}px 'JetBrains Mono'`;
      
      // For each column
      for (let i = 0; i < drops.length; i++) {
        // Get a random character
        const text = characters[Math.floor(Math.random() * characters.length)];
        
        // x = i * fontSize, y = drops[i] * fontSize
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Randomly reset some drops to the top after they've reached a certain point
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        
        // Increment y coordinate for the drop
        drops[i]++;
      }
    };
    
    // Animation loop
    const animate = () => {
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-50"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default TerminalBackground;
