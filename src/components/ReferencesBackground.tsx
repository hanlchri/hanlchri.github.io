
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  type: 'node' | 'connection' | 'data';
}

interface Connection {
  start: Particle;
  end: Particle;
  strength: number;
  pulsing: boolean;
  pulseTime: number;
}

const ReferencesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- ADJUSTABLE PARAMETERS ---
    const MAX_PARTICLES = 80;
    const CONNECTION_DISTANCE = 120;
    const MOUSE_INFLUENCE_RADIUS = 150;
    const MOUSE_REPEL_FORCE = 2;
    const PARTICLE_SPEED = 0.3;
    const TRAIL_FADE = 0.03;
    // ---

    const initializeNetwork = () => {
      particlesRef.current = [];
      connectionsRef.current = [];

      for (let i = 0; i < MAX_PARTICLES; i++) {
        const type = Math.random() < 0.7 ? 'node' : (Math.random() < 0.5 ? 'connection' : 'data');
        const size = type === 'node' ? 3 + Math.random() * 4 : 
                    type === 'connection' ? 1 + Math.random() * 2 : 
                    2 + Math.random() * 3;

        let color;
        if (type === 'node') {
          // Main network nodes - teal/cyan
          const hue = 170 + Math.random() * 20;
          color = `hsl(${hue}, 70%, 60%)`;
        } else if (type === 'connection') {
          // Connection points - green
          const hue = 120 + Math.random() * 30;
          color = `hsl(${hue}, 60%, 50%)`;
        } else {
          // Data points - blue
          const hue = 200 + Math.random() * 40;
          color = `hsl(${hue}, 80%, 65%)`;
        }

        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * PARTICLE_SPEED,
          vy: (Math.random() - 0.5) * PARTICLE_SPEED,
          size,
          color,
          alpha: 0.8 + Math.random() * 0.2,
          life: 1,
          maxLife: 1,
          type
        });
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeNetwork();
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const updateConnections = () => {
      connectionsRef.current = [];
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < CONNECTION_DISTANCE) {
            const strength = 1 - (distance / CONNECTION_DISTANCE);
            const shouldPulse = Math.random() < 0.1; // 10% chance for data flow animation
            
            connectionsRef.current.push({
              start: p1,
              end: p2,
              strength,
              pulsing: shouldPulse,
              pulseTime: Math.random() * Math.PI * 2
            });
          }
        }
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      // Smooth trail effect
      ctx.fillStyle = `rgba(26, 31, 44, ${TRAIL_FADE})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update particles
      particlesRef.current.forEach(particle => {
        // Mouse repulsion
        const dx = particle.x - mousePositionRef.current.x;
        const dy = particle.y - mousePositionRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < MOUSE_INFLUENCE_RADIUS && distance > 0) {
          const force = (MOUSE_INFLUENCE_RADIUS - distance) / MOUSE_INFLUENCE_RADIUS;
          const angle = Math.atan2(dy, dx);
          particle.vx += Math.cos(angle) * force * MOUSE_REPEL_FORCE * 0.01;
          particle.vy += Math.sin(angle) * force * MOUSE_REPEL_FORCE * 0.01;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Velocity damping
        particle.vx *= 0.999;
        particle.vy *= 0.999;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = particle.size * 2;
        
        ctx.beginPath();
        if (particle.type === 'node') {
          // Hexagonal nodes for main network points
          ctx.translate(particle.x, particle.y);
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const x = particle.size * Math.cos(angle);
            const y = particle.size * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
        } else if (particle.type === 'data') {
          // Square data packets
          ctx.fillRect(
            particle.x - particle.size/2, 
            particle.y - particle.size/2, 
            particle.size, 
            particle.size
          );
        } else {
          // Circular connection points
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      });

      // Update and draw connections
      updateConnections();
      
      connectionsRef.current.forEach(connection => {
        ctx.save();
        
        let alpha = connection.strength * 0.3;
        let width = connection.strength * 2;
        
        // Pulsing animation for data flow
        if (connection.pulsing) {
          connection.pulseTime += 0.1;
          const pulse = Math.sin(connection.pulseTime) * 0.5 + 0.5;
          alpha += pulse * 0.4;
          width += pulse * 1;
          
          // Draw data flow particles
          const flowProgress = (connection.pulseTime * 0.1) % 1;
          const flowX = connection.start.x + (connection.end.x - connection.start.x) * flowProgress;
          const flowY = connection.start.y + (connection.end.y - connection.start.y) * flowProgress;
          
          ctx.fillStyle = `rgba(100, 255, 200, ${pulse})`;
          ctx.shadowColor = 'rgba(100, 255, 200, 1)';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(flowX, flowY, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = connection.start.color;
        ctx.lineWidth = width;
        ctx.shadowColor = connection.start.color;
        ctx.shadowBlur = 5;
        
        // Draw connection line
        ctx.beginPath();
        ctx.moveTo(connection.start.x, connection.start.y);
        ctx.lineTo(connection.end.x, connection.end.y);
        ctx.stroke();
        
        ctx.restore();
      });

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
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-80"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ReferencesBackground;
