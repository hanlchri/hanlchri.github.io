
export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: 'assignment' | 'lesson' | 'resource' | 'bonus' | 'homework';
  page: 'java' | 'ap-cs';
  keywords: string[];
  url?: string;
}

const searchItems: SearchItem[] = [
  // Java Assignments
  {
    id: 'java-assignment-1',
    title: '1: Basic Console Applications',
    description: 'Introduction to Java console applications and basic programming concepts',
    category: 'assignment',
    page: 'java',
    keywords: ['console', 'basic', 'applications', 'introduction', 'java', 'programming', 'fundamentals'],
    url: '/documents/Java_Assignment1_BasicConsoleApplications.pdf'
  },
  {
    id: 'java-assignment-2',
    title: '2: Currency Converter',
    description: 'Build a currency conversion application using Java',
    category: 'assignment',
    page: 'java',
    keywords: ['currency', 'converter', 'conversion', 'money', 'exchange', 'calculator'],
    url: '/documents/Java_Assignment2_CurrencyConverter.pdf'
  },
  {
    id: 'java-assignment-2-5',
    title: '2.5: Change Calculator',
    description: 'Calculate change for transactions',
    category: 'assignment',
    page: 'java',
    keywords: ['change', 'calculator', 'money', 'transactions', 'coins', 'bills'],
    url: '/documents/Java_Assignment2.5_ChangeTwenty.pdf'
  },
  {
    id: 'java-assignment-3',
    title: '3: Loops',
    description: 'Practice with loop structures in Java',
    category: 'assignment',
    page: 'java',
    keywords: ['loops', 'for', 'while', 'iteration', 'repetition', 'control structures'],
    url: '/documents/Java_Assignment3_LoopPractice.pdf'
  },
  {
    id: 'java-assignment-4-budget',
    title: '4: Budget',
    description: 'Create a budget management application',
    category: 'assignment',
    page: 'java',
    keywords: ['budget', 'arrays', 'financial', 'management', 'money', 'expenses'],
    url: '/documents/Java_Assignment4_Budget.pdf'
  },
  {
    id: 'java-assignment-4-racko',
    title: '4: RackO',
    description: 'Implement the RackO card game using arrays',
    category: 'assignment',
    page: 'java',
    keywords: ['racko', 'game', 'arrays', 'cards', 'sorting', 'logic'],
    url: '/documents/Java_Assignment4_RackO.pdf'
  },
  {
    id: 'java-assignment-4-5',
    title: '4.5: Object Oriented Basics',
    description: 'Introduction to object-oriented programming concepts',
    category: 'assignment',
    page: 'java',
    keywords: ['object', 'oriented', 'oop', 'classes', 'objects', 'methods', 'encapsulation'],
    url: '/documents/Java_Assignment4.5_Object_Oriented_Basics.pdf'
  },
  {
    id: 'java-assignment-5',
    title: '5: Swing Basics',
    description: 'Create graphical user interfaces using Java Swing',
    category: 'assignment',
    page: 'java',
    keywords: ['swing', 'gui', 'graphical', 'interface', 'buttons', 'windows', 'ui'],
    url: '/documents/Java_Assignment5_SwingBasics.pdf'
  },
  {
    id: 'java-assignment-6',
    title: '6: Final Project',
    description: 'Comprehensive final project demonstrating Java skills',
    category: 'assignment',
    page: 'java',
    keywords: ['final', 'project', 'comprehensive', 'blackjack', 'game', 'advanced'],
    url: '/documents/Java_Assignment6_FinalProject.pdf'
  },

  // Java Homework
  {
    id: 'java-hw-glossary',
    title: 'Glossary Terms',
    description: 'Important Java programming terminology and definitions',
    category: 'homework',
    page: 'java',
    keywords: ['glossary', 'terms', 'definitions', 'vocabulary', 'java', 'programming'],
    url: '/documents/GlossaryTerms.pdf'
  },
  {
    id: 'java-hw-logical',
    title: 'Logical Operators',
    description: 'Practice with logical operators in Java',
    category: 'homework',
    page: 'java',
    keywords: ['logical', 'operators', 'boolean', 'and', 'or', 'not', 'conditions'],
    url: '/documents/LogicalOperatorsHW.pdf'
  },
  {
    id: 'java-hw-loops',
    title: 'Loops',
    description: 'Homework exercises on loop structures',
    category: 'homework',
    page: 'java',
    keywords: ['loops', 'for', 'while', 'iteration', 'practice', 'exercises'],
    url: '/documents/Java_Loops_HW.pdf'
  },
  {
    id: 'java-hw-arrays',
    title: 'Arrays',
    description: 'Array manipulation and processing exercises',
    category: 'homework',
    page: 'java',
    keywords: ['arrays', 'data structures', 'indexing', 'manipulation', 'processing'],
    url: '/documents/JavaHWArrays.pdf'
  },

  // Java Lessons
  {
    id: 'java-lesson-unit1',
    title: 'Unit 1 Review',
    description: 'Review of fundamental Java concepts and flowcharting',
    category: 'lesson',
    page: 'java',
    keywords: ['unit 1', 'review', 'fundamentals', 'flowchart', 'tax calculator', 'basics'],
  },
  {
    id: 'java-lesson-unit2',
    title: 'Unit 2 Data and Variables',
    description: 'Working with data types and variables in Java',
    category: 'lesson',
    page: 'java',
    keywords: ['data', 'variables', 'types', 'math operations', 'modeling', 'storage'],
  },
  {
    id: 'java-lesson-unit3',
    title: 'Unit 3 Selection Statements',
    description: 'Conditional statements and decision making',
    category: 'lesson',
    page: 'java',
    keywords: ['selection', 'if', 'else', 'conditions', 'decisions', 'branching'],
  },
  {
    id: 'java-lesson-unit4',
    title: 'Unit 4 Looping & Random',
    description: 'Loop structures and random number generation',
    category: 'lesson',
    page: 'java',
    keywords: ['looping', 'random', 'iteration', 'generation', 'numbers', 'repetition'],
  },
  {
    id: 'java-lesson-unit5',
    title: 'Unit 5 Scope',
    description: 'Variable scope and accessibility in Java',
    category: 'lesson',
    page: 'java',
    keywords: ['scope', 'variables', 'accessibility', 'local', 'global', 'visibility'],
  },
  {
    id: 'java-lesson-unit6',
    title: 'Unit 6 Arrays',
    description: 'Array creation, manipulation, and processing',
    category: 'lesson',
    page: 'java',
    keywords: ['arrays', 'data structures', 'collections', 'indexing', 'manipulation'],
  },

  // Java Resources
  {
    id: 'java-resource-textbook',
    title: 'Textbook Chapters 1 and 2',
    description: 'Essential reading material for Java fundamentals',
    category: 'resource',
    page: 'java',
    keywords: ['textbook', 'chapters', 'reading', 'fundamentals', 'reference'],
    url: '/documents/TextbookChapters1_2.pdf'
  },
  {
    id: 'java-resource-cookbook',
    title: 'The Cookbook',
    description: 'Quick reference guide for Java programming',
    category: 'resource',
    page: 'java',
    keywords: ['cookbook', 'reference', 'guide', 'quick', 'help', 'syntax'],
    url: '/documents/TheCookbook.pdf'
  },
  {
    id: 'java-resource-gui',
    title: 'GUI Survival Guide',
    description: 'Guide for creating graphical user interfaces',
    category: 'resource',
    page: 'java',
    keywords: ['gui', 'survival', 'guide', 'interface', 'swing', 'graphics'],
    url: '/documents/GUISurvivalGuide.pdf'
  },

  // Java Bonus
  {
    id: 'java-bonus-coinflip',
    title: 'Coinflip Problem',
    description: 'Advanced probability and simulation problem',
    category: 'bonus',
    page: 'java',
    keywords: ['coinflip', 'probability', 'simulation', 'random', 'statistics'],
    url: '/documents/CoinflipProblem.pdf'
  },
  {
    id: 'java-bonus-fox-goose',
    title: 'Fox Goose Grain Problem',
    description: 'Classic logic puzzle implementation',
    category: 'bonus',
    page: 'java',
    keywords: ['fox', 'goose', 'grain', 'puzzle', 'logic', 'algorithm'],
    url: '/documents/FoxGooseGrainProblem.pdf'
  },

  // AP Computer Science Assignments
  {
    id: 'apcs-assignment-1',
    title: '1: Basic Console Applications',
    description: 'Introduction to programming with console applications',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['console', 'basic', 'applications', 'introduction', 'programming'],
  },
  {
    id: 'apcs-assignment-2',
    title: '2: Operations Calculator',
    description: 'Create a calculator for mathematical operations',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['operations', 'calculator', 'math', 'arithmetic', 'computation'],
  },
  {
    id: 'apcs-assignment-3',
    title: '3: Quadratic Solver',
    description: 'Solve quadratic equations using the quadratic formula',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['quadratic', 'solver', 'equations', 'formula', 'mathematics'],
  },
  {
    id: 'apcs-assignment-4',
    title: '4: For Loops',
    description: 'Practice with for loop structures and iteration',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['for', 'loops', 'iteration', 'repetition', 'control'],
  },
  {
    id: 'apcs-assignment-5',
    title: '5: While Loops',
    description: 'Implementation of while loop constructs',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['while', 'loops', 'iteration', 'conditions', 'control'],
  },
  {
    id: 'apcs-assignment-6',
    title: '6: Strings',
    description: 'String manipulation and processing techniques',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['strings', 'text', 'manipulation', 'processing', 'characters'],
  },
  {
    id: 'apcs-assignment-7',
    title: '7: Boolean and Logical Operators',
    description: 'Working with boolean logic and logical operators',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['boolean', 'logical', 'operators', 'true', 'false', 'logic'],
  },
  {
    id: 'apcs-assignment-8',
    title: '8: Conditionals',
    description: 'Conditional statements and decision making',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['conditionals', 'if', 'else', 'decisions', 'branching'],
  },
  {
    id: 'apcs-assignment-9',
    title: '9: Arrays',
    description: 'Array creation, manipulation, and algorithms',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['arrays', 'data structures', 'algorithms', 'collections'],
  },
  {
    id: 'apcs-assignment-10',
    title: '10: 2D Arrays',
    description: 'Two-dimensional array processing and manipulation',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['2d arrays', 'matrix', 'grid', 'dimensional', 'processing'],
  },
  {
    id: 'apcs-assignment-11',
    title: '11: Classes and Objects',
    description: 'Object-oriented programming with classes and objects',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['classes', 'objects', 'oop', 'methods', 'constructors'],
  },
  {
    id: 'apcs-assignment-12',
    title: '12: Static vs. Instance',
    description: 'Understanding static and instance members',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['static', 'instance', 'members', 'methods', 'variables'],
  },
  {
    id: 'apcs-assignment-13',
    title: '13: Inheritance',
    description: 'Class inheritance and polymorphism concepts',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['inheritance', 'extends', 'polymorphism', 'parent', 'child'],
  },
  {
    id: 'apcs-assignment-14',
    title: '14: Recursion',
    description: 'Recursive algorithms and problem solving',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['recursion', 'recursive', 'algorithms', 'base case', 'self-calling'],
  },

  // AP Computer Science Lessons
  {
    id: 'apcs-lesson-unit1',
    title: 'Unit 1: Primitive Types',
    description: 'Introduction to primitive data types in Java',
    category: 'lesson',
    page: 'ap-cs',
    keywords: ['primitive', 'types', 'int', 'double', 'boolean', 'char'],
  },
  {
    id: 'apcs-lesson-unit2',
    title: 'Unit 2: Using Objects',
    description: 'Working with objects and method calls',
    category: 'lesson',
    page: 'ap-cs',
    keywords: ['objects', 'methods', 'classes', 'instantiation', 'calling'],
  },
  {
    id: 'apcs-lesson-unit3',
    title: 'Unit 3: Boolean Expressions and if Statements',
    description: 'Boolean logic and conditional statements',
    category: 'lesson',
    page: 'ap-cs',
    keywords: ['boolean', 'expressions', 'if', 'statements', 'conditions'],
  },
  {
    id: 'apcs-lesson-unit4',
    title: 'Unit 4: Iteration',
    description: 'Loop structures and iterative processes',
    category: 'lesson',
    page: 'ap-cs',
    keywords: ['iteration', 'loops', 'for', 'while', 'repetition'],
  },
  {
    id: 'apcs-lesson-unit5',
    title: 'Unit 5: Writing Classes',
    description: 'Creating and designing custom classes',
    category: 'lesson',
    page: 'ap-cs',
    keywords: ['writing', 'classes', 'design', 'constructors', 'methods'],
  },
  {
    id: 'apcs-lesson-unit6',
    title: 'Unit 6: Array',
    description: 'Array fundamentals and processing',
    category: 'lesson',
    page: 'ap-cs',
    keywords: ['array', 'fundamentals', 'processing', 'indexing'],
  },
  {
    id: 'apcs-lesson-unit7',
    title: 'Unit 7: ArrayList',
    description: 'Dynamic arrays using ArrayList class',
    category: 'lesson',
    page: 'ap-cs',
    keywords: ['arraylist', 'dynamic', 'arrays', 'collections', 'resizable'],
  },
  {
    id: 'apcs-lesson-unit8',
    title: 'Unit 8: 2D Array',
    description: 'Two-dimensional array concepts and applications',
    category: 'lesson',
    page: 'ap-cs',
    keywords: ['2d', 'array', 'matrix', 'grid', 'two-dimensional'],
  },
  {
    id: 'apcs-lesson-unit9',
    title: 'Unit 9: Inheritance',
    description: 'Class inheritance and polymorphism',
    category: 'lesson',
    page: 'ap-cs',
    keywords: ['inheritance', 'polymorphism', 'extends', 'super', 'override'],
  },
  {
    id: 'apcs-lesson-unit10',
    title: 'Unit 10: Recursion',
    description: 'Recursive thinking and implementation',
    category: 'lesson',
    page: 'ap-cs',
    keywords: ['recursion', 'recursive', 'base case', 'recursive case'],
  },
];

export function searchAssignments(query: string): SearchItem[] {
  if (!query.trim()) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  const queryWords = normalizedQuery.split(/\s+/);
  
  return searchItems
    .map(item => {
      let score = 0;
      
      // Exact title match gets highest score
      if (item.title.toLowerCase().includes(normalizedQuery)) {
        score += 100;
      }
      
      // Keyword matches
      const matchingKeywords = item.keywords.filter(keyword => 
        queryWords.some(word => keyword.toLowerCase().includes(word))
      );
      score += matchingKeywords.length * 10;
      
      // Description matches
      if (item.description.toLowerCase().includes(normalizedQuery)) {
        score += 50;
      }
      
      // Category matches
      if (item.category.toLowerCase().includes(normalizedQuery)) {
        score += 30;
      }
      
      // Page matches
      if (item.page.toLowerCase().includes(normalizedQuery)) {
        score += 20;
      }
      
      return { ...item, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
}
