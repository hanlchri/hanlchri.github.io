
import React, { useEffect, useRef } from 'react';

interface CircuitNode {
  x: number;
  y: number;
  size: number;
  type: 'resistor' | 'capacitor' | 'chip' | 'connection';
  pulsePhase: number;
  connections: number[];
}

interface DataPacket {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

const ReferencesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nodesRef = useRef<CircuitNode[]>([]);
  const packetsRef = useRef<DataPacket[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef<ImageData | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initCircuit();
    };

    const initCircuit = () => {
      nodesRef.current = [];
      packetsRef.current = [];
      
      const nodeCount = 25;
      const gridCols = 6;
      const gridRows = 5;
      
      for (let i = 0; i < nodeCount; i++) {
        const col = i % gridCols;
        const row = Math.floor(i / gridCols);
        
        const x = (canvas.width / (gridCols + 1)) * (col + 1) + (Math.random() - 0.5) * 80;
        const y = (canvas.height / (gridRows + 1)) * (row + 1) + (Math.random() - 0.5) * 60;
        
        const types: CircuitNode['type'][] = ['resistor', 'capacitor', 'chip', 'connection'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        nodesRef.current.push({
          x,
          y,
          size: type === 'chip' ? 8 : type === 'connection' ? 3 : 5,
          type,
          pulsePhase: Math.random() * Math.PI * 2,
          connections: []
        });
      }
      
      // Create connections between nearby nodes
      nodesRef.current.forEach((node, i) => {
        const nearbyNodes = nodesRef.current
          .map((otherNode, j) => ({ node: otherNode, index: j, distance: Math.hypot(node.x - otherNode.x, node.y - otherNode.y) }))
          .filter(({ index, distance }) => index !== i && distance < 150)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 3);
        
        node.connections = nearbyNodes.map(({ index }) => index);
      });
    };

    const createDataPacket = () => {
      if (Math.random() < 0.98) return; // Lower frequency
      
      const fromNode = Math.floor(Math.random() * nodesRef.current.length);
      const node = nodesRef.current[fromNode];
      
      if (node.connections.length > 0) {
        const toNode = node.connections[Math.floor(Math.random() * node.connections.length)];
        const colors = ['#00ffff', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
        
        packetsRef.current.push({
          fromNode,
          toNode,
          progress: 0,
          speed: 0.008 + Math.random() * 0.012,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const drawCircuitNode = (ctx: CanvasRenderingContext2D, node: CircuitNode, time: number) => {
      const pulse = Math.sin(time * 0.003 + node.pulsePhase) * 0.3 + 0.7;
      
      ctx.save();
      ctx.translate(node.x, node.y);
      
      switch (node.type) {
        case 'chip':
          // Draw microchip
          ctx.fillStyle = `rgba(100, 200, 255, ${pulse})`;
          ctx.fillRect(-node.size, -node.size, node.size * 2, node.size * 2);
          ctx.strokeStyle = `rgba(0, 255, 255, ${pulse * 0.8})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(-node.size, -node.size, node.size * 2, node.size * 2);
          
          // Draw pins
          for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI) / 2;
            const pinX = Math.cos(angle) * (node.size + 2);
            const pinY = Math.sin(angle) * (node.size + 2);
            ctx.fillRect(pinX - 1, pinY - 1, 2, 2);
          }
          break;
          
        case 'resistor':
          // Draw resistor symbol
          ctx.strokeStyle = `rgba(255, 200, 100, ${pulse})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const x = (i - 2.5) * 2;
            const y = (i % 2 === 0 ? -1 : 1) * 3;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          break;
          
        case 'capacitor':
          // Draw capacitor symbol
          ctx.strokeStyle = `rgba(255, 150, 255, ${pulse})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-3, -5);
          ctx.lineTo(-3, 5);
          ctx.moveTo(3, -5);
          ctx.lineTo(3, 5);
          ctx.stroke();
          break;
          
        case 'connection':
          // Draw connection point
          ctx.fillStyle = `rgba(0, 255, 200, ${pulse})`;
          ctx.beginPath();
          ctx.arc(0, 0, node.size, 0, Math.PI * 2);
          ctx.fill();
          break;
      }
      
      ctx.restore();
    };

    const drawConnection = (ctx: CanvasRenderingContext2D, from: CircuitNode, to: CircuitNode) => {
      ctx.strokeStyle = 'rgba(100, 150, 200, 0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const drawDataPacket = (ctx: CanvasRenderingContext2D, packet: DataPacket) => {
      const fromNode = nodesRef.current[packet.fromNode];
      const toNode = nodesRef.current[packet.toNode];
      
      const x = fromNode.x + (toNode.x - fromNode.x) * packet.progress;
      const y = fromNode.y + (toNode.y - fromNode.y) * packet.progress;
      
      // Main packet
      ctx.fillStyle = packet.color;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Trail effect with dissolving
      ctx.fillStyle = packet.color.replace(')', ', 0.3)');
      for (let i = 1; i <= 3; i++) {
        const trailProgress = Math.max(0, packet.progress - i * 0.05);
        if (trailProgress > 0) {
          const trailX = fromNode.x + (toNode.x - fromNode.x) * trailProgress;
          const trailY = fromNode.y + (toNode.y - fromNode.y) * trailProgress;
          const alpha = (1 - i * 0.3) * 0.5;
          
          ctx.fillStyle = packet.color.replace(')', `, ${alpha})`);
          ctx.beginPath();
          ctx.arc(trailX, trailY, 3 - i, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = (time: number) => {
      if (!ctx || !canvas) return;
      
      // Create dissolving trail effect
      if (trailRef.current) {
        ctx.putImageData(trailRef.current, 0, 0);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.05)'; // Dissolving effect
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = 'rgba(15, 23, 42, 1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // Draw circuit board grid
      ctx.strokeStyle = 'rgba(100, 150, 200, 0.1)';
      ctx.lineWidth = 0.5;
      const gridSize = 50;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Draw connections
      nodesRef.current.forEach((node, i) => {
        node.connections.forEach(connectionIndex => {
          if (connectionIndex > i) { // Avoid drawing connections twice
            drawConnection(ctx, node, nodesRef.current[connectionIndex]);
          }
        });
      });
      
      // Draw nodes
      nodesRef.current.forEach(node => {
        drawCircuitNode(ctx, node, time);
      });
      
      // Create new data packets
      createDataPacket();
      
      // Update and draw data packets
      packetsRef.current = packetsRef.current.filter(packet => {
        packet.progress += packet.speed;
        
        if (packet.progress >= 1) {
          return false; // Remove completed packets
        }
        
        drawDataPacket(ctx, packet);
        return true;
      });
      
      // Mouse interaction - illuminate nearby nodes
      nodesRef.current.forEach(node => {
        const distance = Math.hypot(node.x - mouseRef.current.x, node.y - mouseRef.current.y);
        if (distance < 100) {
          const intensity = (100 - distance) / 100;
          ctx.fillStyle = `rgba(0, 255, 255, ${intensity * 0.3})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size + 5, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      // Store current frame for trail effect
      trailRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    resizeCanvas();
    animate(0);

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

export default ReferencesBackground;
