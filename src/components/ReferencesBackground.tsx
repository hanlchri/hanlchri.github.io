
import React, { useEffect, useRef } from 'react';

interface CircuitNode {
  x: number;
  y: number;
  type: 'processor' | 'resistor' | 'capacitor' | 'connector';
  size: number;
  rotation: number;
  pulsePhase: number;
}

interface CircuitConnection {
  start: CircuitNode;
  end: CircuitNode;
  isActive: boolean;
  dataFlow: number;
}

const ReferencesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nodesRef = useRef<CircuitNode[]>([]);
  const connectionsRef = useRef<CircuitConnection[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const initializeCircuit = () => {
      nodesRef.current = [];
      connectionsRef.current = [];

      // Create grid-based circuit layout
      const gridSize = 80;
      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (Math.random() < 0.3) { // 30% chance for a component
            const types: CircuitNode['type'][] = ['processor', 'resistor', 'capacitor', 'connector'];
            const type = types[Math.floor(Math.random() * types.length)];
            
            nodesRef.current.push({
              x: i * gridSize + (Math.random() - 0.5) * 20,
              y: j * gridSize + (Math.random() - 0.5) * 20,
              type,
              size: type === 'processor' ? 12 : type === 'resistor' ? 8 : 6,
              rotation: Math.random() * Math.PI * 2,
              pulsePhase: Math.random() * Math.PI * 2
            });
          }
        }
      }

      // Create connections between nearby nodes
      nodesRef.current.forEach(node => {
        const nearbyNodes = nodesRef.current.filter(other => {
          if (other === node) return false;
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          return distance < 120 && Math.random() < 0.4;
        });

        nearbyNodes.forEach(other => {
          connectionsRef.current.push({
            start: node,
            end: other,
            isActive: Math.random() < 0.3,
            dataFlow: Math.random()
          });
        });
      });
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeCircuit();
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawProcessor = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, pulse: number) => {
      const intensity = 0.8 + Math.sin(pulse) * 0.2;
      
      ctx.save();
      ctx.translate(x, y);
      
      // Main chip body
      ctx.fillStyle = `rgba(70, 130, 180, ${intensity})`;
      ctx.fillRect(-size/2, -size/2, size, size);
      
      // Corner pins
      ctx.fillStyle = `rgba(255, 215, 0, ${intensity})`;
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        const pinX = Math.cos(angle) * (size/2 + 2);
        const pinY = Math.sin(angle) * (size/2 + 2);
        ctx.fillRect(pinX - 1, pinY - 1, 2, 2);
      }
      
      // Center core
      ctx.fillStyle = `rgba(0, 255, 255, ${intensity * 0.8})`;
      ctx.fillRect(-size/4, -size/4, size/2, size/2);
      
      ctx.restore();
    };

    const drawResistor = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      // Resistor body
      ctx.strokeStyle = 'rgba(139, 69, 19, 0.8)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-size, 0);
      ctx.lineTo(-size/2, 0);
      ctx.lineTo(-size/3, -size/3);
      ctx.lineTo(-size/6, size/3);
      ctx.lineTo(size/6, -size/3);
      ctx.lineTo(size/3, size/3);
      ctx.lineTo(size/2, 0);
      ctx.lineTo(size, 0);
      ctx.stroke();
      
      ctx.restore();
    };

    const drawCapacitor = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.save();
      ctx.translate(x, y);
      
      // Capacitor plates
      ctx.strokeStyle = 'rgba(255, 165, 0, 0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-2, -size/2);
      ctx.lineTo(-2, size/2);
      ctx.moveTo(2, -size/2);
      ctx.lineTo(2, size/2);
      ctx.stroke();
      
      // Connection lines
      ctx.beginPath();
      ctx.moveTo(-size, 0);
      ctx.lineTo(-2, 0);
      ctx.moveTo(2, 0);
      ctx.lineTo(size, 0);
      ctx.stroke();
      
      ctx.restore();
    };

    const drawConnector = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.save();
      ctx.translate(x, y);
      
      ctx.fillStyle = 'rgba(192, 192, 192, 0.8)';
      ctx.beginPath();
      ctx.arc(0, 0, size/2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = 'rgba(105, 105, 105, 0.8)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      ctx.restore();
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      // Dark industrial background
      ctx.fillStyle = 'rgba(15, 20, 25, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;

      // Draw connections first (behind components)
      connectionsRef.current.forEach(connection => {
        const { start, end, isActive } = connection;
        
        ctx.save();
        
        if (isActive) {
          // Animated data flow
          connection.dataFlow += 0.02;
          if (connection.dataFlow > 1) connection.dataFlow = 0;
          
          const flowX = start.x + (end.x - start.x) * connection.dataFlow;
          const flowY = start.y + (end.y - start.y) * connection.dataFlow;
          
          // Draw connection line
          ctx.strokeStyle = 'rgba(0, 255, 127, 0.4)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);
          ctx.stroke();
          
          // Draw data packet
          ctx.fillStyle = 'rgba(0, 255, 127, 0.8)';
          ctx.shadowColor = 'rgba(0, 255, 127, 1)';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(flowX, flowY, 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Inactive connection
          ctx.strokeStyle = 'rgba(100, 100, 100, 0.2)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);
          ctx.stroke();
        }
        
        ctx.restore();
      });

      // Draw circuit components
      nodesRef.current.forEach(node => {
        node.pulsePhase += 0.02;
        
        ctx.shadowBlur = 5;
        ctx.shadowColor = node.type === 'processor' ? 'rgba(0, 255, 255, 0.5)' : 
                          node.type === 'resistor' ? 'rgba(139, 69, 19, 0.5)' :
                          node.type === 'capacitor' ? 'rgba(255, 165, 0, 0.5)' :
                          'rgba(192, 192, 192, 0.3)';
        
        switch (node.type) {
          case 'processor':
            drawProcessor(ctx, node.x, node.y, node.size, node.pulsePhase);
            break;
          case 'resistor':
            drawResistor(ctx, node.x, node.y, node.size, node.rotation);
            break;
          case 'capacitor':
            drawCapacitor(ctx, node.x, node.y, node.size);
            break;
          case 'connector':
            drawConnector(ctx, node.x, node.y, node.size);
            break;
        }
        
        ctx.shadowBlur = 0;
      });

      // Add some random electrical sparks
      if (Math.random() < 0.02) {
        const sparkX = Math.random() * canvas.width;
        const sparkY = Math.random() * canvas.height;
        
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 0, 0.8)';
        ctx.lineWidth = 2;
        ctx.shadowColor = 'rgba(255, 255, 0, 1)';
        ctx.shadowBlur = 10;
        
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = Math.random() * Math.PI * 2;
          const length = Math.random() * 20 + 5;
          const endX = sparkX + Math.cos(angle) * length;
          const endY = sparkY + Math.sin(angle) * length;
          
          ctx.moveTo(sparkX, sparkY);
          ctx.lineTo(endX, endY);
        }
        ctx.stroke();
        ctx.restore();
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-70"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ReferencesBackground;
