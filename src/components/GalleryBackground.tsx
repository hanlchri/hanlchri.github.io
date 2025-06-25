
import React, { useEffect, useRef } from 'react';

interface EnergyParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
  energy: number;
  trail: { x: number; y: number; alpha: number }[];
}

const GalleryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<EnergyParticle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuration
    const PARTICLE_COUNT = 60;
    const ENERGY_SOURCES = 4;
    const TRAIL_LENGTH = 8;
    
    const colors = [
      '#8B5CF6', // tech-purple
      '#06B6D4', // tech-cyan  
      '#10B981', // tech-neon
      '#F59E0B', // amber
      '#EF4444', // red
      '#EC4899'  // pink
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particlesRef.current = [];
      
      // Create energy source particles
      for (let i = 0; i < ENERGY_SOURCES; i++) {
        const angle = (i / ENERGY_SOURCES) * Math.PI * 2;
        const radius = Math.min(canvas.width, canvas.height) * 0.3;
        const centerX = canvas.width / 2 + Math.cos(angle) * radius;
        const centerY = canvas.height / 2 + Math.sin(angle) * radius;
        
        for (let j = 0; j < PARTICLE_COUNT / ENERGY_SOURCES; j++) {
          particlesRef.current.push({
            x: centerX + (Math.random() - 0.5) * 100,
            y: centerY + (Math.random() - 0.5) * 100,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            life: Math.random() * 100,
            maxLife: 200 + Math.random() * 100,
            color: colors[Math.floor(Math.random() * colors.length)],
            energy: Math.random() * 0.5 + 0.5,
            trail: []
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();

    const animate = () => {
      if (!ctx || !canvas) return;

      // Smooth trail effect with dissolving
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(26, 31, 44, 0.02)'; // Very subtle dissolve
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Update trail
        particle.trail.unshift({ x: particle.x, y: particle.y, alpha: 1 });
        if (particle.trail.length > TRAIL_LENGTH) {
          particle.trail.pop();
        }

        // Update trail alpha
        particle.trail.forEach((point, i) => {
          point.alpha = 1 - (i / TRAIL_LENGTH);
        });

        // Physics update
        particle.life++;
        
        // Flowing energy behavior
        const time = Date.now() * 0.001;
        const flowX = Math.sin(time * 0.5 + particle.x * 0.01) * 0.3;
        const flowY = Math.cos(time * 0.3 + particle.y * 0.01) * 0.3;
        
        particle.vx += flowX * 0.02;
        particle.vy += flowY * 0.02;

        // Mouse interaction - energize nearby particles
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150 * 0.1;
          particle.vx += (dx / distance) * force * particle.energy;
          particle.vy += (dy / distance) * force * particle.energy;
          particle.energy = Math.min(2, particle.energy + 0.02);
        } else {
          particle.energy = Math.max(0.5, particle.energy - 0.005);
        }

        // Apply velocity with energy influence
        particle.x += particle.vx * particle.energy;
        particle.y += particle.vy * particle.energy;

        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Boundary behavior - wrap around with energy boost
        if (particle.x < 0) {
          particle.x = canvas.width;
          particle.energy += 0.2;
        }
        if (particle.x > canvas.width) {
          particle.x = 0;
          particle.energy += 0.2;
        }
        if (particle.y < 0) {
          particle.y = canvas.height;
          particle.energy += 0.2;
        }
        if (particle.y > canvas.height) {
          particle.y = 0;
          particle.energy += 0.2;
        }

        // Reset particle when life expires
        if (particle.life > particle.maxLife) {
          particle.life = 0;
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.vx = (Math.random() - 0.5) * 0.5;
          particle.vy = (Math.random() - 0.5) * 0.5;
          particle.energy = Math.random() * 0.5 + 0.5;
          particle.trail = [];
        }

        // Draw trail with dissolving effect
        ctx.globalCompositeOperation = 'screen';
        particle.trail.forEach((point, i) => {
          const alpha = point.alpha * (particle.energy / 2) * 0.6;
          const size = particle.size * (1 - i / TRAIL_LENGTH) * particle.energy;
          
          if (size > 0 && alpha > 0) {
            ctx.beginPath();
            ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color.replace(')', `, ${alpha})`).replace('#', 'rgba(').replace(/^rgba\(/, 'rgba(').replace(particle.color, particle.color.match(/#\w+/)?.[0] || particle.color);
            
            // Convert hex to rgba
            const hex = particle.color;
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.fill();

            // Glow effect
            ctx.beginPath();
            ctx.arc(point.x, point.y, size * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.1})`;
            ctx.fill();
          }
        });

        // Draw main particle with energy glow
        const energyGlow = particle.energy * 0.8;
        const mainAlpha = Math.min(1, energyGlow);
        
        if (mainAlpha > 0) {
          const hex = particle.color;
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);

          // Main particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * particle.energy, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${mainAlpha})`;
          ctx.fill();

          // Energy aura
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * particle.energy * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${mainAlpha * 0.05})`;
          ctx.fill();
        }
      });

      // Draw energy connections between nearby particles
      ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const alpha = (1 - distance / 100) * 0.3 * Math.min(p1.energy, p2.energy);
            
            if (alpha > 0) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-90"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default GalleryBackground;
