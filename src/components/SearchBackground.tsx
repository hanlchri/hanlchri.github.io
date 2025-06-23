
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  velocity: { x: number; y: number };
  isDragging: boolean;
  dragOffset: { x: number; y: number };
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

    // --- ADJUSTABLE PARAMETERS ---
    const PARTICLE_COUNT = 50;
    const PARTICLE_MIN_SIZE = 2;
    const PARTICLE_MAX_SIZE = 6;
    const MOUSE_INTERACTION_RADIUS = 180;
    const MOUSE_ATTRACTION_FORCE = 0.02;
    const VELOCITY_DAMPING = 0.98;
    const MAX_VELOCITY = 3;
    const TRAIL_EFFECT_ALPHA = 0.05;
    const BACKGROUND_COLOR_FOR_TRAIL = `rgba(26, 31, 44, ${TRAIL_EFFECT_ALPHA})`;
    // --- END PARAMETERS ---

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = PARTICLE_MIN_SIZE + Math.random() * (PARTICLE_MAX_SIZE - PARTICLE_MIN_SIZE);
        
        const hue = 200 + Math.random() * 60;
        const saturation = 60 + Math.random() * 30;
        const lightness = 50 + Math.random() * 30;
        const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

        particlesRef.current.push({
          x, y, size, color,
          velocity: {
            x: (Math.random() - 0.5) * 0.5,
            y: (Math.random() - 0.5) * 0.5
          },
          isDragging: false,
          dragOffset: { x: 0, y: 0 }
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
        clickedParticle.velocity = { x: 0, y: 0 };
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
        const newX = x - draggedParticleRef.current.dragOffset.x;
        const newY = y - draggedParticleRef.current.dragOffset.y;
        
        const deltaX = newX - draggedParticleRef.current.x;
        const deltaY = newY - draggedParticleRef.current.y;
        
        draggedParticleRef.current.velocity.x = deltaX * 0.2;
        draggedParticleRef.current.velocity.y = deltaY * 0.2;
        
        draggedParticleRef.current.x = newX;
        draggedParticleRef.current.y = newY;
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
      
      ctx.fillStyle = BACKGROUND_COLOR_FOR_TRAIL;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        if (!particle.isDragging) {
          // Apply velocity
          particle.x += particle.velocity.x;
          particle.y += particle.velocity.y;
          
          // Apply damping
          particle.velocity.x *= VELOCITY_DAMPING;
          particle.velocity.y *= VELOCITY_DAMPING;
          
          // Mouse interaction
          if (firstMoveMadeRef.current) {
            const dx = particle.x - mousePositionRef.current.x;
            const dy = particle.y - mousePositionRef.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < MOUSE_INTERACTION_RADIUS && distance > 0) {
              const forceX = (dx / distance) * MOUSE_ATTRACTION_FORCE * (1 - distance / MOUSE_INTERACTION_RADIUS);
              const forceY = (dy / distance) * MOUSE_ATTRACTION_FORCE * (1 - distance / MOUSE_INTERACTION_RADIUS);
              
              particle.velocity.x += forceX;
              particle.velocity.y += forceY;
            }
          }
          
          // Limit velocity
          const velMag = Math.sqrt(particle.velocity.x ** 2 + particle.velocity.y ** 2);
          if (velMag > MAX_VELOCITY) {
            particle.velocity.x = (particle.velocity.x / velMag) * MAX_VELOCITY;
            particle.velocity.y = (particle.velocity.y / velMag) * MAX_VELOCITY;
          }
          
          // Wrap around screen
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace('hsl', 'hsla').replace(')', ', 0.3)');
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
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default SearchBackground;
