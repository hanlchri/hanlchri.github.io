export interface SearchItem {
  id: number;
  title: string;
  description: string;
  category: 'assignment' | 'lesson' | 'resource' | 'bonus' | 'homework' | 'gallery';
  page: 'java' | 'apcs' | 'gallery' | 'references';
  keywords: string[];
  filePath?: string;
}

const searchItems: SearchItem[] = [
  // APCS Assignments
  {
    id: 1,
    title: "0: Summer Assignment",
    description: "Preparatory summer assignment covering programming fundamentals",
    category: "assignment",
    page: "apcs",
    keywords: ["summer", "preparation", "fundamentals", "intro", "basics"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment0_SummerAssignment.pdf"
  },
  {
    id: 2,
    title: "1: Computer Components",
    description: "Learn about the basic components that make up a computer system",
    category: "assignment",
    page: "apcs",
    keywords: ["computer", "components", "hardware", "cpu", "memory", "storage"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment1_ComputerComponents.pdf"
  },
  {
    id: 3,
    title: "2: Operations Calculator",
    description: "Build a calculator that performs basic mathematical operations",
    category: "assignment",
    page: "apcs",
    keywords: ["calculator", "operations", "math", "addition", "subtraction", "multiplication", "division"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment2_Operations Calculator.pdf"
  },
  {
    id: 4,
    title: "3: Castle Stairs",
    description: "Create a program that draws castle stairs using loops and patterns",
    category: "assignment",
    page: "apcs",
    keywords: ["loops", "patterns", "drawing", "stairs", "castle", "graphics"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment3_CastleStairs.pdf"
  },
  {
    id: 5,
    title: "4: Computer Store",
    description: "Develop a computer store management system using object-oriented programming",
    category: "assignment",
    page: "apcs",
    keywords: ["oop", "objects", "classes", "store", "management", "inventory"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment4_ComputerStore.pdf"
  },
  {
    id: 6,
    title: "5: Double Int Verifier",
    description: "Learn to create reusable software components and methods",
    category: "assignment",
    page: "apcs",
    keywords: ["methods", "functions", "reusable", "components", "modular", "programming", "verifier"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment5_DoubleIntVerifier.pdf"
  },
  {
    id: 7,
    title: "6: Group Presentations",
    description: "Collaborative presentations on computer science topics",
    category: "assignment",
    page: "apcs",
    keywords: ["presentations", "group", "collaboration", "topics", "communication"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment6_GroupPresentations.pdf"
  },
  {
    id: 8,
    title: "7: Developing Classes",
    description: "Learn to design and implement custom classes in Java",
    category: "assignment",
    page: "apcs",
    keywords: ["classes", "oop", "design", "implementation", "custom", "objects"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment7_DevelopingClasses.pdf"
  },
  {
    id: 9,
    title: "8: OOP Round 2",
    description: "Advanced object-oriented programming concepts and practices",
    category: "assignment",
    page: "apcs",
    keywords: ["oop", "advanced", "objects", "classes", "inheritance", "polymorphism"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment8_OOPRound2.pdf"
  },
  {
    id: 10,
    title: "9: Strings",
    description: "Master string manipulation and processing techniques",
    category: "assignment",
    page: "apcs",
    keywords: ["strings", "methods", "manipulation", "text", "processing", "charAt", "substring"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment9_Strings.pdf"
  },
  {
    id: 11,
    title: "10: 2D Arrays",
    description: "Work with two-dimensional arrays and matrix operations",
    category: "assignment",
    page: "apcs",
    keywords: ["arrays", "2d", "matrix", "two-dimensional", "data", "structures"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment10_2DArrays.pdf"
  },
  {
    id: 12,
    title: "11: List Manager",
    description: "Create a program to manage lists and collections",
    category: "assignment",
    page: "apcs",
    keywords: ["lists", "arraylist", "collections", "management", "data", "structures"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment11_ListManager.pdf"
  },
  {
    id: 13,
    title: "12: Polymorphism",
    description: "Understand and implement polymorphism in object-oriented programming",
    category: "assignment",
    page: "apcs",
    keywords: ["polymorphism", "oop", "inheritance", "override", "overload", "methods", "multiple", "forms"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment12_Polymorphism.pdf"
  },
  {
    id: 14,
    title: "13: Software Essay",
    description: "Write an essay analyzing software engineering principles",
    category: "assignment",
    page: "apcs",
    keywords: ["essay", "software", "engineering", "principles", "analysis", "writing"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment13_SoftwareEssay.pdf"
  },
  {
    id: 15,
    title: "14: Stacks",
    description: "Implement and work with stack data structures",
    category: "assignment",
    page: "apcs",
    keywords: ["stacks", "data", "structures", "lifo", "push", "pop", "algorithms"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment14_Stacks.pdf"
  },
  {
    id: 16,
    title: "15: Recursion",
    description: "Master recursive algorithms and problem-solving techniques",
    category: "assignment",
    page: "apcs",
    keywords: ["recursion", "recursive", "algorithms", "base", "case", "problem", "solving"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment15_Recursion.pdf"
  },
  {
    id: 17,
    title: "16: Intel Pentium Bug Essay",
    description: "Research and write about the famous Intel Pentium floating-point bug",
    category: "assignment",
    page: "apcs",
    keywords: ["intel", "pentium", "bug", "floating", "point", "essay", "research"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment16_IntelPentiumBugEssay.pdf"
  },
  {
    id: 18,
    title: "17: Sorting and Searching",
    description: "Implement and analyze sorting and searching algorithms",
    category: "assignment",
    page: "apcs",
    keywords: ["sorting", "searching", "algorithms", "bubble", "selection", "insertion", "binary"],
    filePath: "/documents/APCS/Assignments/APCS_Assign17_Sorting_and_Searching.pdf"
  },
  {
    id: 19,
    title: "18: Hangman",
    description: "Create the classic word-guessing game using arrays and string processing",
    category: "assignment",
    page: "apcs",
    keywords: ["hangman", "game", "arrays", "strings", "guessing", "loops"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment18_Hangman.pdf"
  },
  {
    id: 20,
    title: "Turn Based Strategy Game",
    description: "Design and implement a complex turn-based strategy game",
    category: "assignment",
    page: "apcs",
    keywords: ["game", "strategy", "turn-based", "complex", "design", "implementation"],
    filePath: "/documents/APCS/Assignments/APCS_Assignment_TurnBasedStrategyGame.pdf"
  },

  // APCS Homework
  {
    id: 21,
    title: "Coffee Seller V2",
    description: "Advanced coffee shop simulation with enhanced features",
    category: "homework",
    page: "apcs",
    keywords: ["coffee", "simulation", "business", "seller", "shop", "advanced"],
    filePath: "/documents/APCS/Homework/APCSHomework_Coffee_SellerV2.pdf"
  },
  {
    id: 22,
    title: "Array Copying",
    description: "Learn different techniques for copying arrays in Java",
    category: "homework",
    page: "apcs",
    keywords: ["arrays", "copying", "clone", "system.arraycopy", "reference", "deep copy"],
    filePath: "/documents/APCS/Homework/APCS_Homework_ArrayCopying.pdf"
  },
  {
    id: 23,
    title: "ENIAC",
    description: "Research assignment about the first general-purpose computer",
    category: "homework",
    page: "apcs",
    keywords: ["eniac", "computer", "history", "first", "general", "purpose"],
    filePath: "/documents/APCS/Homework/APCS_Homework_ENIAC.pdf"
  },
  {
    id: 24,
    title: "Graphics Patterns",
    description: "Create visual patterns using Java graphics programming",
    category: "homework",
    page: "apcs",
    keywords: ["graphics", "patterns", "visual", "drawing", "java", "programming"],
    filePath: "/documents/APCS/Homework/APCS_Homework_Graphics_Patterns.pdf"
  },
  {
    id: 25,
    title: "Inheritance Hierarchy",
    description: "Practice creating class hierarchies using inheritance",
    category: "homework",
    page: "apcs",
    keywords: ["inheritance", "hierarchy", "classes", "extends", "super", "polymorphism"],
    filePath: "/documents/APCS/Homework/APCS_Homework_InheritanceHierarchy.pdf"
  },
  {
    id: 26,
    title: "Paint BullsEye and House",
    description: "Create graphics programs that draw bullseye patterns and scalable houses",
    category: "homework",
    page: "apcs",
    keywords: ["graphics", "painting", "bullseye", "house", "scalable", "drawing"],
    filePath: "/documents/APCS/Homework/APCS_Homework_PaintBullsEyeHouse.pdf"
  },
  {
    id: 27,
    title: "Pythagorean Triples",
    description: "Mathematical programming assignment exploring Pythagorean theorem",
    category: "homework",
    page: "apcs",
    keywords: ["pythagorean", "triples", "mathematics", "theorem", "programming"],
    filePath: "/documents/APCS/Homework/APCS_Homework_PythagoreanTriples.pdf"
  },
  {
    id: 28,
    title: "Roach Population",
    description: "Simulation modeling population growth dynamics",
    category: "homework",
    page: "apcs",
    keywords: ["population", "growth", "simulation", "modeling", "dynamics"],
    filePath: "/documents/APCS/Homework/APCS_Homework_RoachPopulation.pdf"
  },
  {
    id: 29,
    title: "Spread Stars",
    description: "Graphics programming assignment creating star patterns",
    category: "homework",
    page: "apcs",
    keywords: ["stars", "patterns", "graphics", "spread", "visual"],
    filePath: "/documents/APCS/Homework/APCS_Homework_SpreadStars.pdf"
  },

  // APCS Lessons
  {
    id: 30,
    title: "Advanced OOP",
    description: "Advanced object-oriented programming concepts and design patterns",
    category: "lesson",
    page: "apcs",
    keywords: ["oop", "advanced", "design", "patterns", "object-oriented", "programming"],
    filePath: "/documents/APCS/Lessons/APCS_Lesson_AdvancedOOP_FilledOut.docx"
  },
  {
    id: 31,
    title: "ArrayLists",
    description: "Learn about dynamic array structures and collections",
    category: "lesson",
    page: "apcs",
    keywords: ["arraylist", "collections", "dynamic", "arrays", "data", "structures"],
    filePath: "/documents/APCS/Lessons/APCS_Lesson_ArrayLists_FilledOut.docx"
  },
  {
    id: 32,
    title: "Arrays",
    description: "Comprehensive guide to working with arrays in Java",
    category: "lesson",
    page: "apcs",
    keywords: ["arrays", "indexing", "elements", "collections", "data", "structures"],
    filePath: "/documents/APCS/Lessons/APCS_Lesson_Arrays_FilledOut.docx"
  },
  {
    id: 33,
    title: "Assigning Bases",
    description: "Understanding different number bases and conversions",
    category: "lesson",
    page: "apcs",
    keywords: ["bases", "binary", "hexadecimal", "octal", "conversion", "numbers"],
    filePath: "/documents/APCS/Lessons/APCS_Lesson_AssigningBases_FilledOut.docx"
  },
  {
    id: 34,
    title: "Class Imports",
    description: "Learn how to import and use external classes and packages",
    category: "lesson",
    page: "apcs",
    keywords: ["imports", "packages", "classes", "external", "libraries"],
    filePath: "/documents/APCS/Lessons/APCS_Lesson_ClassImports_FilledOut.docx"
  },
  {
    id: 35,
    title: "Files and I/O",
    description: "File input/output operations and data persistence",
    category: "lesson",
    page: "apcs",
    keywords: ["files", "io", "input", "output", "persistence", "data", "scanner"],
    filePath: "/documents/APCS/Lessons/APCS_Lesson_FilesIO_FilledOut.docx"
  },
  {
    id: 36,
    title: "For Each Loop",
    description: "Enhanced for loops for iterating through collections",
    category: "lesson",
    page: "apcs",
    keywords: ["foreach", "enhanced", "loops", "iteration", "collections"],
    filePath: "/documents/APCS/Lessons/APCS_Lesson_ForEachLoop_FilledOut.docx"
  },
  {
    id: 37,
    title: "Inheritance",
    description: "Object-oriented inheritance concepts and implementation",
    category: "lesson",
    page: "apcs",
    keywords: ["inheritance", "extends", "super", "hierarchy", "oop", "polymorphism"],
    filePath: "/documents/APCS/Lessons/APCS_Lesson_Inheritance_FilledOut.docx"
  },
  {
    id: 38,
    title: "Interfaces",
    description: "Understanding and implementing interfaces in Java",
    category: "lesson",
    page: "apcs",
    keywords: ["interfaces", "implements", "abstract", "methods", "contracts"],
    filePath: "/documents/APCS/Lessons/APCS_Lesson_Interfaces_FilledOut.docx"
  },
  {
    id: 39,
    title: "Java Review",
    description: "Comprehensive review of fundamental Java concepts",
    category: "lesson",
    page: "apcs",
    keywords: ["review", "fundamentals", "java", "basics", "concepts"],
    filePath: "/documents/APCS/Lessons/APCS_Lesson_JavaReview_FilledOut.docx"
  },
  {
    id: 40,
    title: "Midterm Review",
    description: "Review materials for midterm examination",
    category: "lesson",
    page: "apcs",
    keywords: ["midterm", "review", "exam", "preparation", "study"],
    filePath: "/documents/APCS/Lessons/APCS_Lesson_MidtermReview_FilledOut.docx"
  },
  {
    id: 41,
    title: "Object-Oriented Programming",
    description: "Introduction to object-oriented programming principles",
    category: "lesson",
    page: "apcs",
    keywords: ["oop", "object-oriented", "classes", "objects", "encapsulation"],
    filePath: "/documents/APCS/Lessons/APCS_Lesson_OOP_FilledOut.docx"
  },
  {
    id: 42,
    title: "Objects Presentation",
    description: "Visual presentation about objects and classes",
    category: "lesson",
    page: "apcs",
    keywords: ["objects", "classes", "presentation", "visual", "oop"],
    filePath: "/documents/APCS/Lessons/APCS_Lesson_Objects_FilledOut.pptx"
  },
  {
    id: 43,
    title: "Parameter Passing",
    description: "Understanding how parameters are passed in Java methods",
    category: "lesson",
    page: "apcs",
    keywords: ["parameters", "passing", "methods", "arguments", "reference", "value"],
    filePath: "/documents/APCS/Lessons/APCS_Lesson_ParamPassing_FilledOut.docx"
  },
  {
    id: 44,
    title: "Polymorphism",
    description: "Advanced polymorphism concepts and implementation strategies",
    category: "lesson",
    page: "apcs",
    keywords: ["polymorphism", "override", "overload", "inheritance", "multiple", "forms", "oop"],
    filePath: "/documents/APCS/Lessons/APCS_Lesson_Polymorphism_FilledOut.docx"
  },
  {
    id: 45,
    title: "Random Numbers",
    description: "Generating and working with random numbers in programming",
    category: "lesson",
    page: "apcs",
    keywords: ["random", "numbers", "math", "generation", "probability"],
    filePath: "/documents/APCS/Lessons/APCS_Lesson_Random_FilledOut.docx"
  },
  {
    id: 46,
    title: "Recursion",
    description: "Understanding recursive algorithms and problem-solving",
    category: "lesson",
    page: "apcs",
    keywords: ["recursion", "recursive", "algorithms", "base", "case", "self", "calling"],
    filePath: "/documents/APCS/Lessons/APCS_Lesson_Recursion_FilledOut.docx"
  },
  {
    id: 47,
    title: "Round-off Error",
    description: "Understanding floating-point precision and computational errors",
    category: "lesson",
    page: "apcs",
    keywords: ["roundoff", "error", "floating", "point", "precision", "computational"],
    filePath: "/documents/APCS/Lessons/APCS_Lesson_RoundOffError_FilledOut.docx"
  },
  {
    id: 48,
    title: "Short Circuit Evaluation",
    description: "Boolean logic and short-circuit evaluation in Java",
    category: "lesson",
    page: "apcs",
    keywords: ["boolean", "logic", "short", "circuit", "evaluation", "operators"],
    filePath: "/documents/APCS/Lessons/APCS_Lesson_ShortEval_FilledOut.docx"
  },
  {
    id: 49,
    title: "Strings",
    description: "String manipulation and processing techniques",
    category: "lesson",
    page: "apcs",
    keywords: ["strings", "manipulation", "processing", "text", "methods"],
    filePath: "/documents/APCS/Lessons/APCS_Lesson_Strings_FilledOut.docx"
  },

  // APCS Resources
  {
    id: 50,
    title: "Cookbook",
    description: "Essential Java programming reference and quick solutions",
    category: "resource",
    page: "apcs",
    keywords: ["cookbook", "reference", "solutions", "java", "programming", "guide"],
    filePath: "/documents/APCS/Resources/Cookbook.pdf"
  },
  {
    id: 51,
    title: "GUI Survival Guide",
    description: "Complete guide to creating graphical user interfaces in Java",
    category: "resource",
    page: "apcs",
    keywords: ["gui", "interface", "swing", "graphics", "buttons", "windows"],
    filePath: "/documents/APCS/Resources/GUISurvivalGuide.pdf"
  },
  {
    id: 52,
    title: "NetBeans Printing Guide",
    description: "Guide for printing code and documents from NetBeans IDE",
    category: "resource",
    page: "apcs",
    keywords: ["printing", "netbeans", "ide", "code", "documentation"],
    filePath: "/documents/APCS/Resources/NetbeansPrintingGuide.pdf"
  },

  // APCS Bonus Projects
  {
    id: 53,
    title: "Base Converter",
    description: "Convert numbers between different number bases",
    category: "bonus",
    page: "apcs",
    keywords: ["base", "converter", "binary", "hexadecimal", "octal", "decimal"],
    filePath: "/documents/APCS/Bonus/APCS_Bonus_BaseConverter.pdf"
  },
  {
    id: 54,
    title: "BlackJack",
    description: "Implement the classic card game BlackJack",
    category: "bonus",
    page: "apcs",
    keywords: ["blackjack", "card", "game", "casino", "21", "gambling"],
    filePath: "/documents/APCS/Bonus/APCS_Bonus_BlackJack.pdf"
  },
  {
    id: 55,
    title: "Hotel System",
    description: "Design a hotel management and reservation system",
    category: "bonus",
    page: "apcs",
    keywords: ["hotel", "management", "reservation", "system", "booking"],
    filePath: "/documents/APCS/Bonus/APCS_Bonus_HotelSystem.pdf"
  },
  {
    id: 56,
    title: "PNZ (Plants vs Zombies Clone)",
    description: "Create a tower defense game inspired by Plants vs Zombies",
    category: "bonus",
    page: "apcs",
    keywords: ["plants", "zombies", "tower", "defense", "game", "strategy"],
    filePath: "/documents/APCS/Bonus/APCS_Bonus_PNZ.pdf"
  },
  {
    id: 57,
    title: "Risk",
    description: "Implement the board game Risk as a computer program",
    category: "bonus",
    page: "apcs",
    keywords: ["risk", "board", "game", "strategy", "conquest", "armies"],
    filePath: "/documents/APCS/Bonus/APCS_Bonus_Risk.pdf"
  },
  {
    id: 58,
    title: "Yahtzee",
    description: "Create the classic dice game Yahtzee",
    category: "bonus",
    page: "apcs",
    keywords: ["yahtzee", "dice", "game", "scoring", "probability"],
    filePath: "/documents/APCS/Bonus/APCS_Bonus_Yahtzee.pdf"
  },

  // Java Assignments
  {
    id: 59,
    title: "1: Basic Console Applications",
    description: "Introduction to Java programming with simple console applications",
    category: "assignment",
    page: "java",
    keywords: ["console", "basic", "introduction", "java", "applications", "beginners"],
    filePath: "/documents/Java/Assignments/Java_Assignment1_BasicConsoleApplications.pdf"
  },
  {
    id: 60,
    title: "2: Currency Converter",
    description: "Build a program that converts between different currencies",
    category: "assignment",
    page: "java",
    keywords: ["currency", "converter", "money", "exchange", "rates", "calculation"],
    filePath: "/documents/Java/Assignments/Java_Assignment2_CurrencyConverter.pdf"
  },
  {
    id: 61,
    title: "2.5: Change Calculator",
    description: "Calculate change for transactions and money handling",
    category: "assignment",
    page: "java",
    keywords: ["change", "calculator", "money", "transactions", "cash", "coins"],
    filePath: "/documents/Java/Assignments/Java_Assignment2.5_ChangeTwenty.pdf"
  },
  {
    id: 62,
    title: "3: Loop Practice",
    description: "Master different types of loops and iteration in Java",
    category: "assignment",
    page: "java",
    keywords: ["loops", "for", "while", "iteration", "repetition", "control", "structures"],
    filePath: "/documents/Java/Assignments/Java_Assignment3_LoopPractice.pdf"
  },
  {
    id: 63,
    title: "4: Budget",
    description: "Create a budget management application with arrays",
    category: "assignment",
    page: "java",
    keywords: ["budget", "arrays", "collections", "data", "financial", "management"],
    filePath: "/documents/Java/Assignments/Java_Assignment4_Budget.pdf"
  },
  {
    id: 64,
    title: "4: RackO",
    description: "Implement the card game RackO using arrays and algorithms",
    category: "assignment",
    page: "java",
    keywords: ["racko", "card", "game", "arrays", "algorithms", "sorting"],
    filePath: "/documents/Java/Assignments/Java_Assignment4_RackO.pdf"
  },
  {
    id: 65,
    title: "4.5: Object Oriented Basics",
    description: "Introduction to object-oriented programming concepts",
    category: "assignment",
    page: "java",
    keywords: ["oop", "objects", "classes", "basics", "introduction", "programming"],
    filePath: "/documents/Java/Assignments/Java_Assignment4.5_Object_Oriented_Basics.pdf"
  },
  {
    id: 66,
    title: "5: Swing Basics",
    description: "Learn GUI programming with Java Swing components",
    category: "assignment",
    page: "java",
    keywords: ["swing", "gui", "interface", "components", "buttons", "windows"],
    filePath: "/documents/Java/Assignments/Java_Assignment5_SwingBasics.pdf"
  },
  {
    id: 67,
    title: "6: Final Project",
    description: "Comprehensive final project incorporating all course concepts",
    category: "assignment",
    page: "java",
    keywords: ["final", "project", "comprehensive", "culminating", "portfolio"],
    filePath: "/documents/Java/Assignments/Java_Assignment6_FinalProject.pdf"
  },

  // Java Homework
  {
    id: 68,
    title: "Glossary Terms",
    description: "Important programming terminology and definitions",
    category: "homework",
    page: "java",
    keywords: ["glossary", "terms", "definitions", "vocabulary", "programming"],
    filePath: "/documents/Java/Homework/GlossaryTerms.pdf"
  },
  {
    id: 69,
    title: "Java Arrays HW",
    description: "Practice exercises for working with arrays",
    category: "homework",
    page: "java",
    keywords: ["arrays", "practice", "exercises", "indexing", "elements"],
    filePath: "/documents/Java/Homework/JavaHWArrays.pdf"
  },
  {
    id: 70,
    title: "Java Loops HW",
    description: "Practice exercises for mastering loop structures",
    category: "homework",
    page: "java",
    keywords: ["loops", "practice", "exercises", "for", "while", "iteration"],
    filePath: "/documents/Java/Homework/Java_Loops_HW.pdf"
  },

  // Java Lessons
  {
    id: 71,
    title: "Arrays",
    description: "Comprehensive guide to working with arrays in Java",
    category: "lesson",
    page: "java",
    keywords: ["arrays", "indexing", "elements", "collections", "data", "structures"],
    filePath: "/documents/Java/Lessons/Java_Lesson_Arrays_FilledOut.docx"
  },
  {
    id: 72,
    title: "Course Review",
    description: "Comprehensive review of all course materials",
    category: "lesson",
    page: "java",
    keywords: ["course", "review", "comprehensive", "materials", "study"],
    filePath: "/documents/Java/Lessons/Java_Lesson_CourseReview.pptm"
  },
  {
    id: 73,
    title: "Final Review",
    description: "Review materials for final examination",
    category: "lesson",
    page: "java",
    keywords: ["final", "review", "exam", "preparation", "study"],
    filePath: "/documents/Java/Lessons/Java_Lesson_FinalReview.docx"
  },
  {
    id: 74,
    title: "Flowcharting",
    description: "Learn to create flowcharts for program planning and design",
    category: "lesson",
    page: "java",
    keywords: ["flowchart", "planning", "design", "algorithm", "logic", "diagram"],
    filePath: "/documents/Java/Lessons/Java_Lesson_FlowCharting_Blank.docx"
  },
  {
    id: 75,
    title: "Data Modeling Introduction",
    description: "Introduction to data modeling concepts and techniques",
    category: "lesson",
    page: "java",
    keywords: ["data", "modeling", "introduction", "concepts", "techniques"],
    filePath: "/documents/Java/Lessons/Java_Lesson_Intro_To_DataModeling_Blank_FilledOut.docx"
  },
  {
    id: 76,
    title: "Looping",
    description: "Comprehensive guide to loops and iteration structures",
    category: "lesson",
    page: "java",
    keywords: ["loops", "looping", "iteration", "for", "while", "structures"],
    filePath: "/documents/Java/Lessons/Java_Lesson_Looping_FilledOut.docx"
  },
  {
    id: 77,
    title: "Math Operators",
    description: "Mathematical operations and calculations in Java programming",
    category: "lesson",
    page: "java",
    keywords: ["math", "operations", "calculations", "arithmetic", "operators"],
    filePath: "/documents/Java/Lessons/Java_Lesson_MathOperators_FilledOut.docx"
  },
  {
    id: 78,
    title: "Random Numbers",
    description: "Generating and working with random numbers",
    category: "lesson",
    page: "java",
    keywords: ["random", "numbers", "generation", "math", "probability"],
    filePath: "/documents/Java/Lessons/Java_Lesson_Random_FilledOut.docx"
  },
  {
    id: 79,
    title: "Scope",
    description: "Understanding variable scope and accessibility in Java",
    category: "lesson",
    page: "java",
    keywords: ["scope", "variables", "accessibility", "local", "global"],
    filePath: "/documents/Java/Lessons/Java_Lesson_Scope_FilledOut.docx"
  },
  {
    id: 80,
    title: "Selection Statements",
    description: "Conditional statements and decision-making in programming",
    category: "lesson",
    page: "java",
    keywords: ["selection", "conditional", "if", "else", "switch", "decisions"],
    filePath: "/documents/Java/Lessons/Java_Lesson_SelectionStatements_FilledOut.docx"
  },
  {
    id: 81,
    title: "Income Tax Calculator",
    description: "Flowchart example for calculating income tax",
    category: "lesson",
    page: "java",
    keywords: ["income", "tax", "calculator", "flowchart", "example"],
    filePath: "/documents/Java/Lessons/Flowchart_Income_Tax_Problem.pdf"
  },
  {
    id: 82,
    title: "Tax Calculator Program",
    description: "Implementation guide for tax calculation program",
    category: "lesson",
    page: "java",
    keywords: ["tax", "calculator", "program", "implementation", "guide"],
    filePath: "/documents/Java/Lessons/TaxCalc.pdf"
  },
  {
    id: 83,
    title: "TeachJava Textbook",
    description: "Foundational textbook covering Java basics and programming fundamentals",
    category: "lesson",
    page: "java",
    keywords: ["textbook", "teachjava", "basics", "fundamentals", "foundation"],
    filePath: "/documents/Java/Lessons/TeachJavaVer1.pdf"
  },

  // Java Resources
  {
    id: 84,
    title: "Cookbook (Java)",
    description: "Essential Java programming reference and quick solutions",
    category: "resource",
    page: "java",
    keywords: ["cookbook", "reference", "solutions", "java", "programming", "guide"],
    filePath: "/documents/Java/Resources/Cookbook.pdf"
  },
  {
    id: 85,
    title: "GUI Survival Guide (Java)",
    description: "Complete guide to creating graphical user interfaces in Java",
    category: "resource",
    page: "java",
    keywords: ["gui", "interface", "swing", "graphics", "buttons", "windows"],
    filePath: "/documents/Java/Resources/GUISurvivalGuide.pdf"
  },
  {
    id: 86,
    title: "NetBeans Printing Guide (Java)",
    description: "Guide for printing code and documents from NetBeans IDE",
    category: "resource",
    page: "java",
    keywords: ["printing", "netbeans", "ide", "code", "documentation"],
    filePath: "/documents/Java/Resources/NetbeansPrintingGuide.pdf"
  },

  // Java Bonus Projects
  {
    id: 87,
    title: "Coin Flip",
    description: "Simple probability simulation with coin flipping",
    category: "bonus",
    page: "java",
    keywords: ["coin", "flip", "probability", "simulation", "random"],
    filePath: "/documents/Java/Bonus/Java_Bonus_CoinFlip.pdf"
  },
  {
    id: 88,
    title: "Fox, Goose, and Grain",
    description: "Classic logic puzzle implementation",
    category: "bonus",
    page: "java",
    keywords: ["fox", "goose", "grain", "puzzle", "logic", "classic"],
    filePath: "/documents/Java/Bonus/Java_Bonus_FoxGooseGrain.pdf"
  },

  // Gallery Items
  {
    id: 89,
    title: "P5.js Interactive Game",
    description: "A creative JavaScript game built with p5.js created by Mr. Hanley",
    category: "gallery",
    page: "gallery",
    keywords: ["p5js", "javascript", "game", "interactive", "creative", "hanley"],
    filePath: "/gallery/files/p5-game.js"
  },
  {
    id: 90,
    title: "Java Swing Demo",
    description: "Java Swing example demonstrating GUI programming",
    category: "gallery",
    page: "gallery",
    keywords: ["java", "swing", "gui", "demo", "programming", "example"],
    filePath: "/gallery/files/swing-demo.jar"
  }
];

// Enhanced keyword matching for better semantic search
const getKeywordScore = (searchTerm: string, keywords: string[]): number => {
  const lowerTerm = searchTerm.toLowerCase();
  let score = 0;
  
  // Special mappings for common abbreviations and concepts
  const semanticMappings: { [key: string]: string[] } = {
    'oop': ['object', 'oriented', 'programming', 'class', 'inheritance', 'polymorphism', 'encapsulation'],
    'gui': ['swing', 'graphics', 'interface', 'window', 'button', 'frame'],
    'io': ['input', 'output', 'file', 'scanner', 'reader', 'writer'],
    'ai': ['artificial', 'intelligence', 'machine', 'learning'],
    'api': ['application', 'programming', 'interface'],
    'sql': ['database', 'query', 'structured', 'language'],
    'html': ['markup', 'web', 'browser', 'tag'],
    'css': ['style', 'design', 'layout', 'formatting'],
    'js': ['javascript', 'web', 'browser', 'script'],
    'recursion': ['recursive', 'function', 'call', 'itself', 'base', 'case'],
    'array': ['list', 'collection', 'data', 'structure', 'index'],
    'loop': ['iteration', 'for', 'while', 'repeat', 'cycle'],
    'string': ['text', 'character', 'word', 'manipulation'],
    'inheritance': ['extends', 'super', 'parent', 'child', 'class', 'hierarchy'],
    'polymorphism': ['override', 'overload', 'method', 'different', 'forms', 'multiple'],
    'encapsulation': ['private', 'public', 'protected', 'access', 'modifier', 'data', 'hiding'],
    'abstraction': ['abstract', 'interface', 'concept', 'implementation', 'hiding'],
    'sorting': ['bubble', 'selection', 'insertion', 'merge', 'quick', 'heap'],
    'searching': ['linear', 'binary', 'find', 'locate', 'search'],
    'data structures': ['array', 'list', 'stack', 'queue', 'tree', 'graph'],
    'algorithms': ['sorting', 'searching', 'recursive', 'iterative', 'optimization']
  };
  
  // Check for semantic mappings first
  if (semanticMappings[lowerTerm]) {
    const relatedTerms = semanticMappings[lowerTerm];
    for (const keyword of keywords) {
      const lowerKeyword = keyword.toLowerCase();
      for (const relatedTerm of relatedTerms) {
        if (lowerKeyword.includes(relatedTerm) || relatedTerm.includes(lowerKeyword)) {
          score += 10; // High score for semantic matches
        }
      }
    }
  }
  
  // Original keyword matching
  for (const keyword of keywords) {
    const lowerKeyword = keyword.toLowerCase();
    if (lowerKeyword === lowerTerm) {
      score += 15; // Exact match
    } else if (lowerKeyword.includes(lowerTerm)) {
      score += 8; // Partial match
    } else if (lowerTerm.includes(lowerKeyword)) {
      score += 5; // Reverse partial match
    }
  }
  
  return score;
};

export const searchAssignments = (query: string): SearchItem[] => {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase();
  const results: Array<SearchItem & { score: number }> = [];
  
  searchItems.forEach(item => {
    let score = 0;
    
    // Title matching (highest priority)
    if (item.title.toLowerCase().includes(lowerQuery)) {
      score += 20;
    }
    
    // Description matching
    if (item.description.toLowerCase().includes(lowerQuery)) {
      score += 10;
    }
    
    // Category matching
    if (item.category.toLowerCase().includes(lowerQuery)) {
      score += 8;
    }
    
    // Enhanced keyword matching
    score += getKeywordScore(lowerQuery, item.keywords);
    
    // Page matching
    if (item.page.toLowerCase().includes(lowerQuery)) {
      score += 5;
    }
    
    if (score > 0) {
      results.push({ ...item, score });
    }
  });
  
  // Sort by score (highest first)
  return results
    .sort((a, b) => b.score - a.score)
    .map(({ score, ...item }) => item);
};

// Get all items for a specific page
export const getItemsByPage = (page: 'java' | 'apcs' | 'gallery' | 'references'): SearchItem[] => {
  return searchItems.filter(item => item.page === page);
};

// Get all items by category
export const getItemsByCategory = (category: SearchItem['category']): SearchItem[] => {
  return searchItems.filter(item => item.category === category);
};

// Get all available categories
export const getAllCategories = (): string[] => {
  return Array.from(new Set(searchItems.map(item => item.category)));
};

// Get all available pages
export const getAllPages = (): string[] => {
  return Array.from(new Set(searchItems.map(item => item.page)));
};