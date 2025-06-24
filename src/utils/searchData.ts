
export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: 'assignment' | 'lesson' | 'resource' | 'bonus' | 'homework';
  page: 'java' | 'ap-cs';
  keywords: string[];
  filePath?: string;
}

const searchItems: SearchItem[] = [
  // Java Assignments
  {
    id: 'java-assign1',
    title: 'Basic Console Applications',
    description: 'Introduction to Java programming with console input/output',
    category: 'assignment',
    page: 'java',
    keywords: ['console', 'input', 'output', 'basic', 'introduction', 'scanner', 'print'],
    filePath: './documents/Java/Assignments/Java_Assignment1_BasicConsoleApplications.pdf'
  },
  {
    id: 'java-assign2',
    title: 'Currency Converter',
    description: 'Build a currency conversion application',
    category: 'assignment',
    page: 'java',
    keywords: ['currency', 'converter', 'math', 'calculation', 'exchange', 'rates'],
    filePath: './documents/Java/Assignments/Java_Assignment2_CurrencyConverter.pdf'
  },
  {
    id: 'java-assign2-5',
    title: 'Change Twenty',
    description: 'Calculate change from twenty dollar bills',
    category: 'assignment',
    page: 'java',
    keywords: ['change', 'money', 'calculation', 'twenty', 'cash', 'register'],
    filePath: './documents/Java/Assignments/Java_Assignment2.5_ChangeTwenty.pdf'
  },
  {
    id: 'java-assign3',
    title: 'Loop Practice',
    description: 'Practice with for loops, while loops, and iteration',
    category: 'assignment',
    page: 'java',
    keywords: ['loops', 'for', 'while', 'iteration', 'repetition', 'control', 'flow'],
    filePath: './documents/Java/Assignments/Java_Assignment3_LoopPractice.pdf'
  },
  {
    id: 'java-assign4',
    title: 'Budget Application',
    description: 'Create a budget management application',
    category: 'assignment',
    page: 'java',
    keywords: ['budget', 'money', 'management', 'finance', 'expenses', 'income'],
    filePath: './documents/Java/Assignments/Java_Assignment4_Budget.pdf'
  },
  {
    id: 'java-assign4-rackO',
    title: 'RackO Game',
    description: 'Implement the RackO card game',
    category: 'assignment',
    page: 'java',
    keywords: ['racko', 'game', 'cards', 'arrays', 'sorting', 'strategy'],
    filePath: './documents/Java/Assignments/Java_Assignment4_RackO.pdf'
  },
  {
    id: 'java-assign4-5',
    title: 'Object Oriented Basics',
    description: 'Introduction to object-oriented programming concepts',
    category: 'assignment',
    page: 'java',
    keywords: ['object', 'oriented', 'oop', 'class', 'instance', 'methods', 'fields', 'encapsulation', 'objects'],
    filePath: './documents/Java/Assignments/Java_Assignment4.5_Object_Oriented_Basics.pdf'
  },
  {
    id: 'java-assign5',
    title: 'Swing Basics',
    description: 'Introduction to GUI programming with Swing',
    category: 'assignment',
    page: 'java',
    keywords: ['swing', 'gui', 'interface', 'buttons', 'windows', 'graphics', 'ui'],
    filePath: './documents/Java/Assignments/Java_Assignment5_SwingBasics.pdf'
  },
  {
    id: 'java-assign6',
    title: 'Final Project',
    description: 'Comprehensive final project for Java course',
    category: 'assignment',
    page: 'java',
    keywords: ['final', 'project', 'comprehensive', 'culminating', 'portfolio'],
    filePath: './documents/Java/Assignments/Java_Assignment6_FinalProject.pdf'
  },

  // APCS Assignments
  {
    id: 'apcs-assign0',
    title: 'Summer Assignment',
    description: 'Pre-course summer preparation assignment',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['summer', 'preparation', 'intro', 'basics', 'getting', 'started'],
    filePath: './documents/APCS/Assignments/APCS_Assignment0_SummerAssignment.pdf'
  },
  {
    id: 'apcs-assign1',
    title: 'Computer Components',
    description: 'Learn about computer hardware and components',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['computer', 'components', 'hardware', 'cpu', 'memory', 'storage'],
    filePath: './documents/APCS/Assignments/APCS_Assignment1_ComputerComponents.pdf'
  },
  {
    id: 'apcs-assign2',
    title: 'Operations Calculator',
    description: 'Build a calculator for mathematical operations',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['calculator', 'operations', 'math', 'arithmetic', 'computation'],
    filePath: './documents/APCS/Assignments/APCS_Assignment2_Operations Calculator.pdf'
  },
  {
    id: 'apcs-assign3',
    title: 'Castle Stairs',
    description: 'Programming challenge involving stairs and patterns',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['castle', 'stairs', 'patterns', 'loops', 'nested', 'output'],
    filePath: './documents/APCS/Assignments/APCS_Assignment3_CastleStairs.pdf'
  },
  {
    id: 'apcs-assign4',
    title: 'Computer Store',
    description: 'Simulate a computer store inventory system',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['store', 'inventory', 'computer', 'shop', 'management', 'system'],
    filePath: './documents/APCS/Assignments/APCS_Assignment4_ComputerStore.pdf'
  },
  {
    id: 'apcs-assign5',
    title: 'Double Int Verifier',
    description: 'Verify and validate double and integer inputs',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['double', 'int', 'verifier', 'validation', 'input', 'checking'],
    filePath: './documents/APCS/Assignments/APCS_Assignment5_DoubleIntVerifier.pdf'
  },
  {
    id: 'apcs-assign6',
    title: 'Group Presentations',
    description: 'Collaborative presentation assignment',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['group', 'presentations', 'collaboration', 'teamwork', 'speaking'],
    filePath: './documents/APCS/Assignments/APCS_Assignment6_GroupPresentations.pdf'
  },
  {
    id: 'apcs-assign7',
    title: 'Developing Classes',
    description: 'Learn to create and design custom classes',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['classes', 'developing', 'design', 'object', 'oriented', 'oop', 'custom', 'methods', 'fields'],
    filePath: './documents/APCS/Assignments/APCS_Assignment7_DevelopingClasses.pdf'
  },
  {
    id: 'apcs-assign8',
    title: 'OOP Round 2',
    description: 'Advanced object-oriented programming concepts',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['oop', 'object', 'oriented', 'advanced', 'inheritance', 'polymorphism', 'encapsulation'],
    filePath: './documents/APCS/Assignments/APCS_Assignment8_OOPRound2.pdf'
  },
  {
    id: 'apcs-assign9',
    title: 'Strings',
    description: 'String manipulation and processing',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['strings', 'text', 'manipulation', 'processing', 'methods', 'substring'],
    filePath: './documents/APCS/Assignments/APCS_Assignment9_Strings.pdf'
  },
  {
    id: 'apcs-assign10',
    title: '2D Arrays',
    description: 'Working with two-dimensional arrays',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['2d', 'arrays', 'two', 'dimensional', 'matrix', 'grid', 'table'],
    filePath: './documents/APCS/Assignments/APCS_Assignment10_2DArrays.pdf'
  },
  {
    id: 'apcs-assign11',
    title: 'List Manager',
    description: 'Manage and manipulate lists of data',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['list', 'manager', 'arraylist', 'collections', 'data', 'structures'],
    filePath: './documents/APCS/Assignments/APCS_Assignment11_ListManager.pdf'
  },
  {
    id: 'apcs-assign12',
    title: 'Polymorphism',
    description: 'Understanding and implementing polymorphism',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['polymorphism', 'inheritance', 'override', 'virtual', 'methods', 'oop', 'object', 'oriented'],
    filePath: './documents/APCS/Assignments/APCS_Assignment12_Polymorphism.pdf'
  },
  {
    id: 'apcs-assign13',
    title: 'Software Essay',
    description: 'Write an essay about software development',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['software', 'essay', 'writing', 'development', 'analysis', 'research'],
    filePath: './documents/APCS/Assignments/APCS_Assignment13_SoftwareEssay.pdf'
  },
  {
    id: 'apcs-assign14',
    title: 'Stacks',
    description: 'Implement and use stack data structures',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['stacks', 'data', 'structures', 'lifo', 'push', 'pop', 'collections'],
    filePath: './documents/APCS/Assignments/APCS_Assignment14_Stacks.pdf'
  },
  {
    id: 'apcs-assign15',
    title: 'Recursion',
    description: 'Master recursive programming techniques',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['recursion', 'recursive', 'functions', 'base', 'case', 'algorithms'],
    filePath: './documents/APCS/Assignments/APCS_Assignment15_Recursion.pdf'
  },
  {
    id: 'apcs-assign16',
    title: 'Intel Pentium Bug Essay',
    description: 'Research and write about the Intel Pentium bug',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['intel', 'pentium', 'bug', 'essay', 'history', 'computer', 'error'],
    filePath: './documents/APCS/Assignments/APCS_Assignment16_IntelPentiumBugEssay.pdf'
  },
  {
    id: 'apcs-assign17',
    title: 'Sorting and Searching',
    description: 'Implement sorting and searching algorithms',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['sorting', 'searching', 'algorithms', 'binary', 'linear', 'bubble', 'selection'],
    filePath: './documents/APCS/Assignments/APCS_Assign17_Sorting_and_Searching.pdf'
  },
  {
    id: 'apcs-assign18',
    title: 'Hangman Game',
    description: 'Create a hangman word guessing game',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['hangman', 'game', 'word', 'guessing', 'strings', 'arrays'],
    filePath: './documents/APCS/Assignments/APCS_Assignment18_Hangman.pdf'
  },

  // Java Lessons
  {
    id: 'java-lesson-arrays',
    title: 'Arrays Lesson',
    description: 'Learn about arrays and array manipulation',
    category: 'lesson',
    page: 'java',
    keywords: ['arrays', 'lesson', 'data', 'structures', 'index', 'elements'],
    filePath: './documents/Java/Lessons/Java_Lesson_Arrays_Blank.docx'
  },
  {
    id: 'java-lesson-looping',
    title: 'Looping Lesson',
    description: 'Master for loops, while loops, and iteration',
    category: 'lesson',
    page: 'java',
    keywords: ['looping', 'loops', 'for', 'while', 'iteration', 'repetition'],
    filePath: './documents/Java/Lessons/Java_Lesson_Looping_Blank.docx'
  },
  {
    id: 'java-lesson-math',
    title: 'Math Operators Lesson',
    description: 'Understanding mathematical operations in Java',
    category: 'lesson',
    page: 'java',
    keywords: ['math', 'operators', 'arithmetic', 'calculation', 'operations'],
    filePath: './documents/Java/Lessons/Java_Lesson_MathOperators_Blank.docx'
  },
  {
    id: 'java-lesson-selection',
    title: 'Selection Statements Lesson',
    description: 'Learn if statements and conditional logic',
    category: 'lesson',
    page: 'java',
    keywords: ['selection', 'if', 'else', 'conditional', 'boolean', 'logic'],
    filePath: './documents/Java/Lessons/Java_Lesson_SelectionStatements_Blank.docx'
  },

  // APCS Lessons
  {
    id: 'apcs-lesson-oop',
    title: 'Object-Oriented Programming Lesson',
    description: 'Comprehensive guide to OOP concepts',
    category: 'lesson',
    page: 'ap-cs',
    keywords: ['oop', 'object', 'oriented', 'programming', 'classes', 'objects', 'encapsulation', 'inheritance'],
    filePath: './documents/APCS/Lessons/APCS_Lesson_OOP_Blank.docx'
  },
  {
    id: 'apcs-lesson-arrays',
    title: 'Arrays Lesson',
    description: 'Advanced array concepts and algorithms',
    category: 'lesson',
    page: 'ap-cs',
    keywords: ['arrays', 'lesson', 'algorithms', 'data', 'structures'],
    filePath: './documents/APCS/Lessons/APCS_Lesson_Arrays_Blank.docx'
  },
  {
    id: 'apcs-lesson-inheritance',
    title: 'Inheritance Lesson',
    description: 'Understanding inheritance and class hierarchies',
    category: 'lesson',
    page: 'ap-cs',
    keywords: ['inheritance', 'extends', 'super', 'hierarchy', 'oop', 'object', 'oriented'],
    filePath: './documents/APCS/Lessons/APCS_Lesson_Inheritance_Blank.docx'
  },
  {
    id: 'apcs-lesson-recursion',
    title: 'Recursion Lesson',
    description: 'Master recursive thinking and implementation',
    category: 'lesson',
    page: 'ap-cs',
    keywords: ['recursion', 'recursive', 'base', 'case', 'algorithms'],
    filePath: './documents/APCS/Lessons/APCS_Lesson_Recursion_Blank.docx'
  },
  {
    id: 'apcs-lesson-strings',
    title: 'Strings Lesson',
    description: 'String methods and text processing',
    category: 'lesson',
    page: 'ap-cs',
    keywords: ['strings', 'text', 'methods', 'substring', 'processing'],
    filePath: './documents/APCS/Lessons/APCS_Lesson_Strings_Blank.docx'
  }
];

// Enhanced search function with better semantic matching
export const searchAssignments = (query: string): SearchItem[] => {
  if (!query.trim()) return [];
  
  const searchTerms = query.toLowerCase().split(/\s+/);
  
  return searchItems
    .map(item => {
      let score = 0;
      const titleLower = item.title.toLowerCase();
      const descLower = item.description.toLowerCase();
      const keywordsLower = item.keywords.map(k => k.toLowerCase());
      
      searchTerms.forEach(term => {
        // Exact title match gets highest score
        if (titleLower.includes(term)) {
          score += 100;
        }
        
        // Description match
        if (descLower.includes(term)) {
          score += 50;
        }
        
        // Keyword exact match
        if (keywordsLower.includes(term)) {
          score += 75;
        }
        
        // Keyword partial match
        keywordsLower.forEach(keyword => {
          if (keyword.includes(term)) {
            score += 25;
          }
        });
        
        // Special handling for "oop" to prioritize object-oriented content
        if (term === 'oop' || term === 'object') {
          if (keywordsLower.includes('oop') || keywordsLower.includes('object') || keywordsLower.includes('oriented')) {
            score += 150;
          }
        }
        
        // Boost for exact category matches
        if (item.category.toLowerCase().includes(term)) {
          score += 30;
        }
      });
      
      return { ...item, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
};
