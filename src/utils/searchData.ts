
export interface SearchItem {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  category: 'assignment' | 'lesson' | 'resource' | 'homework' | 'bonus';
  page: 'java' | 'apcs';
  url?: string;
}

const searchItems: SearchItem[] = [
  // Java Assignments
  {
    id: 'java-assign-1',
    title: '1: Basic Console Applications',
    description: 'Introduction to Java programming with basic console input/output operations',
    keywords: ['java', 'console', 'basic', 'input', 'output', 'programming', 'introduction'],
    category: 'assignment',
    page: 'java'
  },
  {
    id: 'java-assign-2',
    title: '2: Currency Converter',
    description: 'Create a program to convert between different currencies',
    keywords: ['java', 'currency', 'converter', 'money', 'exchange', 'calculation'],
    category: 'assignment',
    page: 'java'
  },
  {
    id: 'java-assign-2.5',
    title: '2.5: Change Calculator',
    description: 'Calculate change for transactions, working with money calculations',
    keywords: ['java', 'change', 'calculator', 'money', 'coins', 'bills', 'math'],
    category: 'assignment',
    page: 'java'
  },
  {
    id: 'java-assign-3',
    title: '3: Loops',
    description: 'Practice with for loops, while loops, and loop control structures',
    keywords: ['java', 'loops', 'for', 'while', 'iteration', 'control', 'structures'],
    category: 'assignment',
    page: 'java'
  },
  {
    id: 'java-assign-4',
    title: '4: Arrays',
    description: 'Working with arrays, Budget and RackO game implementations',
    keywords: ['java', 'arrays', 'budget', 'racko', 'data', 'structures', 'collections'],
    category: 'assignment',
    page: 'java'
  },
  {
    id: 'java-assign-4.5',
    title: '4.5: Object Oriented Basics',
    description: 'Introduction to object-oriented programming concepts',
    keywords: ['java', 'oop', 'object', 'oriented', 'class', 'student', 'basics'],
    category: 'assignment',
    page: 'java'
  },
  {
    id: 'java-assign-5',
    title: '5: Swing Basics',
    description: 'GUI programming with Java Swing components',
    keywords: ['java', 'swing', 'gui', 'interface', 'components', 'buttons', 'windows'],
    category: 'assignment',
    page: 'java'
  },
  {
    id: 'java-assign-6',
    title: '6: Final Project',
    description: 'Comprehensive final project including Blackjack game implementation',
    keywords: ['java', 'final', 'project', 'blackjack', 'game', 'comprehensive'],
    category: 'assignment',
    page: 'java'
  },

  // Java Homework
  {
    id: 'java-hw-1',
    title: 'Glossary Terms',
    description: 'Important Java programming terminology and definitions',
    keywords: ['java', 'glossary', 'terms', 'definitions', 'vocabulary'],
    category: 'homework',
    page: 'java'
  },
  {
    id: 'java-hw-2',
    title: 'Logical Operators',
    description: 'Practice with logical operators and boolean expressions',
    keywords: ['java', 'logical', 'operators', 'boolean', 'and', 'or', 'not'],
    category: 'homework',
    page: 'java'
  },
  {
    id: 'java-hw-3',
    title: 'Loops Homework',
    description: 'Additional practice with loop structures and control flow',
    keywords: ['java', 'loops', 'homework', 'practice', 'control', 'flow'],
    category: 'homework',
    page: 'java'
  },
  {
    id: 'java-hw-4',
    title: 'Arrays Homework',
    description: 'Practice problems for array manipulation and processing',
    keywords: ['java', 'arrays', 'homework', 'practice', 'manipulation'],
    category: 'homework',
    page: 'java'
  },

  // Java Lessons
  {
    id: 'java-lesson-1',
    title: 'Unit 1 Review',
    description: 'Review of basic Java concepts, flowcharts, and tax calculator',
    keywords: ['java', 'unit1', 'review', 'flowchart', 'tax', 'calculator', 'basics'],
    category: 'lesson',
    page: 'java'
  },
  {
    id: 'java-lesson-2',
    title: 'Unit 2 Data and Variables',
    description: 'Data types, variables, and mathematical operations in Java',
    keywords: ['java', 'data', 'variables', 'types', 'math', 'operations'],
    category: 'lesson',
    page: 'java'
  },
  {
    id: 'java-lesson-3',
    title: 'Unit 3 Selection Statements',
    description: 'Conditional statements, if-else, and decision making',
    keywords: ['java', 'selection', 'statements', 'if', 'else', 'conditional'],
    category: 'lesson',
    page: 'java'
  },
  {
    id: 'java-lesson-4',
    title: 'Unit 4 Looping & Random',
    description: 'Loop structures and random number generation',
    keywords: ['java', 'looping', 'random', 'for', 'while', 'numbers'],
    category: 'lesson',
    page: 'java'
  },
  {
    id: 'java-lesson-5',
    title: 'Unit 5 Scope',
    description: 'Variable scope and method organization',
    keywords: ['java', 'scope', 'variables', 'methods', 'organization'],
    category: 'lesson',
    page: 'java'
  },
  {
    id: 'java-lesson-6',
    title: 'Unit 6 Arrays',
    description: 'Array creation, manipulation, and processing',
    keywords: ['java', 'arrays', 'creation', 'manipulation', 'processing'],
    category: 'lesson',
    page: 'java'
  },

  // Java Resources
  {
    id: 'java-resource-1',
    title: 'Textbook Chapters 1 and 2',
    description: 'Official textbook material covering Java fundamentals',
    keywords: ['java', 'textbook', 'chapters', 'fundamentals', 'reference'],
    category: 'resource',
    page: 'java'
  },
  {
    id: 'java-resource-2',
    title: 'The Cookbook',
    description: 'Quick reference guide for Java programming recipes',
    keywords: ['java', 'cookbook', 'reference', 'recipes', 'guide'],
    category: 'resource',
    page: 'java'
  },
  {
    id: 'java-resource-3',
    title: 'GUI Survival Guide',
    description: 'Essential guide for Java GUI programming',
    keywords: ['java', 'gui', 'survival', 'guide', 'swing', 'interface'],
    category: 'resource',
    page: 'java'
  },

  // Java Bonus
  {
    id: 'java-bonus-1',
    title: 'Coinflip Problem',
    description: 'Advanced probability problem involving coin flipping',
    keywords: ['java', 'coinflip', 'probability', 'advanced', 'problem'],
    category: 'bonus',
    page: 'java'
  },
  {
    id: 'java-bonus-2',
    title: 'Fox Goose Grain Problem',
    description: 'Classic logic puzzle implementation',
    keywords: ['java', 'fox', 'goose', 'grain', 'logic', 'puzzle'],
    category: 'bonus',
    page: 'java'
  },

  // AP Computer Science Assignments
  {
    id: 'apcs-assign-1',
    title: '1: Mad Libs',
    description: 'Create an interactive Mad Libs game with user input',
    keywords: ['apcs', 'mad', 'libs', 'game', 'input', 'interactive'],
    category: 'assignment',
    page: 'apcs'
  },
  {
    id: 'apcs-assign-2',
    title: '2: Operations Calculator',
    description: 'Build a calculator for basic mathematical operations',
    keywords: ['apcs', 'operations', 'calculator', 'math', 'addition', 'subtraction'],
    category: 'assignment',
    page: 'apcs'
  },
  {
    id: 'apcs-assign-3',
    title: '3: ASCII Art',
    description: 'Create artistic text displays using ASCII characters',
    keywords: ['apcs', 'ascii', 'art', 'text', 'graphics', 'creative'],
    category: 'assignment',
    page: 'apcs'
  },
  {
    id: 'apcs-assign-4',
    title: '4: Turtle Draw',
    description: 'Use turtle graphics to create drawings and patterns',
    keywords: ['apcs', 'turtle', 'draw', 'graphics', 'patterns', 'art'],
    category: 'assignment',
    page: 'apcs'
  },
  {
    id: 'apcs-assign-5',
    title: '5: Recursive Art',
    description: 'Create artistic patterns using recursive programming',
    keywords: ['apcs', 'recursive', 'art', 'patterns', 'fractals', 'recursion'],
    category: 'assignment',
    page: 'apcs'
  },
  {
    id: 'apcs-assign-6',
    title: '6: Text Adventure',
    description: 'Build an interactive text-based adventure game',
    keywords: ['apcs', 'text', 'adventure', 'game', 'interactive', 'story'],
    category: 'assignment',
    page: 'apcs'
  },
  {
    id: 'apcs-assign-7',
    title: '7: Steganography',
    description: 'Hide secret messages in images using steganography',
    keywords: ['apcs', 'steganography', 'secret', 'messages', 'images', 'hiding'],
    category: 'assignment',
    page: 'apcs'
  },

  // AP Computer Science Lessons
  {
    id: 'apcs-lesson-1',
    title: 'Unit 1: Primitive Types',
    description: 'Basic data types and variable declarations in Java',
    keywords: ['apcs', 'primitive', 'types', 'variables', 'int', 'double', 'boolean'],
    category: 'lesson',
    page: 'apcs'
  },
  {
    id: 'apcs-lesson-2',
    title: 'Unit 2: Using Objects',
    description: 'Working with objects, methods, and the String class',
    keywords: ['apcs', 'objects', 'methods', 'string', 'class', 'instantiation'],
    category: 'lesson',
    page: 'apcs'
  },
  {
    id: 'apcs-lesson-3',
    title: 'Unit 3: Boolean Expressions and if Statements',
    description: 'Conditional logic and boolean operations',
    keywords: ['apcs', 'boolean', 'expressions', 'if', 'statements', 'conditional'],
    category: 'lesson',
    page: 'apcs'
  },
  {
    id: 'apcs-lesson-4',
    title: 'Unit 4: Iteration',
    description: 'Loops and iterative programming concepts',
    keywords: ['apcs', 'iteration', 'loops', 'for', 'while', 'repetition'],
    category: 'lesson',
    page: 'apcs'
  },
  {
    id: 'apcs-lesson-5',
    title: 'Unit 5: Writing Classes',
    description: 'Object-oriented programming and class design',
    keywords: ['apcs', 'writing', 'classes', 'oop', 'constructors', 'methods'],
    category: 'lesson',
    page: 'apcs'
  },
  {
    id: 'apcs-lesson-6',
    title: 'Unit 6: Array',
    description: 'Array data structure and algorithms',
    keywords: ['apcs', 'array', 'data', 'structure', 'algorithms', 'traversal'],
    category: 'lesson',
    page: 'apcs'
  },
  {
    id: 'apcs-lesson-7',
    title: 'Unit 7: ArrayList',
    description: 'Dynamic arrays and ArrayList methods',
    keywords: ['apcs', 'arraylist', 'dynamic', 'arrays', 'collections', 'methods'],
    category: 'lesson',
    page: 'apcs'
  },
  {
    id: 'apcs-lesson-8',
    title: 'Unit 8: 2D Array',
    description: 'Two-dimensional arrays and matrix operations',
    keywords: ['apcs', '2d', 'array', 'matrix', 'two', 'dimensional'],
    category: 'lesson',
    page: 'apcs'
  },
  {
    id: 'apcs-lesson-9',
    title: 'Unit 9: Inheritance',
    description: 'Object inheritance and polymorphism',
    keywords: ['apcs', 'inheritance', 'polymorphism', 'extends', 'super'],
    category: 'lesson',
    page: 'apcs'
  },
  {
    id: 'apcs-lesson-10',
    title: 'Unit 10: Recursion',
    description: 'Recursive programming and algorithms',
    keywords: ['apcs', 'recursion', 'recursive', 'algorithms', 'base', 'case'],
    category: 'lesson',
    page: 'apcs'
  }
];

export const searchAssignments = (query: string): SearchItem[] => {
  if (!query.trim()) return [];
  
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
  
  return searchItems
    .filter(item => {
      const searchableText = [
        item.title,
        item.description,
        ...item.keywords,
        item.category,
        item.page
      ].join(' ').toLowerCase();
      
      return searchTerms.every(term => 
        searchableText.includes(term)
      );
    })
    .sort((a, b) => {
      // Calculate relevance score
      const scoreA = calculateRelevanceScore(a, searchTerms);
      const scoreB = calculateRelevanceScore(b, searchTerms);
      return scoreB - scoreA;
    });
};

const calculateRelevanceScore = (item: SearchItem, searchTerms: string[]): number => {
  let score = 0;
  const title = item.title.toLowerCase();
  const description = item.description.toLowerCase();
  const keywords = item.keywords.join(' ').toLowerCase();
  
  searchTerms.forEach(term => {
    // Title matches are most important
    if (title.includes(term)) score += 10;
    // Keyword matches are very important
    if (keywords.includes(term)) score += 5;
    // Description matches are moderately important
    if (description.includes(term)) score += 2;
  });
  
  return score;
};
