
import React, { useEffect, useRef, useState } from 'react';

interface Hexagon {
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  rotationSpeed: number;
}

const APCSBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseMoved, setMouseMoved] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let hexagons: Hexagon[] = [];
    const hexagonCount = 40;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initHexagons();
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setMouseMoved(true);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initialize hexagons
    const initHexagons = () => {
      hexagons = [];
      
      for (let i = 0; i < hexagonCount; i++) {
        // Position randomly across screen
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = 20 + Math.random() * 30;
        
        // AP CS theme colors - blues and purples
        const hue = 220 + Math.random() * 60; // 220-280 (blue to purple)
        const saturation = 70 + Math.random() * 20;
        const lightness = 40 + Math.random() * 20;
        const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.15)`;
        
        // Random rotation
        const angle = Math.random() * Math.PI * 2;
        const rotationSpeed = (Math.random() - 0.5) * 0.005;
        
        hexagons.push({ x, y, size, color, angle, rotationSpeed });
      }
    };
    
    // Draw a hexagon
    const drawHexagon = (x: number, y: number, size: number, color: string, angle: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const pointX = size * Math.cos(i * Math.PI / 3);
        const pointY = size * Math.sin(i * Math.PI / 3);
        
        if (i === 0) {
          ctx.moveTo(pointX, pointY);
        } else {
          ctx.lineTo(pointX, pointY);
        }
      }
      ctx.closePath();
      
      ctx.fillStyle = color;
      ctx.fill();
      
      // Add inner hexagon for a layered effect
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const pointX = size * 0.7 * Math.cos(i * Math.PI / 3);
        const pointY = size * 0.7 * Math.sin(i * Math.PI / 3);
        
        if (i === 0) {
          ctx.moveTo(pointX, pointY);
        } else {
          ctx.lineTo(pointX, pointY);
        }
      }
      ctx.closePath();
      
      // Use a slightly different color for inner hexagon
      const innerColor = color.replace('0.15', '0.3');
      ctx.fillStyle = innerColor;
      ctx.fill();
      
      ctx.restore();
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update hexagons
      hexagons.forEach((hexagon) => {
        // Update rotation
        hexagon.angle += hexagon.rotationSpeed;
        
        // Mouse interaction - very subtle
        if (mouseMoved) {
          const dx = hexagon.x - mousePosition.x;
          const dy = hexagon.y - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;
          
          if (distance < maxDistance) {
            // Apply subtle force based on distance
            const force = 0.1 * (1 - distance / maxDistance);
            const angle = Math.atan2(dy, dx);
            
            hexagon.x += Math.cos(angle) * force;
            hexagon.y += Math.sin(angle) * force;
            
            // Slightly increase rotation speed when near mouse
            hexagon.rotationSpeed *= 1.001;
          }
        }
        
        // Draw hexagon
        drawHexagon(hexagon.x, hexagon.y, hexagon.size, hexagon.color, hexagon.angle);
        
        // Bounce off edges
        if (hexagon.x < -hexagon.size) hexagon.x = canvas.width + hexagon.size;
        if (hexagon.x > canvas.width + hexagon.size) hexagon.x = -hexagon.size;
        if (hexagon.y < -hexagon.size) hexagon.y = canvas.height + hexagon.size;
        if (hexagon.y > canvas.height + hexagon.size) hexagon.y = -hexagon.size;
        
        // Add subtle drift
        hexagon.x += Math.sin(Date.now() * 0.0005 + hexagon.size) * 0.1;
        hexagon.y += Math.cos(Date.now() * 0.0005 + hexagon.size) * 0.1;
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    initHexagons();
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

export default APCSBackground;
