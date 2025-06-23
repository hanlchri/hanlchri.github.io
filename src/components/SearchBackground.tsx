
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  isDragging: boolean;
  dragOffset: { x: number; y: number };
  connections: number[];
}

const SearchBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const draggedParticleRef = useRef<Particle | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const PARTICLE_COUNT = 50;
    const CONNECTION_DISTANCE = 120;
    const MOUSE_INTERACTION_RADIUS = 100;

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1,
          color: `hsla(${180 + Math.random() * 60}, 70%, 60%, 0.8)`,
          isDragging: false,
          dragOffset: { x: 0, y: 0 },
          connections: []
        });
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const getParticleAtPosition = (x: number, y: number): Particle | null => {
      for (const particle of particlesRef.current) {
        const dx = x - particle.x;
        const dy = y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= particle.size + 10) {
          return particle;
        }
      }
      return null;
    };

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const clickedParticle = getParticleAtPosition(x, y);
      if (clickedParticle) {
        draggedParticleRef.current = clickedParticle;
        clickedParticle.isDragging = true;
        clickedParticle.dragOffset = {
          x: x - clickedParticle.x,
          y: y - clickedParticle.y
        };
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      mouseRef.current = { x, y };

      if (draggedParticleRef.current) {
        draggedParticleRef.current.x = x - draggedParticleRef.current.dragOffset.x;
        draggedParticleRef.current.y = y - draggedParticleRef.current.dragOffset.y;
      }
    };

    const handleMouseUp = () => {
      if (draggedParticleRef.current) {
        draggedParticleRef.current.isDragging = false;
        draggedParticleRef.current = null;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    resizeCanvas();

    const animate = () => {
      if (!ctx || !canvas) return;

      // Consistent trail effect without periodic clearing
      ctx.fillStyle = 'rgba(26, 31, 44, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update particles
      particlesRef.current.forEach((particle, i) => {
        if (!particle.isDragging) {
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Bounce off walls
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

          // Mouse interaction
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < MOUSE_INTERACTION_RADIUS) {
            const force = (MOUSE_INTERACTION_RADIUS - distance) / MOUSE_INTERACTION_RADIUS;
            particle.vx += (dx / distance) * force * 0.2;
            particle.vy += (dy / distance) * force * 0.2;
          }

          // Apply friction
          particle.vx *= 0.99;
          particle.vy *= 0.99;
        }

        // Draw connections
        particle.connections = [];
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const other = particlesRef.current[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            particle.connections.push(j);
            const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.5;
            
            ctx.strokeStyle = `rgba(100, 200, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-80"
      style={{ pointerEvents: 'auto', cursor: 'default' }}
    />
  );
};

export default SearchBackground;
