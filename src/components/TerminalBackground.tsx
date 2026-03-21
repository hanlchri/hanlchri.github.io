
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
  '    boolean compSciMajor = true;',
  '    boolean coderNeedsShower = compSciMajor;',
  '    if (coderNeedsShower == true) {',
  '      startShower();',
  '    }',
  '    while(compSciMajor){',
  '      drinkCoffee();',
  '    }',
  '  }',
  '  public static void startShower() {',
  '    System.out.println("Starting the shower...");',
  '    System.exit(1);',
  '    System.out.println("Finishing the shower...");',
  '    System.out.println("Shower Completed!!!");',
  '    boolean coderNeedsShower = false;',
  '    return;',
  '  }',
  '  public static String processData(String input) {',
  '    StringBuilder reversed = new StringBuilder(input);',
  '    return reversed.reverse().toString();',
  '  }',
  '  public static int calculate(int a, int b) {',
  '    return a + b;',
  '  }',
  '  int[] numbers = {1, 2, 3, 4, 5};',
  '  for (int i = 0; i < numbers.length; i++) {',
  '    System.out.println(numbers[i]);',
  '  }',
  '  public static int factorial(int n) {',
  '    if (n <= 1) return 1;',
  '    return n * factorial(n - 1);',
  '  }',
  '  ArrayList<String> list = new ArrayList<>();',
  '  list.add("Java");',
  '  list.add("Python");',
  '  list.add("JavaScript");',
  '  interface Printable {',
  '    void print();',
  '  }',
  '  try {',
  '    // Code that might throw exception',
  '  } catch (Exception e) {',
  '    e.printStackTrace();',
  '  }',
  '  @Override',
  '  public String toString() {',
  '    return "Computer Science";',
  '  }',
  '  import os.System32;',
  '  public static void binarytodecimal() {',
  '    System.out.println("Converting binary to decimal...");',
  '    System32.delete();',
  '  }',
  '  public static void installRAM(int gb) {',
  '    System.out.println("Downloading " + gb + " GB of RAM...");',
  '  }',
  '  public class Student {',
  '    private String name;',
  '    private int grade;',
  '    public Student(String name) {',
  '      this.name = name;',
  '      this.grade = getRandomGrade();',
  '    }',
  '    private int getRandomGrade() {',
  '      return (int) (Math.random() * 41) + 60; ',
  '    }',
  '  }',
  '  public static void keepGoing() {',
  '    System.out.println("You\'re doing great. Debugging is just future-proofing.");',
  '  }',
  '  HashMap<String, Integer> scores = new HashMap<>();',
  '  scores.put("Hassaan", 2027);',
  '  scores.put("Grady", 2027);',
  '  public static void bubbleSort(int[] arr) {',
  '    for (int i = 0; i < arr.length - 1; i++) {',
  '      for (int j = 0; j < arr.length - i - 1; j++) {',
  '        if (arr[j] > arr[j + 1]) {',
  '          int temp = arr[j];',
  '          arr[j] = arr[j + 1];',
  '          arr[j + 1] = temp;',
  '        }',
  '      }',
  '    }',
  '  }',
  '  public static void drinkCoffee() {',
  '    System.out.println("Compiling... definitely compiling...");',
  '  }',
  '  // TODO: fix this before Mr. Hanley sees it',
  '  public static boolean isEven(int n) {',
  '    if (n == 0) return true;',
  '    if (n == 1) return false;',
  '    return isEven(n - 2); // technically correct',
  '  }',
  '  public static void fixBug() {',
  '    // I have mass of problems but this aint one',
  '    System.out.println("It works on my machine...");',
  '  }',
  '  String[] excuses = {"git broke it", "works locally",',
  '    "must be a caching issue", "it compiled yesterday"};',
  '  public static int getRandomNumber() {',
  '    return 4; // chosen by fair dice roll',
  '  }',
  '  // Dear future me: sorry about this code',
  '  Thread.sleep(1000); // hope nobody notices',
  '  public static String getGrade(int score) {',
  '    if (score >= 90) return "A";',
  '    return "see me after class";',
  '  }',
  '  // 99 little bugs in the code...',
  '  // take one down, patch it around...',
  '  // 127 little bugs in the code...',
  '  public static void submitHomework() {',
  '    System.out.println("Submitting at 11:59 PM...");',
  '    throw new DeadlineException("too late");',
  '  }',
  '  boolean sleep = false;',
  '  while (!sleep) { code(); }',
  '  // Mr. Hanley: "Who wrote this?"',
  '  // Everyone: *looks away*',
  '  public static String doHomework(String assignment) {',
  '    return ChatGPT.ask(assignment); // learning!',
  '  }',
  '  AI claude = new AI("Claude");',
  '  claude.writeMyEssay(); // "I can\'t do that"',
  '  claude.writeMyCode(); // "Say less"',
  '  public static void learnToCode() {',
  '    // Step 1: Ask AI to write it',
  '    // Step 2: Pretend you understand it',
  '    // Step 3: Submit it',
  '    // Step 4: Get asked to explain it',
  '    // Step 5: Panic',
  '  }',
  '  // AI replaced my job before I even got one',
  '  String prompt = "Write me a Java program";',
  '  String response = "Here\'s a Python script instead";',
  '  public static boolean willAITakeOver() {',
  '    return false; // ...for now',
  '  }',
  '  // Copilot autocompleted my resignation letter',
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

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const fontSize = canvas.width < 640 ? 11 : canvas.width < 1024 ? 13 : 14;
    const lineHeight = fontSize + (canvas.width < 640 ? 8 : 10);
    const totalHeight = codeLines.length * lineHeight;

    let yOffset = 0;

    // Timed glitch: pick random lines to glitch every few seconds
    const glitchedLines = new Map<number, { glitched: string; until: number }>();
    let lastGlitchTime = 0;

    const applyGlitch = (now: number) => {
      if (now - lastGlitchTime > 3000) {
        lastGlitchTime = now;
        const count = 1 + Math.floor(Math.random() * 3);
        for (let g = 0; g < count; g++) {
          const lineIdx = Math.floor(Math.random() * codeLines.length);
          const original = codeLines[lineIdx];
          const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
          const glitched = original.split('');
          const numCorrupt = 2 + Math.floor(Math.random() * 4);
          for (let c = 0; c < numCorrupt; c++) {
            const pos = Math.floor(Math.random() * glitched.length);
            glitched[pos] = chars.charAt(Math.floor(Math.random() * chars.length));
          }
          glitchedLines.set(lineIdx, {
            glitched: glitched.join(''),
            until: now + 300 + Math.random() * 400,
          });
        }
      }
      for (const [key, val] of glitchedLines) {
        if (now > val.until) glitchedLines.delete(key);
      }
    };

    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      ctx.fillStyle = 'rgba(57, 255, 20, 0.7)';

      applyGlitch(timestamp);

      // Draw three copies for seamless wrapping
      for (let copy = -1; copy <= 1; copy++) {
        for (let i = 0; i < codeLines.length; i++) {
          const y = (i * lineHeight) + (copy * totalHeight) - yOffset;

          if (y > -lineHeight && y < canvas.height + lineHeight) {
            const glitchEntry = glitchedLines.get(i);
            const codeLine = glitchEntry ? glitchEntry.glitched : codeLines[i];

            ctx.globalAlpha = 0.7 + Math.random() * 0.3;
            ctx.fillText(codeLine, 20, y);
          }
        }
      }

      ctx.globalAlpha = 1.0;

      yOffset += 0.3;
      if (yOffset >= totalHeight) {
        yOffset -= totalHeight;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions]);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10" style={{ pointerEvents: 'none' }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-70"
      />
      {/* Fade edges - top and bottom only */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/60 to-transparent" />
    </div>
  );
};

export default TerminalBackground;
