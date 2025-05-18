import React, { useEffect, useRef } from 'react';

interface Hexagon {
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  rotationSpeed: number;
  originalRotationSpeed: number;
}

const APCSBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const firstMoveMadeRef = useRef(false);
  const hexagonsRef = useRef<Hexagon[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- START OF ADJUSTABLE PARAMETERS ---

    // MOUSE_INTERACTION_RADIUS: Defines how far (in pixels) the mouse's influence extends.
    // Suggested range: 100 to 300.
    const MOUSE_INTERACTION_RADIUS = 300;

    // MOVEMENT_FORCE_MULTIPLIER: Controls the strength of the "push" effect on hexagons.
    // Higher values = stronger push. Start low and increase.
    // Suggested range: 0.01 (very subtle) to 0.5 (quite noticeable).
    // Your previous very subtle value was around 0.002.
    const MOVEMENT_FORCE_MULTIPLIER = 0.25;

    // ROTATION_EFFECT_MULTIPLIER: Factor by which rotation speed is multiplied during interaction.
    // 1.0 = no change. >1.0 speeds up (in current direction), <1.0 slows down.
    // Suggested range: 1.0005 (very subtle) to 1.01 (more noticeable).
    // Your previous very subtle value was around 1.00005.
    // Note: If a hexagon's initial rotationSpeed is 0, this won't make it rotate.
    const ROTATION_EFFECT_MULTIPLIER = 1.005;

    // ENABLE_ROTATION_REVERSION: If true, rotation speed reverts to original when mouse moves away.
    const ENABLE_ROTATION_REVERSION = true;

    // ROTATION_REVERSION_LERP_FACTOR: How quickly rotation speed reverts (if enabled).
    // 0.01 means it moves 1% towards the original speed per frame.
    // Suggested range: 0.01 to 0.1.
    const ROTATION_REVERSION_LERP_FACTOR = 0.015;

    // --- END OF ADJUSTABLE PARAMETERS ---

    const hexagonCount = 45;

    const initHexagons = () => {
      hexagonsRef.current = [];
      const currentWidth = canvas.width;
      const currentHeight = canvas.height;

      for (let i = 0; i < hexagonCount; i++) {
        const x = Math.random() * currentWidth;
        const y = Math.random() * currentHeight;
        const size = 20 + Math.random() * 30;
        const hue = 220 + Math.random() * 60;
        const saturation = 70 + Math.random() * 20;
        const lightness = 40 + Math.random() * 20;
        const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.15)`;
        const angleValue = Math.random() * Math.PI * 2;
        const baseRotationSpeed = (Math.random() - 0.5) * 0.003;

        hexagonsRef.current.push({
          x,
          y,
          size,
          color,
          angle: angleValue,
          rotationSpeed: baseRotationSpeed,
          originalRotationSpeed: baseRotationSpeed,
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

    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      if (!firstMoveMadeRef.current) {
        firstMoveMadeRef.current = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    const drawHexagon = (x: number, y: number, size: number, color: string, currentAngle: number) => {
      if (!ctx) return;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(currentAngle);

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
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hexagonsRef.current.forEach((hexagon) => {
        hexagon.angle += hexagon.rotationSpeed;

        if (firstMoveMadeRef.current) {
          const dx = hexagon.x - mousePositionRef.current.x;
          const dy = hexagon.y - mousePositionRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < MOUSE_INTERACTION_RADIUS) {
            const proximityFactor = (1 - distance / MOUSE_INTERACTION_RADIUS); // 0 (at edge) to 1 (at center)
            const interactionForce = MOVEMENT_FORCE_MULTIPLIER * proximityFactor;
            const angleToMouse = Math.atan2(dy, dx);

            hexagon.x += Math.cos(angleToMouse) * interactionForce;
            hexagon.y += Math.sin(angleToMouse) * interactionForce;
            
            hexagon.rotationSpeed *= ROTATION_EFFECT_MULTIPLIER;
            // Optional: Cap maximum rotation speed if it gets too high
            // const maxAbsSpeed = 0.01; // Example cap
            // if (Math.abs(hexagon.rotationSpeed) > maxAbsSpeed) {
            //   hexagon.rotationSpeed = Math.sign(hexagon.rotationSpeed) * maxAbsSpeed;
            // }

          } else {
            if (ENABLE_ROTATION_REVERSION) {
              hexagon.rotationSpeed += (hexagon.originalRotationSpeed - hexagon.rotationSpeed) * ROTATION_REVERSION_LERP_FACTOR;
            }
          }
        }

        drawHexagon(hexagon.x, hexagon.y, hexagon.size, hexagon.color, hexagon.angle);

        if (hexagon.x < -hexagon.size) hexagon.x = canvas.width + hexagon.size;
        if (hexagon.x > canvas.width + hexagon.size) hexagon.x = -hexagon.size;
        if (hexagon.y < -hexagon.size) hexagon.y = canvas.height + hexagon.size;
        if (hexagon.y > canvas.height + hexagon.size) hexagon.y = -hexagon.size;

        const driftStrength = 0.03;
        const timeFactor = Date.now() * 0.00002;
        hexagon.x += Math.sin(timeFactor + hexagon.size) * driftStrength;
        hexagon.y += Math.cos(timeFactor + hexagon.size) * driftStrength;
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

export default APCSBackground;
