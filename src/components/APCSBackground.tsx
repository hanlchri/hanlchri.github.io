
import React, { useEffect, useRef } from 'react';

interface Hexagon {
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  rotationSpeed: number;
  originalRotationSpeed: number;
  isDragging: boolean;
  dragOffset: { x: number; y: number };
  velocity: { x: number; y: number };
  angularVelocity: number;
  lastMousePosition: { x: number; y: number };
}

const APCSBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const firstMoveMadeRef = useRef(false);
  const hexagonsRef = useRef<Hexagon[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);
  const draggedHexagonRef = useRef<Hexagon | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- START OF ADJUSTABLE PARAMETERS ---
    const HEXAGON_COUNT = 45;
    const HEXAGON_MIN_SIZE = 20;
    const HEXAGON_MAX_SIZE = 50;
    
    const MOUSE_INTERACTION_RADIUS = 200;
    const MOVEMENT_FORCE_MULTIPLIER = 0.08; // Reduced from 0.15
    const ROTATION_EFFECT_MULTIPLIER = 1.001; // Reduced from 1.003
    const ENABLE_ROTATION_REVERSION = true;
    const ROTATION_REVERSION_LERP_FACTOR = 0.005; // Reduced
    
    const DRIFT_STRENGTH = 0.01; // Reduced from 0.02
    const TIME_FACTOR = 0.000005; // Reduced from 0.00001
    
    const VELOCITY_DAMPING = 0.98; // Increased damping
    const ANGULAR_DAMPING = 0.99; // New parameter for angular velocity
    const MAX_VELOCITY = 3; // Reduced from 5
    const MAX_ANGULAR_VELOCITY = 0.05; // New parameter
    
    // Faster trail fade
    const TRAIL_EFFECT_ALPHA = 0.08; // Increased from 0.02
    const BACKGROUND_COLOR_FOR_TRAIL = `rgba(26, 31, 44, ${TRAIL_EFFECT_ALPHA})`;
    // --- END OF ADJUSTABLE PARAMETERS ---

    const initHexagons = () => {
      hexagonsRef.current = [];
      const currentWidth = canvas.width;
      const currentHeight = canvas.height;

      for (let i = 0; i < HEXAGON_COUNT; i++) {
        const x = Math.random() * currentWidth;
        const y = Math.random() * currentHeight;
        const size = HEXAGON_MIN_SIZE + Math.random() * (HEXAGON_MAX_SIZE - HEXAGON_MIN_SIZE);
        
        // Blue-ish APCS colors
        const hue = 200 + Math.random() * 60;
        const saturation = 70 + Math.random() * 20;
        const lightness = 40 + Math.random() * 20;
        const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.15)`;
        const angleValue = Math.random() * Math.PI * 2;
        const baseRotationSpeed = (Math.random() - 0.5) * 0.002; // Reduced from 0.003

        hexagonsRef.current.push({
          x,
          y,
          size,
          color,
          angle: angleValue,
          rotationSpeed: baseRotationSpeed,
          originalRotationSpeed: baseRotationSpeed,
          isDragging: false,
          dragOffset: { x: 0, y: 0 },
          velocity: { x: 0, y: 0 },
          angularVelocity: 0, // New property
          lastMousePosition: { x: 0, y: 0 }
        });
      }
    };

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initHexagons();
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const getHexagonAtPosition = (x: number, y: number): Hexagon | null => {
      for (const hexagon of hexagonsRef.current) {
        const dx = x - hexagon.x;
        const dy = y - hexagon.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= hexagon.size + 10) {
          return hexagon;
        }
      }
      return null;
    };

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const clickedHexagon = getHexagonAtPosition(x, y);
      if (clickedHexagon) {
        draggedHexagonRef.current = clickedHexagon;
        clickedHexagon.isDragging = true;
        clickedHexagon.dragOffset = {
          x: x - clickedHexagon.x,
          y: y - clickedHexagon.y
        };
        clickedHexagon.lastMousePosition = { x, y };
        clickedHexagon.velocity = { x: 0, y: 0 };
        clickedHexagon.angularVelocity = 0;
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

      if (draggedHexagonRef.current) {
        const newX = x - draggedHexagonRef.current.dragOffset.x;
        const newY = y - draggedHexagonRef.current.dragOffset.y;
        
        const deltaX = newX - draggedHexagonRef.current.x;
        const deltaY = newY - draggedHexagonRef.current.y;
        
        // Linear momentum
        draggedHexagonRef.current.velocity.x = deltaX * 0.2;
        draggedHexagonRef.current.velocity.y = deltaY * 0.2;
        
        // Angular momentum based on drag direction relative to center
        const centerX = draggedHexagonRef.current.x;
        const centerY = draggedHexagonRef.current.y;
        const dragAngle = Math.atan2(deltaY, deltaX);
        const centerAngle = Math.atan2(y - centerY, x - centerX);
        const angleDiff = dragAngle - centerAngle;
        draggedHexagonRef.current.angularVelocity += Math.sin(angleDiff) * 0.01;
        
        draggedHexagonRef.current.x = newX;
        draggedHexagonRef.current.y = newY;
        draggedHexagonRef.current.lastMousePosition = { x, y };
      }
    };

    const handleMouseUp = () => {
      if (draggedHexagonRef.current) {
        draggedHexagonRef.current.isDragging = false;
        draggedHexagonRef.current = null;
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    const drawHexagon = (x: number, y: number, size: number, color: string, currentAngle: number) => {
      if (!ctx) return;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(currentAngle);

      // Outer glow
      ctx.shadowColor = color.replace('0.15', '0.4');
      ctx.shadowBlur = 20;

      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const pointX = size * Math.cos(i * (Math.PI / 3));
        const pointY = size * Math.sin(i * (Math.PI / 3));
        if (i === 0) ctx.moveTo(pointX, pointY);
        else ctx.lineTo(pointX, pointY);
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Inner hexagon
      ctx.shadowBlur = 10;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const pointX = size * 0.7 * Math.cos(i * (Math.PI / 3));
        const pointY = size * 0.7 * Math.sin(i * (Math.PI / 3));
        if (i === 0) ctx.moveTo(pointX, pointY);
        else ctx.lineTo(pointX, pointY);
      }
      ctx.closePath();
      const innerColor = color.replace('0.15', '0.3');
      ctx.fillStyle = innerColor;
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Faster fade for smooth trails
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = BACKGROUND_COLOR_FOR_TRAIL;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      hexagonsRef.current.forEach((hexagon) => {
        // Apply angular velocity to rotation
        hexagon.angle += hexagon.rotationSpeed + hexagon.angularVelocity;
        
        // Dampen angular velocity
        hexagon.angularVelocity *= ANGULAR_DAMPING;
        
        // Limit angular velocity
        if (Math.abs(hexagon.angularVelocity) > MAX_ANGULAR_VELOCITY) {
          hexagon.angularVelocity = Math.sign(hexagon.angularVelocity) * MAX_ANGULAR_VELOCITY;
        }

        if (!hexagon.isDragging) {
          // Apply linear momentum
          hexagon.x += hexagon.velocity.x;
          hexagon.y += hexagon.velocity.y;
          hexagon.velocity.x *= VELOCITY_DAMPING;
          hexagon.velocity.y *= VELOCITY_DAMPING;
          
          const velMag = Math.sqrt(hexagon.velocity.x ** 2 + hexagon.velocity.y ** 2);
          if (velMag > MAX_VELOCITY) {
            hexagon.velocity.x = (hexagon.velocity.x / velMag) * MAX_VELOCITY;
            hexagon.velocity.y = (hexagon.velocity.y / velMag) * MAX_VELOCITY;
          }
          
          if (firstMoveMadeRef.current) {
            const dx = hexagon.x - mousePositionRef.current.x;
            const dy = hexagon.y - mousePositionRef.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < MOUSE_INTERACTION_RADIUS) {
              const proximityFactor = (1 - distance / MOUSE_INTERACTION_RADIUS);
              const interactionForce = MOVEMENT_FORCE_MULTIPLIER * proximityFactor;
              const angleToMouse = Math.atan2(dy, dx);

              hexagon.x += Math.cos(angleToMouse) * interactionForce;
              hexagon.y += Math.sin(angleToMouse) * interactionForce;
              
              hexagon.rotationSpeed *= ROTATION_EFFECT_MULTIPLIER;
            } else {
              if (ENABLE_ROTATION_REVERSION) {
                hexagon.rotationSpeed += (hexagon.originalRotationSpeed - hexagon.rotationSpeed) * ROTATION_REVERSION_LERP_FACTOR;
              }
            }
          }

          // Gentle drift
          const timeFactor = Date.now() * TIME_FACTOR;
          hexagon.x += Math.sin(timeFactor + hexagon.size) * DRIFT_STRENGTH;
          hexagon.y += Math.cos(timeFactor + hexagon.size) * DRIFT_STRENGTH;
        }

        drawHexagon(hexagon.x, hexagon.y, hexagon.size, hexagon.color, hexagon.angle);

        // Wrap around edges
        if (hexagon.x < -hexagon.size) hexagon.x = canvas.width + hexagon.size;
        if (hexagon.x > canvas.width + hexagon.size) hexagon.x = -hexagon.size;
        if (hexagon.y < -hexagon.size) hexagon.y = canvas.height + hexagon.size;
        if (hexagon.y > canvas.height + hexagon.size) hexagon.y = -hexagon.size;
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

export default APCSBackground;
