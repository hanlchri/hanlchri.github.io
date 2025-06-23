
// Semantic search data for all assignments and materials
export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: 'assignment' | 'lesson' | 'resource' | 'bonus' | 'homework';
  page: 'java' | 'apcs';
  keywords: string[];
  url?: string;
}

export const searchData: SearchItem[] = [
  // Java Assignments
  {
    id: 'java-basic-console',
    title: 'Basic Console Applications',
    description: 'Introduction to Java programming with console input/output',
    category: 'assignment',
    page: 'java',
    keywords: ['console', 'input', 'output', 'basic', 'java', 'programming', 'hello world']
  },
  {
    id: 'java-currency-converter',
    title: 'Currency Converter',
    description: 'Build a currency conversion application',
    category: 'assignment',
    page: 'java',
    keywords: ['currency', 'converter', 'money', 'exchange', 'math', 'calculation']
  },
  {
    id: 'java-change-twenty',
    title: 'Change Twenty',
    description: 'Calculate change from twenty dollar bill',
    category: 'assignment',
    page: 'java',
    keywords: ['change', 'money', 'twenty', 'dollar', 'calculation', 'cash']
  },
  {
    id: 'java-loop-practice',
    title: 'Loop Practice',
    description: 'Practice with for loops, while loops, and nested loops',
    category: 'assignment',
    page: 'java',
    keywords: ['loops', 'for', 'while', 'nested', 'iteration', 'practice']
  },
  {
    id: 'java-budget',
    title: 'Budget Application',
    description: 'Create a personal budget tracking application',
    category: 'assignment',
    page: 'java',
    keywords: ['budget', 'money', 'tracking', 'expenses', 'income', 'financial']
  },
  {
    id: 'java-oop-basics',
    title: 'Object Oriented Basics',
    description: 'Introduction to classes, objects, and OOP concepts',
    category: 'assignment',
    page: 'java',
    keywords: ['oop', 'object', 'oriented', 'class', 'objects', 'programming']
  },
  {
    id: 'java-racko',
    title: 'Rack-O Game',
    description: 'Implement the classic Rack-O card game',
    category: 'assignment',
    page: 'java',
    keywords: ['racko', 'game', 'cards', 'strategy', 'gui', 'swing']
  },
  {
    id: 'java-swing-basics',
    title: 'Swing Basics',
    description: 'Learn GUI programming with Java Swing',
    category: 'assignment',
    page: 'java',
    keywords: ['swing', 'gui', 'interface', 'buttons', 'windows', 'graphics']
  },
  {
    id: 'java-final-project',
    title: 'Final Project',
    description: 'Comprehensive final project demonstrating all concepts',
    category: 'assignment',
    page: 'java',
    keywords: ['final', 'project', 'comprehensive', 'culminating', 'portfolio']
  },

  // APCS Assignments
  {
    id: 'apcs-summer',
    title: 'Summer Assignment',
    description: 'Preparation assignment for AP Computer Science course',
    category: 'assignment',
    page: 'apcs',
    keywords: ['summer', 'preparation', 'ap', 'computer', 'science', 'intro']
  },
  {
    id: 'apcs-computer-components',
    title: 'Computer Components',
    description: 'Learn about computer hardware and components',
    category: 'assignment',
    page: 'apcs',
    keywords: ['computer', 'components', 'hardware', 'cpu', 'memory', 'storage']
  },
  {
    id: 'apcs-operations-calculator',
    title: 'Operations Calculator',
    description: 'Build a calculator with basic mathematical operations',
    category: 'assignment',
    page: 'apcs',
    keywords: ['calculator', 'operations', 'math', 'arithmetic', 'add', 'subtract', 'multiply', 'divide']
  },
  {
    id: 'apcs-castle-stairs',
    title: 'Castle Stairs',
    description: 'Graphics programming assignment drawing castle stairs',
    category: 'assignment',
    page: 'apcs',
    keywords: ['castle', 'stairs', 'graphics', 'drawing', 'loops', 'patterns']
  },
  {
    id: 'apcs-matrix-store',
    title: 'Matrix Computer Store',
    description: 'Simulate a computer store with inventory management',
    category: 'assignment',
    page: 'apcs',
    keywords: ['matrix', 'store', 'inventory', 'management', 'business', 'simulation']
  },
  {
    id: 'apcs-reusable-components',
    title: 'Reusable Components',
    description: 'Create reusable code components and modules',
    category: 'assignment',
    page: 'apcs',
    keywords: ['reusable', 'components', 'modules', 'functions', 'methods', 'code']
  },
  {
    id: 'apcs-group-presentations',
    title: 'Group Presentations',
    description: 'Collaborative presentation on programming topics',
    category: 'assignment',
    page: 'apcs',
    keywords: ['group', 'presentations', 'collaboration', 'teamwork', 'speaking']
  },
  {
    id: 'apcs-oop',
    title: 'Object Oriented Programming',
    description: 'Advanced OOP concepts including inheritance and polymorphism',
    category: 'assignment',
    page: 'apcs',
    keywords: ['oop', 'object', 'oriented', 'inheritance', 'polymorphism', 'classes']
  },
  {
    id: 'apcs-class-features',
    title: 'Additional Class Features',
    description: 'Advanced class features like static methods and variables',
    category: 'assignment',
    page: 'apcs',
    keywords: ['class', 'features', 'static', 'methods', 'variables', 'advanced']
  },
  {
    id: 'apcs-string-methods',
    title: 'String Methods',
    description: 'Working with string manipulation and methods',
    category: 'assignment',
    page: 'apcs',
    keywords: ['string', 'methods', 'manipulation', 'text', 'processing', 'substring']
  },
  {
    id: 'apcs-2d-arrays',
    title: '2-Dimensional Arrays',
    description: 'Working with 2D arrays and matrix operations',
    category: 'assignment',
    page: 'apcs',
    keywords: ['2d', 'arrays', 'matrix', 'grid', 'two', 'dimensional', 'nested']
  },
  {
    id: 'apcs-list-management',
    title: 'List Management',
    description: 'ArrayList operations and data management',
    category: 'assignment',
    page: 'apcs',
    keywords: ['list', 'arraylist', 'management', 'data', 'structures', 'collections']
  },
  {
    id: 'apcs-polymorphism',
    title: 'Polymorphism',
    description: 'Advanced polymorphism concepts and implementation',
    category: 'assignment',
    page: 'apcs',
    keywords: ['polymorphism', 'inheritance', 'override', 'abstract', 'interface']
  },
  {
    id: 'apcs-software-bad',
    title: 'Why Software is So Bad',
    description: 'Analysis of software quality and development practices',
    category: 'assignment',
    page: 'apcs',
    keywords: ['software', 'quality', 'bugs', 'development', 'practices', 'engineering']
  },
  {
    id: 'apcs-stacks',
    title: 'Stacks',
    description: 'Stack data structure implementation and applications',
    category: 'assignment',
    page: 'apcs',
    keywords: ['stacks', 'data', 'structure', 'lifo', 'push', 'pop']
  },
  {
    id: 'apcs-recursion',
    title: 'Recursion',
    description: 'Recursive programming and problem solving',
    category: 'assignment',
    page: 'apcs',
    keywords: ['recursion', 'recursive', 'functions', 'base', 'case', 'self', 'calling']
  },
  {
    id: 'apcs-pentium-bug',
    title: 'Intel Pentium Bug',
    description: 'Study of the famous Intel Pentium floating point bug',
    category: 'assignment',
    page: 'apcs',
    keywords: ['intel', 'pentium', 'bug', 'floating', 'point', 'hardware', 'error']
  },
  {
    id: 'apcs-searching-sorting',
    title: 'Searching and Sorting',
    description: 'Algorithms for searching and sorting data',
    category: 'assignment',
    page: 'apcs',
    keywords: ['searching', 'sorting', 'algorithms', 'binary', 'search', 'bubble', 'sort']
  },
  {
    id: 'apcs-hangman',
    title: 'Hangman Game',
    description: 'Implementation of the classic Hangman word game',
    category: 'assignment',
    page: 'apcs',
    keywords: ['hangman', 'game', 'word', 'guessing', 'strings', 'gui']
  },
  {
    id: 'apcs-strategy-game',
    title: 'Turn Based Strategy Game',
    description: 'Complex turn-based strategy game implementation',
    category: 'assignment',
    page: 'apcs',
    keywords: ['strategy', 'game', 'turn', 'based', 'complex', 'project']
  },

  // Homework assignments
  {
    id: 'apcs-pythagorean',
    title: 'Pythagorean Triples',
    description: 'Find and generate Pythagorean triple numbers',
    category: 'homework',
    page: 'apcs',
    keywords: ['pythagorean', 'triples', 'math', 'geometry', 'numbers']
  },
  {
    id: 'apcs-spread-stars',
    title: 'Spread out the Stars',
    description: 'Graphics assignment creating star patterns',
    category: 'homework',
    page: 'apcs',
    keywords: ['stars', 'graphics', 'patterns', 'drawing', 'spread']
  },
  {
    id: 'apcs-array-copying',
    title: 'Array Copying',
    description: 'Learn different methods of copying arrays',
    category: 'homework',
    page: 'apcs',
    keywords: ['array', 'copying', 'clone', 'shallow', 'deep', 'copy']
  },

  // Bonus projects
  {
    id: 'apcs-base-converter',
    title: 'Base Converter',
    description: 'Convert numbers between different number bases',
    category: 'bonus',
    page: 'apcs',
    keywords: ['base', 'converter', 'binary', 'decimal', 'hexadecimal', 'numbers']
  },
  {
    id: 'apcs-blackjack',
    title: 'Black Jack',
    description: 'Implementation of the Blackjack card game',
    category: 'bonus',
    page: 'apcs',
    keywords: ['blackjack', 'cards', 'game', 'gambling', '21', 'strategy']
  },
  {
    id: 'apcs-yahtzee',
    title: 'Yahtzee',
    description: 'Digital version of the Yahtzee dice game',
    category: 'bonus',
    page: 'apcs',
    keywords: ['yahtzee', 'dice', 'game', 'probability', 'scoring']
  }
];

// Simple semantic search function
export function searchAssignments(query: string): SearchItem[] {
  if (!query.trim()) {
    return [];
  }

  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
  
  return searchData
    .map(item => {
      let score = 0;
      const itemText = `${item.title} ${item.description} ${item.keywords.join(' ')}`.toLowerCase();
      
      searchTerms.forEach(term => {
        // Exact title match gets highest score
        if (item.title.toLowerCase().includes(term)) {
          score += 10;
        }
        // Keyword match gets high score
        if (item.keywords.some(keyword => keyword.includes(term))) {
          score += 5;
        }
        // Description match gets medium score
        if (item.description.toLowerCase().includes(term)) {
          score += 3;
        }
        // Any text match gets base score
        if (itemText.includes(term)) {
          score += 1;
        }
      });
      
      return { item, score };
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(result => result.item)
    .slice(0, 10); // Return top 10 results
}
