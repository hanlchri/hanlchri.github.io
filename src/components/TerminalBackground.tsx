
import React, { useEffect, useRef, useState } from 'react';

const TerminalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationFrameRef = useRef<number | null>(null);
  
  // Terminal code snippets
  const codeLines = [
    'public class Main {',
    '  public static void main(String[] args) {',
    '    System.out.println("Welcome to Hanley\'s Hood");',
    '  }',
    '}',
    '',
    'function processData(input) {',
    '  return input.split("").reverse().join("");',
    '}',
    '',
    'const result = calculate(5, 10);',
    'int[] numbers = {1, 2, 3, 4, 5};',
    'for (int i = 0; i < numbers.length; i++) {',
    '  System.out.println(numbers[i]);',
    '}',
    '',
    'public static int factorial(int n) {',
    '  if (n <= 1) return 1;',
    '  return n * factorial(n - 1);',
    '}',
    '',
    'ArrayList<String> list = new ArrayList<>();',
    'list.add("Java");',
    'list.add("Python");',
    'list.add("JavaScript");',
    '',
    'interface Printable {',
    '  void print();',
    '}',
    '',
    'try {',
    '  // Code that might throw exception',
    '} catch (Exception e) {',
    '  e.printStackTrace();',
    '}',
    '',
    '@Override',
    'public String toString() {',
    '  return "Computer Science";',
    '}'
  ];
  
  // Set up canvas dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Draw terminal code
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    let yOffset = 0;
    const lineHeight = 24;
    const totalHeight = codeLines.length * lineHeight;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = '14px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(57, 255, 20, 0.7)';
      
      // Draw code lines with scrolling effect
      const startLine = Math.floor(yOffset / lineHeight);
      const visibleLines = Math.ceil(canvas.height / lineHeight) + 1;
      
      for (let i = startLine; i < startLine + visibleLines; i++) {
        const lineIndex = i % codeLines.length;
        const y = (i * lineHeight) - (yOffset % lineHeight);
        
        // Randomize some characters for a "glitchy" effect
        let codeLine = codeLines[lineIndex];
        if (Math.random() < 0.01) {
          const pos = Math.floor(Math.random() * codeLine.length);
          const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
          const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
          codeLine = codeLine.substring(0, pos) + randomChar + codeLine.substring(pos + 1);
        }
        
        // Add slight opacity variation
        ctx.globalAlpha = 0.7 + Math.random() * 0.3;
        
        // Draw code line
        for (let x = 0; x < codeLine.length; x++) {
          const char = codeLine.charAt(x);
          const xPos = x * 8 + (Math.random() < 0.005 ? Math.random() * 2 - 1 : 0);
          ctx.fillText(char, xPos + 20, y);
        }
      }
      
      // Reset opacity
      ctx.globalAlpha = 1.0;
      
      // Increment offset for scrolling effect
      yOffset += 0.5;
      if (yOffset > totalHeight) {
        yOffset = 0;
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-70"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default TerminalBackground;
