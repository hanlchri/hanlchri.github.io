
import React, { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const consoleMessagesRef = useRef<string[]>([
    "// ERROR 404: Page not found",
    "try {",
    "  findPage('" + location.pathname + "');",
    "} catch(error) {",
    "  console.error('Route not found');",
    "}",
    "",
    "// Let's try some other approaches...",
    "",
    "Java: System.out.println(\"Page not found. Try again!\");",
    "Python: print(\"Page not found. Try again!\")",
    "JavaScript: console.log(\"Page not found. Try again!\");",
    "TypeScript: console.log(\"Page not found. Try again!\" as string);",
    "C++: cout << \"Page not found. Try again!\" << endl;",
    "C#: Console.WriteLine(\"Page not found. Try again!\");",
    "Rust: println!(\"Page not found. Try again!\");",
    "Go: fmt.Println(\"Page not found. Try again!\")",
    "Swift: print(\"Page not found. Try again!\")",
    "Kotlin: println(\"Page not found. Try again!\")",
    "Ruby: puts \"Page not found. Try again!\"",
    "PHP: echo \"Page not found. Try again!\";",
    "SQL: SELECT 'Page not found. Try again!';",
    "Bash: echo \"Page not found. Try again!\"",
    "",
    "// Redirecting to home page in 10 seconds...",
    "// Or click the button below to go back home",
  ]);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Terminal animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let fontSize = 16;
    let lineHeight = fontSize * 1.5;
    let startX = 40;
    let startY = 40;
    let currentLine = 0;
    let charIndex = 0;
    
    const typeText = () => {
      if (!ctx) return;
      
      ctx.fillStyle = '#121212';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Display all fully typed lines
      for (let i = 0; i < currentLine; i++) {
        ctx.fillStyle = i === 0 ? '#FF5252' : '#39FF14';
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
        ctx.fillText(consoleMessagesRef.current[i], startX, startY + (i * lineHeight));
      }
      
      // Display current line being typed
      if (currentLine < consoleMessagesRef.current.length) {
        const currentText = consoleMessagesRef.current[currentLine].substring(0, charIndex);
        ctx.fillStyle = currentLine === 0 ? '#FF5252' : '#39FF14';
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
        ctx.fillText(currentText, startX, startY + (currentLine * lineHeight));
        
        charIndex++;
        
        // Move to next line when current line is fully typed
        if (charIndex > consoleMessagesRef.current[currentLine].length) {
          currentLine++;
          charIndex = 0;
        }
      }
      
      // Add blinking cursor
      if (currentLine < consoleMessagesRef.current.length) {
        const cursorX = startX + ctx.measureText(consoleMessagesRef.current[currentLine].substring(0, charIndex)).width;
        const cursorY = startY + (currentLine * lineHeight);
        
        if (Math.floor(Date.now() / 500) % 2 === 0) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(cursorX, cursorY - fontSize + 3, 10, fontSize);
        }
      }
    };
    
    const animationInterval = setInterval(typeText, 20);
    
    // Redirect to home page after typing completes + 3 seconds
    const typingDuration = consoleMessagesRef.current.reduce((acc, line) => acc + line.length, 0) * 20;
    const redirectTimeout = setTimeout(() => {
      window.location.href = '/';
    }, typingDuration + 3000);
    
    return () => {
      clearInterval(animationInterval);
      clearTimeout(redirectTimeout);
    };
  }, [location.pathname]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black relative">
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full z-0"
      ></canvas>
      
      <div className="relative z-10 flex flex-col items-center justify-center">
        <h1 className="text-8xl font-bold mb-8 text-tech-neon glitch">404</h1>
        
        <Link 
          to="/" 
          className="mt-8 px-6 py-3 bg-tech-purple hover:bg-tech-purple/80 text-white rounded-lg 
           font-mono text-lg transition-all duration-300 border border-tech-cyan/30 hover:border-tech-cyan 
           shadow-[0_0_12px_rgba(51,195,240,0.3)] hover:shadow-[0_0_20px_rgba(51,195,240,0.5)]"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
