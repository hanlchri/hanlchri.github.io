
import React, { useEffect, useState } from 'react';

const TerminalBackground: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    const codeSnippets = [
      "public class HelloWorld {",
      "  public static void main(String[] args) {",
      "    System.out.println(\"Welcome to Hanley's Hood\");",
      "  }",
      "}",
      "",
      "for (int i = 0; i < array.length; i++) {",
      "  if (array[i] > max) max = array[i];",
      "}",
      "",
      "ArrayList<String> list = new ArrayList<>();",
      "list.add(\"Java\");",
      "list.add(\"AP Computer Science\");",
      "",
      "public static int binarySearch(int[] arr, int target) {",
      "  int left = 0, right = arr.length - 1;",
      "  while (left <= right) {",
      "    int mid = left + (right - left) / 2;",
      "    if (arr[mid] == target) return mid;",
      "    if (arr[mid] < target) left = mid + 1;",
      "    else right = mid - 1;",
      "  }",
      "  return -1;",
      "}"
    ];
    
    // Initialize with some random lines
    const initialLines: string[] = [];
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * codeSnippets.length);
      initialLines.push(codeSnippets[randomIndex]);
    }
    setLines(initialLines);
    
    // Add new lines periodically
    const interval = setInterval(() => {
      setLines(prevLines => {
        const newLines = [...prevLines];
        const randomIndex = Math.floor(Math.random() * codeSnippets.length);
        // Remove first line and add a new one at the end
        newLines.shift();
        newLines.push(codeSnippets[randomIndex]);
        return newLines;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
      <div className="absolute inset-0 bg-black opacity-90"></div>
      <div className="absolute inset-0 p-4 font-mono text-green-400 text-sm overflow-hidden">
        {lines.map((line, index) => (
          <div 
            key={index} 
            className="whitespace-pre opacity-60 animate-fade-in"
            style={{ textShadow: '0 0 5px rgba(0, 255, 0, 0.7)' }}
          >
            {line ? `> ${line}` : '>'}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-tech-dark to-transparent opacity-40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,100,0,0.1)_0%,rgba(0,0,0,0.3)_100%)]"></div>
    </div>
  );
};

export default TerminalBackground;
