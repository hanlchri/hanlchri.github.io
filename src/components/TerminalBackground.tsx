
import React, { useEffect, useRef, useState } from 'react';

const TerminalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationFrameRef = useRef<number | null>(null);
  
  // Terminal code snippets - extended for smoother scrolling
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
    '}',
    '',
    'public class Student {',
    '  private String name;',
    '  private int grade;',
    '  ',
    '  public Student(String name, int grade) {',
    '    this.name = name;',
    '    this.grade = grade;',
    '  }',
    '}',
    '',
    'HashMap<String, Integer> scores = new HashMap<>();',
    'scores.put("Alice", 95);',
    'scores.put("Bob", 87);',
    'scores.put("Charlie", 92);',
    '',
    'public static void bubbleSort(int[] arr) {',
    '  for (int i = 0; i < arr.length - 1; i++) {',
    '    for (int j = 0; j < arr.length - i - 1; j++) {',
    '      if (arr[j] > arr[j + 1]) {',
    '        int temp = arr[j];',
    '        arr[j] = arr[j + 1];',
    '        arr[j + 1] = temp;',
    '      }',
    '    }',
    '  }',
    '}',
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
      
      // Draw code lines with continuous scrolling effect
      for (let i = 0; i < codeLines.length * 2; i++) { // Draw text twice to create seamless scroll
        const lineIndex = i % codeLines.length;
        // Calculate y position with wrap-around effect
        const y = ((i * lineHeight) - yOffset) % (totalHeight * 2);
        
        // Only draw lines that are visible
        if (y > -lineHeight && y < canvas.height) {
          let codeLine = codeLines[lineIndex];
          
          // Randomize some characters for a "glitchy" effect, but less frequently
          if (Math.random() < 0.003) {
            const pos = Math.floor(Math.random() * codeLine.length);
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
            const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
            codeLine = codeLine.substring(0, pos) + randomChar + codeLine.substring(pos + 1);
          }
          
          // Add slight opacity variation
          ctx.globalAlpha = 0.7 + Math.random() * 0.3;
          
          // Draw code line
          ctx.fillText(codeLine, 20, y);
        }
      }
      
      // Reset opacity
      ctx.globalAlpha = 1.0;
      
      // Increment offset for scrolling effect (slower speed)
      yOffset += 0.3;
      if (yOffset >= totalHeight) {
        yOffset = 0; // Seamless reset
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
