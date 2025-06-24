
import React, { useEffect, useRef } from 'react';

interface CircuitNode {
  x: number;
  y: number;
  type: 'processor' | 'resistor' | 'capacitor' | 'junction';
  size: number;
  pulsePhase: number;
  connections: number[];
}

interface Circuit {
  nodes: CircuitNode[];
  connections: { from: number; to: number; active: boolean; pulsePosition: number }[];
}

const ReferencesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const circuitRef = useRef<Circuit>({ nodes: [], connections: [] });
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const initializeCircuit = () => {
      const nodes: CircuitNode[] = [];
      const gridSize = 80;
      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);

      // Create grid of circuit nodes
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (Math.random() > 0.3) { // 70% chance to place a node
            const x = col * gridSize + (Math.random() - 0.5) * 20;
            const y = row * gridSize + (Math.random() - 0.5) * 20;
            
            let type: CircuitNode['type'] = 'junction';
            if (Math.random() < 0.2) type = 'processor';
            else if (Math.random() < 0.4) type = 'resistor';
            else if (Math.random() < 0.6) type = 'capacitor';
            
            nodes.push({
              x,
              y,
              type,
              size: type === 'processor' ? 12 : type === 'junction' ? 4 : 8,
              pulsePhase: Math.random() * Math.PI * 2,
              connections: []
            });
          }
        }
      }

      // Create connections between nearby nodes
      const connections: Circuit['connections'] = [];
      nodes.forEach((node, i) => {
        nodes.forEach((otherNode, j) => {
          if (i !== j) {
            const distance = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) + 
              Math.pow(node.y - otherNode.y, 2)
            );
            
            if (distance < 120 && Math.random() > 0.7) {
              connections.push({
                from: i,
                to: j,
                active: Math.random() > 0.5,
                pulsePosition: Math.random()
              });
            }
          }
        });
      });

      circuitRef.current = { nodes, connections };
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeCircuit();
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawProcessor = (x: number, y: number, size: number, glow: number) => {
      ctx.save();
      
      // Outer casing
      ctx.fillStyle = `rgba(120, 150, 180, ${0.8 + glow * 0.3})`;
      ctx.fillRect(x - size, y - size, size * 2, size * 2);
      
      // Inner circuits
      ctx.fillStyle = `rgba(80, 200, 120, ${0.6 + glow * 0.4})`;
      ctx.fillRect(x - size * 0.7, y - size * 0.7, size * 1.4, size * 0.3);
      ctx.fillRect(x - size * 0.3, y - size * 0.7, size * 0.3, size * 1.4);
      
      // Glow effect
      if (glow > 0.5) {
        ctx.shadowColor = 'rgba(80, 200, 120, 0.8)';
        ctx.shadowBlur = 15;
        ctx.fillStyle = `rgba(80, 200, 120, ${(glow - 0.5) * 0.5})`;
        ctx.fillRect(x - size * 1.2, y - size * 1.2, size * 2.4, size * 2.4);
      }
      
      ctx.restore();
    };

    const drawResistor = (x: number, y: number, size: number, glow: number) => {
      ctx.save();
      
      ctx.strokeStyle = `rgba(200, 150, 100, ${0.7 + glow * 0.3})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      // Zigzag pattern
      const steps = 6;
      const stepSize = size / steps;
      ctx.moveTo(x - size, y);
      for (let i = 0; i < steps; i++) {
        const zigX = x - size + i * stepSize * 2;
        const zigY = y + (i % 2 === 0 ? -stepSize : stepSize);
        ctx.lineTo(zigX, zigY);
      }
      ctx.lineTo(x + size, y);
      ctx.stroke();
      
      ctx.restore();
    };

    const drawCapacitor = (x: number, y: number, size: number, glow: number) => {
      ctx.save();
      
      ctx.strokeStyle = `rgba(180, 120, 200, ${0.7 + glow * 0.3})`;
      ctx.lineWidth = 4;
      
      // Two parallel lines
      ctx.beginPath();
      ctx.moveTo(x - 2, y - size);
      ctx.lineTo(x - 2, y + size);
      ctx.moveTo(x + 2, y - size);
      ctx.lineTo(x + 2, y + size);
      ctx.stroke();
      
      ctx.restore();
    };

    const drawJunction = (x: number, y: number, size: number, glow: number) => {
      ctx.save();
      
      ctx.fillStyle = `rgba(150, 150, 150, ${0.8 + glow * 0.2})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      if (glow > 0.7) {
        ctx.shadowColor = 'rgba(150, 150, 150, 0.6)';
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      
      ctx.restore();
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear with dark industrial background
      ctx.fillStyle = 'rgba(15, 20, 25, 0.95)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;

      // Draw connections first
      circuitRef.current.connections.forEach(connection => {
        const fromNode = circuitRef.current.nodes[connection.from];
        const toNode = circuitRef.current.nodes[connection.to];
        
        if (!fromNode || !toNode) return;

        ctx.save();
        
        if (connection.active) {
          // Animated connection
          connection.pulsePosition += 0.02;
          if (connection.pulsePosition > 1) connection.pulsePosition = 0;
          
          // Draw the circuit trace
          ctx.strokeStyle = 'rgba(100, 140, 160, 0.6)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.stroke();
          
          // Draw moving pulse
          const pulseX = fromNode.x + (toNode.x - fromNode.x) * connection.pulsePosition;
          const pulseY = fromNode.y + (toNode.y - fromNode.y) * connection.pulsePosition;
          
          ctx.fillStyle = 'rgba(80, 200, 120, 0.9)';
          ctx.shadowColor = 'rgba(80, 200, 120, 0.8)';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Inactive connection
          ctx.strokeStyle = 'rgba(60, 80, 90, 0.4)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.stroke();
        }
        
        ctx.restore();
      });

      // Draw nodes
      circuitRef.current.nodes.forEach(node => {
        node.pulsePhase += 0.02;
        const glow = (Math.sin(node.pulsePhase) + 1) / 2;
        
        switch (node.type) {
          case 'processor':
            drawProcessor(node.x, node.y, node.size, glow);
            break;
          case 'resistor':
            drawResistor(node.x, node.y, node.size, glow);
            break;
          case 'capacitor':
            drawCapacitor(node.x, node.y, node.size, glow);
            break;
          case 'junction':
            drawJunction(node.x, node.y, node.size, glow);
            break;
        }
      });

      // Randomly activate/deactivate connections
      if (Math.random() < 0.02) {
        const randomConnection = circuitRef.current.connections[
          Math.floor(Math.random() * circuitRef.current.connections.length)
        ];
        if (randomConnection) {
          randomConnection.active = !randomConnection.active;
        }
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
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-80"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ReferencesBackground;
