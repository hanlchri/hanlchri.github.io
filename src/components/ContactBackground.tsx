
import React, { useEffect, useRef, useState } from 'react';

interface Dot {
  x: number;
  y: number;
  size: number;
  speed: number;
  dirX: number;
  dirY: number;
  color: string;
}

const ContactBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseMoved, setMouseMoved] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let dots: Dot[] = [];
    const dotCount = 100;
    
    // Initialize dots - MOVED BEFORE resizeCanvas
    const initDots = () => {
      dots = [];
      
      for (let i = 0; i < dotCount; i++) {
        // Position randomly across screen
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = 1 + Math.random() * 2;
        
        // Random movement speed and direction
        const speed = 0.2 + Math.random() * 0.5;
        const angle = Math.random() * Math.PI * 2;
        const dirX = Math.cos(angle) * speed;
        const dirY = Math.sin(angle) * speed;
        
        // Contact theme colors - gentle blues to purples
        const hue = 200 + Math.random() * 80;
        const saturation = 70 + Math.random() * 20;
        const lightness = 60 + Math.random() * 20;
        const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.7)`;
        
        dots.push({ x, y, size, speed, dirX, dirY, color });
      }
    };
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setMouseMoved(true);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const animate = () => {
      // Semi-transparent clear for a subtle trail effect
      ctx.fillStyle = 'rgba(26, 31, 44, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Process each dot
      dots.forEach(dot => {
        // Update position
        dot.x += dot.dirX;
        dot.y += dot.dirY;
        
        // Bounce off edges
        if (dot.x < 0 || dot.x > canvas.width) dot.dirX *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.dirY *= -1;
        
        // Mouse interaction - very subtle
        if (mouseMoved) {
          const dx = dot.x - mousePosition.x;
          const dy = dot.y - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 100;
          
          if (distance < maxDistance) {
            // Create a flowing effect around cursor
            const angle = Math.atan2(dy, dx);
            const force = 0.05 * (1 - distance / maxDistance);
            
            // Add a circular flow component
            const perpAngle = angle + Math.PI / 2;
            dot.dirX += Math.cos(perpAngle) * force * 2;
            dot.dirY += Math.sin(perpAngle) * force * 2;
            
            // Add small repulsion
            dot.dirX += Math.cos(angle) * force * 0.2;
            dot.dirY += Math.sin(angle) * force * 0.2;
            
            // Cap speed
            const currentSpeed = Math.sqrt(dot.dirX * dot.dirX + dot.dirY * dot.dirY);
            if (currentSpeed > dot.speed * 3) {
              dot.dirX = (dot.dirX / currentSpeed) * dot.speed * 3;
              dot.dirY = (dot.dirY / currentSpeed) * dot.speed * 3;
            }
          }
        }
        
        // Draw dot with glow
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
        
        // Add a subtle glow
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = dot.color.replace('0.7', '0.1');
        ctx.fill();
      });
      
      // Draw connections between nearby dots
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 80;
          
          if (distance < maxDistance) {
            // Draw connection with opacity based on distance
            const opacity = 0.4 * (1 - distance / maxDistance);
            
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(150, 170, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition, mouseMoved]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-80"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ContactBackground;
