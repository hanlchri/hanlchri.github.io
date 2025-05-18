
import React, { useEffect, useRef } from 'react';

const RetroGridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Animation variables
    const gridSize = 40;
    let time = 0;
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      const horizonY = canvas.height * 0.6;
      const vanishingPointX = canvas.width * 0.5;
      
      // Set gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, horizonY);
      bgGradient.addColorStop(0, '#000000');
      bgGradient.addColorStop(1, '#1a1a2e');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, horizonY);
      
      // Draw "ground"
      const groundGradient = ctx.createLinearGradient(0, horizonY, 0, canvas.height);
      groundGradient.addColorStop(0, '#1a1a2e');
      groundGradient.addColorStop(1, '#0f0f1a');
      ctx.fillStyle = groundGradient;
      ctx.fillRect(0, horizonY, canvas.width, canvas.height - horizonY);
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)';
      ctx.lineWidth = 1;
      
      // Horizontal lines
      for (let y = horizonY; y < canvas.height; y += gridSize) {
        // Calculate perspective factor
        const perspectiveFactor = (y - horizonY) / (canvas.height - horizonY);
        const amplitude = Math.min(40 * perspectiveFactor, 25); // Reduced amplitude
        
        ctx.beginPath();
        
        // Add some wave effect - slowed down
        for (let x = 0; x < canvas.width; x += 5) {
          const waveY = y + Math.sin(time * 0.2 + x * 0.01) * amplitude * Math.pow(perspectiveFactor, 2); // Slowed from 0.5 to 0.2
          
          if (x === 0) {
            ctx.moveTo(x, waveY);
          } else {
            ctx.lineTo(x, waveY);
          }
        }
        
        ctx.stroke();
      }
      
      // Vertical lines (with perspective) - slowed down
      const numVerticals = 30;
      const spacing = canvas.width / numVerticals;
      
      for (let i = 0; i <= numVerticals; i++) {
        const xPos = i * spacing;
        const normalizedPos = (xPos - vanishingPointX) / (canvas.width * 0.5);
        
        // Create a curve that starts at horizon and ends at bottom
        ctx.beginPath();
        ctx.moveTo(xPos, horizonY);
        
        // Draw curved line with slower wave effect
        for (let y = horizonY; y < canvas.height; y += 5) {
          const t = (y - horizonY) / (canvas.height - horizonY);
          const xOffset = normalizedPos * t * canvas.width * 0.5;
          const waveX = vanishingPointX + xOffset + Math.sin(time * 0.15 + y * 0.01) * 10 * t; // Slowed from 0.3 to 0.15
          
          ctx.lineTo(waveX, y);
        }
        
        ctx.stroke();
      }
      
      // Add some particles - slowed down
      const numParticles = 15; // Reduced from 20
      ctx.fillStyle = 'rgba(139, 92, 246, 0.7)';
      
      for (let i = 0; i < numParticles; i++) {
        const t = (time * 0.5 + i * 100) % 1500 / 1500; // Slowed down
        const size = 2 + Math.sin(t * Math.PI) * 2;
        
        const x = (Math.sin(i * 0.4 + time * 0.0005) * 0.5 + 0.5) * canvas.width; // Slowed down
        const y = horizonY - 100 + t * 300;
        
        if (y < canvas.height) {
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Update time at a slower rate
      time += 0.5; // Reduced from 1
      
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
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default RetroGridBackground;
