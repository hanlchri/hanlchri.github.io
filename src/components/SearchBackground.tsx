
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  isDragging: boolean;
  dragOffset: { x: number; y: number };
  connections: number[];
}

const SearchBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const firstMoveMadeRef = useRef(false);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);
  const draggedParticleRef = useRef<Particle | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const PARTICLE_COUNT = 40;
    const MIN_SIZE = 2;
    const MAX_SIZE = 6;
    const CONNECTION_DISTANCE = 120;
    const MOUSE_INTERACTION_RADIUS = 100;
    const MOVEMENT_FORCE = 0.5;
    const DAMPING = 0.98;
    const TRAIL_ALPHA = 0.05;

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE),
          color: `hsl(${280 + Math.random() * 40}, 70%, ${60 + Math.random() * 20}%)`,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
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

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const getParticleAtPosition = (x: number, y: number): Particle | null => {
      for (const particle of particlesRef.current) {
        const dx = x - particle.x;
        const dy = y - particle.y;
        if (Math.sqrt(dx * dx + dy * dy) <= particle.size + 5) {
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
      
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      if (!firstMoveMadeRef.current) {
        firstMoveMadeRef.current = true;
      }

      if (draggedParticleRef.current) {
        draggedParticleRef.current.x = x - draggedParticleRef.current.dragOffset.x;
        draggedParticleRef.current.y = y - draggedParticleRef.current.dragOffset.y;
        draggedParticleRef.current.vx = 0;
        draggedParticleRef.current.vy = 0;
      }
    };

    const handleMouseUp = () => {
      if (draggedParticleRef.current) {
        draggedParticleRef.current.isDragging = false;
        draggedParticleRef.current = null;
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.fillStyle = `rgba(26, 31, 44, ${TRAIL_ALPHA})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update connections
      particlesRef.current.forEach((particle, i) => {
        particle.connections = [];
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const other = particlesRef.current[j];
          const distance = Math.sqrt((particle.x - other.x) ** 2 + (particle.y - other.y) ** 2);
          if (distance < CONNECTION_DISTANCE) {
            particle.connections.push(j);
          }
        }
      });

      // Draw connections
      particlesRef.current.forEach((particle, i) => {
        particle.connections.forEach(j => {
          const other = particlesRef.current[j];
          const distance = Math.sqrt((particle.x - other.x) ** 2 + (particle.y - other.y) ** 2);
          const opacity = 1 - (distance / CONNECTION_DISTANCE);
          
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(147, 51, 234, ${opacity * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      });

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        if (!particle.isDragging) {
          if (firstMoveMadeRef.current) {
            const dx = particle.x - mousePositionRef.current.x;
            const dy = particle.y - mousePositionRef.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < MOUSE_INTERACTION_RADIUS && distance > 0) {
              const force = MOVEMENT_FORCE * (1 - distance / MOUSE_INTERACTION_RADIUS);
              particle.vx += (dx / distance) * force;
              particle.vy += (dy / distance) * force;
            }
          }

          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vx *= DAMPING;
          particle.vy *= DAMPING;

          if (particle.x <= particle.size || particle.x >= canvas.width - particle.size) {
            particle.vx *= -0.8;
            particle.x = Math.max(particle.size, Math.min(canvas.width - particle.size, particle.x));
          }
          if (particle.y <= particle.size || particle.y >= canvas.height - particle.size) {
            particle.vy *= -0.8;
            particle.y = Math.max(particle.size, Math.min(canvas.height - particle.size, particle.y));
          }
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        ctx.shadowColor = particle.color;
        ctx.shadowBlur = particle.size * 2;
        ctx.fill();
        ctx.shadowBlur = 0;
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
      style={{ cursor: 'default' }}
    />
  );
};

export default SearchBackground;
