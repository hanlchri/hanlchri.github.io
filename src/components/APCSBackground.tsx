import React, { useEffect, useRef } from 'react';

interface Hexagon {
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  rotationSpeed: number;
  originalRotationSpeed: number; // To potentially revert or cap rotation changes
}

const APCSBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const firstMoveMadeRef = useRef(false); // Tracks if the mouse has moved
  const hexagonsRef = useRef<Hexagon[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const hexagonCount = 40;

    const initHexagons = () => {
      hexagonsRef.current = []; // Clear and initialize
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
    resizeCanvas(); // Initial setup

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
          
          const maxDistance = 100; // Interaction radius
          const forceMultiplier = 0.002; // Movement force strength
          const rotationInteractionFactor = 1.00005; // How much rotation is affected

          if (distance < maxDistance) {
            const proximityFactor = (1 - distance / maxDistance); // 0 to 1
            const interactionForce = forceMultiplier * proximityFactor;
            const angleToMouse = Math.atan2(dy, dx);

            hexagon.x += Math.cos(angleToMouse) * interactionForce;
            hexagon.y += Math.sin(angleToMouse) * interactionForce;
            
            hexagon.rotationSpeed *= rotationInteractionFactor;
            // Optional: Cap rotation speed to prevent it from getting too fast
            // const maxAbsRotation = 0.005;
            // if (Math.abs(hexagon.rotationSpeed) > maxAbsRotation) {
            //   hexagon.rotationSpeed = Math.sign(hexagon.rotationSpeed) * maxAbsRotation;
            // }
          } else {
            // Optional: Gradually revert rotation speed to original when mouse is not near
            // This makes the rotation effect temporary and reactive rather than cumulative.
            // hexagon.rotationSpeed += (hexagon.originalRotationSpeed - hexagon.rotationSpeed) * 0.01; 
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

    animate(); // Start animation

    return () => { // Cleanup
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []); // Empty dependency array: runs once on mount, cleans up on unmount

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-80"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default APCSBackground;
