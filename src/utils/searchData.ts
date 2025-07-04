
export interface SearchItem {
  id: number;
  title: string;
  description: string;
  category: 'assignment' | 'lesson' | 'resource' | 'bonus' | 'homework';
  page: 'java' | 'apcs';
  keywords: string[];
  filePath?: string;
}

const searchItems: SearchItem[] = [
  // APCS Assignments
  {
    id: 1,
    title: "1: Computer Components",
    description: "Learn about the basic components that make up a computer system",
    category: "assignment",
    page: "apcs",
    keywords: ["computer", "components", "hardware", "cpu", "memory", "storage"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment1_ComputerComponents.pdf"
  },
  {
    id: 2,
    title: "2: Operations Calculator",
    description: "Build a calculator that performs basic mathematical operations",
    category: "assignment",
    page: "apcs",
    keywords: ["calculator", "operations", "math", "addition", "subtraction", "multiplication", "division"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment2_Operations Calculator.pdf"
  },
  {
    id: 3,
    title: "3: Castle Stairs",
    description: "Create a program that draws castle stairs using loops and patterns",
    category: "assignment",
    page: "apcs",
    keywords: ["loops", "patterns", "drawing", "stairs", "castle", "graphics"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment3_CastleStairs.pdf"
  },
  {
    id: 4,
    title: "4: Matrix Computer Store",
    description: "Develop a computer store management system using object-oriented programming",
    category: "assignment",
    page: "apcs",
    keywords: ["oop", "objects", "classes", "store", "management", "inventory"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment4_ComputerStore.pdf"
  },
  {
    id: 5,
    title: "5: Reusable Components",
    description: "Learn to create reusable software components and methods",
    category: "assignment",
    page: "apcs",
    keywords: ["methods", "functions", "reusable", "components", "modular", "programming"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment5_DoubleIntVerifier.pdf"
  },
  {
    id: 6,
    title: "9: String Methods",
    description: "Master string manipulation and processing techniques",
    category: "assignment",
    page: "apcs",
    keywords: ["strings", "methods", "manipulation", "text", "processing", "charAt", "substring"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment9_Strings.pdf"
  },
  {
    id: 7,
    title: "18: Hangman",
    description: "Create the classic word-guessing game using arrays and string processing",
    category: "assignment",
    page: "apcs",
    keywords: ["hangman", "game", "arrays", "strings", "guessing", "loops"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment18_Hangman.pdf"
  },
  {
    id: 8,
    title: "Turn Based Strategy Game",
    description: "Design and implement a complex turn-based strategy game",
    category: "assignment",
    page: "apcs",
    keywords: ["game", "strategy", "turn-based", "complex", "design", "implementation"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment_TurnBasedStrategyGame.pdf"
  },

  // APCS Homework
  {
    id: 9,
    title: "Inheritance Hierarchy",
    description: "Practice creating class hierarchies using inheritance",
    category: "homework",
    page: "apcs",
    keywords: ["inheritance", "hierarchy", "classes", "extends", "super", "polymorphism"],
    filePath: "/documents/APCS/Homework/APCS_Homework_InheritanceHierarchy.pdf"
  },
  {
    id: 10,
    title: "Array Copying",
    description: "Learn different techniques for copying arrays in Java",
    category: "homework",
    page: "apcs",
    keywords: ["arrays", "copying", "clone", "system.arraycopy", "reference", "deep copy"],
    filePath: "/documents/APCS/Homework/APCS_Homework_ArrayCopying.pdf"
  },
  {
    id: 11,
    title: "Paint BullsEye and Scalable House",
    description: "Create graphics programs that draw bullseye patterns and scalable houses",
    category: "homework",
    page: "apcs",
    keywords: ["graphics", "painting", "bullseye", "house", "scalable", "drawing"],
    filePath: "/documents/APCS/Homework/APCS_Homework_PaintBullsEyeHouse.pdf"
  },

  // APCS Lessons
  {
    id: 12,
    title: "Unit 1 Review",
    description: "Comprehensive review of fundamental Java concepts",
    category: "lesson",
    page: "apcs",
    keywords: ["review", "fundamentals", "java", "basics", "unit 1", "concepts"],
    filePath: "/documents/APCS/Lessons/APCS_Lesson_JavaReview_FilledOut.docx"
  },
  {
    id: 13,
    title: "Unit 4 Object Oriented",
    description: "Deep dive into object-oriented programming principles",
    category: "lesson",
    page: "apcs",
    keywords: ["oop", "object-oriented", "classes", "objects", "encapsulation", "methods"],
    filePath: "/documents/APCS/Lessons/APCS_Lesson_OOP_FilledOut.docx"
  },
  {
    id: 14,
    title: "Unit 6 Arrays & ArrayLists",
    description: "Learn about arrays and dynamic array structures",
    category: "lesson",
    page: "apcs",
    keywords: ["arrays", "arraylist", "collections", "dynamic", "data structures"],
    filePath: "/documents/APCS/Lessons/APCS_Lesson_Arrays_FilledOut.docx"
  },

  // APCS Resources
  {
    id: 15,
    title: "Printing from Netbeans",
    description: "Guide for printing code and documents from NetBeans IDE",
    category: "resource",
    page: "apcs",
    keywords: ["printing", "netbeans", "ide", "code", "documentation"],
    filePath: "/documents/APCS/Resources/NetbeansPrintingGuide.pdf"
  },
  {
    id: 16,
    title: "The Cookbook",
    description: "Essential Java programming reference and quick solutions",
    category: "resource",
    page: "apcs",
    keywords: ["cookbook", "reference", "solutions", "java", "programming", "guide"],
    filePath: "/documents/APCS/Resources/Cookbook.pdf"
  },
  {
    id: 17,
    title: "GUI Survival Guide",
    description: "Complete guide to creating graphical user interfaces in Java",
    category: "resource",
    page: "apcs",
    keywords: ["gui", "interface", "swing", "graphics", "buttons", "windows"],
    filePath: "/documents/APCS/Resources/GUISurvivalGuide.pdf"
  },

  // Java Assignments
  {
    id: 18,
    title: "1: Basic Console Applications",
    description: "Introduction to Java programming with simple console applications",
    category: "assignment",
    page: "java",
    keywords: ["console", "basic", "introduction", "java", "applications", "beginners"],
    filePath: "/documents/Java/Assignments/Java_Assignment1_BasicConsoleApplications.pdf"
  },
  {
    id: 19,
    title: "2: Currency Converter",
    description: "Build a program that converts between different currencies",
    category: "assignment",
    page: "java",
    keywords: ["currency", "converter", "money", "exchange", "rates", "calculation"],
    filePath: "/documents/Java/Assignments/Java_Assignment2_CurrencyConverter.pdf"
  },
  {
    id: 20,
    title: "2.5: Change Calculator",
    description: "Calculate change for transactions and money handling",
    category: "assignment",
    page: "java",
    keywords: ["change", "calculator", "money", "transactions", "cash", "coins"],
    filePath: "/documents/Java/Assignments/Java_Assignment2.5_ChangeTwenty.pdf"
  },
  {
    id: 21,
    title: "3: Loops",
    description: "Master different types of loops and iteration in Java",
    category: "assignment",
    page: "java",
    keywords: ["loops", "for", "while", "iteration", "repetition", "control structures"],
    filePath: "/documents/Java/Assignments/Java_Assignment3_LoopPractice.pdf"
  },
  {
    id: 22,
    title: "4: Arrays",
    description: "Learn to work with arrays and data collections",
    category: "assignment",
    page: "java",
    keywords: ["arrays", "collections", "data", "indexing", "elements", "storage"],
    filePath: "/documents/Java/Assignments/Java_Assignment4_Budget.pdf"
  },
  {
    id: 23,
    title: "4.5: Object Oriented Basics",
    description: "Introduction to object-oriented programming concepts",
    category: "assignment",
    page: "java",
    keywords: ["oop", "objects", "classes", "basics", "introduction", "programming"],
    filePath: "/documents/Java/Assignments/Java_Assignment4.5_Object_Oriented_Basics.pdf"
  },
  {
    id: 24,
    title: "6: Final Project",
    description: "Comprehensive final project incorporating all course concepts",
    category: "assignment",
    page: "java",
    keywords: ["final", "project", "comprehensive", "culminating", "portfolio"],
    filePath: "/documents/Java/Assignments/Java_Assignment6_FinalProject.pdf"
  },

  // Java Homework
  {
    id: 25,
    title: "Glossary Terms",
    description: "Important programming terminology and definitions",
    category: "homework",
    page: "java",
    keywords: ["glossary", "terms", "definitions", "vocabulary", "programming"],
    filePath: "/documents/Java/Homework/GlossaryTerms.pdf"
  },
  {
    id: 26,
    title: "Java Loops HW",
    description: "Practice exercises for mastering loop structures",
    category: "homework",
    page: "java",
    keywords: ["loops", "practice", "exercises", "for", "while", "iteration"],
    filePath: "/documents/Java/Homework/Java_Loops_HW.pdf"
  },

  // Java Lessons
  {
    id: 27,
    title: "Flowcharting Lesson",
    description: "Learn to create flowcharts for program planning and design",
    category: "lesson",
    page: "java",
    keywords: ["flowchart", "planning", "design", "algorithm", "logic", "diagram"],
    filePath: "/documents/Java/Lessons/Java_Lesson_FlowCharting_Blank.docx"
  },
  {
    id: 28,
    title: "Math Operations",
    description: "Mathematical operations and calculations in Java programming",
    category: "lesson",
    page: "java",
    keywords: ["math", "operations", "calculations", "arithmetic", "operators"],
    filePath: "/documents/Java/Lessons/Java_Lesson_MathOperators_FilledOut.docx"
  },
  {
    id: 29,
    title: "Looping & Random",
    description: "Combining loops with random number generation techniques",
    category: "lesson",
    page: "java",
    keywords: ["loops", "random", "numbers", "generation", "math.random", "iteration"],
    filePath: "/documents/Java/Lessons/Java_Lesson_Random_FilledOut.docx"
  },

  // Java Resources
  {
    id: 30,
    title: "Textbook Chapters 1 and 2",
    description: "Foundational chapters covering Java basics and programming fundamentals",
    category: "resource",
    page: "java",
    keywords: ["textbook", "chapters", "basics", "fundamentals", "foundation"],
    filePath: "/documents/Java/Lessons/TeachJavaVer1.pdf"
  },
  {
    id: 31,
    title: "The Cookbook (Java)",
    description: "Essential Java programming reference and quick solutions",
    category: "resource",
    page: "java",
    keywords: ["cookbook", "reference", "solutions", "java", "programming", "guide"],
    filePath: "/documents/Java/Resources/Cookbook.pdf"
  },
  {
    id: 32,
    title: "Guide for Round Buttons",
    description: "Tutorial for creating custom round buttons in Java GUI applications",
    category: "resource",
    page: "java",
    keywords: ["gui", "buttons", "round", "custom", "interface", "design"],
    filePath: "/documents/Java/Resources/GUISurvivalGuide.pdf"
  }
];

export const searchAssignments = (query: string): SearchItem[] => {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) return [];
  
  return searchItems.filter(item => {
    const titleMatch = item.title.toLowerCase().includes(searchTerm);
    const descriptionMatch = item.description.toLowerCase().includes(searchTerm);
    const keywordMatch = item.keywords.some(keyword => 
      keyword.toLowerCase().includes(searchTerm)
    );
    const categoryMatch = item.category.toLowerCase().includes(searchTerm);
    
    return titleMatch || descriptionMatch || keywordMatch || categoryMatch;
  }).sort((a, b) => {
    // Prioritize title matches
    const aTitle = a.title.toLowerCase().includes(searchTerm);
    const bTitle = b.title.toLowerCase().includes(searchTerm);
    
    if (aTitle && !bTitle) return -1;
    if (!aTitle && bTitle) return 1;
    
    return 0;
  });
};
