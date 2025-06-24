
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
    url: '/documents/Java/Assignments/Java_Assignment1_BasicConsoleApplications.pdf'
  },
  {
    id: 'java-assignment-2',
    title: '2: Currency Converter',
    description: 'Build a currency conversion application using Java',
    category: 'assignment',
    page: 'java',
    keywords: ['currency', 'converter', 'conversion', 'money', 'exchange', 'calculator'],
    url: '/documents/Java/Assignments/Java_Assignment2_CurrencyConverter.pdf'
  },
  {
    id: 'java-assignment-2-5',
    title: '2.5: Change Calculator',
    description: 'Calculate change for transactions',
    category: 'assignment',
    page: 'java',
    keywords: ['change', 'calculator', 'money', 'transactions', 'coins', 'bills'],
    url: '/documents/Java/Assignments/Java_Assignment2.5_ChangeTwenty.pdf'
  },
  {
    id: 'java-assignment-3',
    title: '3: Loops',
    description: 'Practice with loop structures in Java',
    category: 'assignment',
    page: 'java',
    keywords: ['loops', 'for', 'while', 'iteration', 'repetition', 'control structures'],
    url: '/documents/Java/Assignments/Java_Assignment3_LoopPractice.pdf'
  },
  {
    id: 'java-assignment-4-budget',
    title: '4: Budget',
    description: 'Create a budget management application',
    category: 'assignment',
    page: 'java',
    keywords: ['budget', 'arrays', 'financial', 'management', 'money', 'expenses'],
    url: '/documents/Java/Assignments/Java_Assignment4_Budget.pdf'
  },
  {
    id: 'java-assignment-4-racko',
    title: '4: RackO',
    description: 'Implement the RackO card game using arrays',
    category: 'assignment',
    page: 'java',
    keywords: ['racko', 'game', 'arrays', 'cards', 'sorting', 'logic'],
    url: '/documents/Java/Assignments/Java_Assignment4_RackO.pdf'
  },
  {
    id: 'java-assignment-4-5',
    title: '4.5: Object Oriented Basics',
    description: 'Introduction to object-oriented programming concepts',
    category: 'assignment',
    page: 'java',
    keywords: ['object', 'oriented', 'oop', 'classes', 'objects', 'methods', 'encapsulation'],
    url: '/documents/Java/Assignments/Java_Assignment4.5_Object_Oriented_Basics.pdf'
  },
  {
    id: 'java-assignment-5',
    title: '5: Swing Basics',
    description: 'Create graphical user interfaces using Java Swing',
    category: 'assignment',
    page: 'java',
    keywords: ['swing', 'gui', 'graphical', 'interface', 'buttons', 'windows', 'ui'],
    url: '/documents/Java/Assignments/Java_Assignment5_SwingBasics.pdf'
  },
  {
    id: 'java-assignment-6',
    title: '6: Final Project',
    description: 'Comprehensive final project demonstrating Java skills',
    category: 'assignment',
    page: 'java',
    keywords: ['final', 'project', 'comprehensive', 'blackjack', 'game', 'advanced'],
    url: '/documents/Java/Assignments/Java_Assignment6_FinalProject.pdf'
  },

  // Java Homework
  {
    id: 'java-hw-glossary',
    title: 'Glossary Terms',
    description: 'Important Java programming terminology and definitions',
    category: 'homework',
    page: 'java',
    keywords: ['glossary', 'terms', 'definitions', 'vocabulary', 'java', 'programming'],
    url: '/documents/Java/Homework/GlossaryTerms.pdf'
  },
  {
    id: 'java-hw-logical',
    title: 'Logical Operators',
    description: 'Practice with logical operators in Java',
    category: 'homework',
    page: 'java',
    keywords: ['logical', 'operators', 'boolean', 'and', 'or', 'not', 'conditions'],
    url: '/documents/Java/Homework/LogicalOperatorsHW.pdf'
  },
  {
    id: 'java-hw-loops',
    title: 'Loops',
    description: 'Homework exercises on loop structures',
    category: 'homework',
    page: 'java',
    keywords: ['loops', 'for', 'while', 'iteration', 'practice', 'exercises'],
    url: '/documents/Java/Homework/Java_Loops_HW.pdf'
  },
  {
    id: 'java-hw-arrays',
    title: 'Arrays',
    description: 'Array manipulation and processing exercises',
    category: 'homework',
    page: 'java',
    keywords: ['arrays', 'data structures', 'indexing', 'manipulation', 'processing'],
    url: '/documents/Java/Homework/JavaHWArrays.pdf'
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
    url: '/documents/Java/Resources/TextbookChapters1_2.pdf'
  },
  {
    id: 'java-resource-cookbook',
    title: 'The Cookbook',
    description: 'Quick reference guide for Java programming',
    category: 'resource',
    page: 'java',
    keywords: ['cookbook', 'reference', 'guide', 'quick', 'help', 'syntax'],
    url: '/documents/Java/Resources/Cookbook.pdf'
  },
  {
    id: 'java-resource-gui',
    title: 'GUI Survival Guide',
    description: 'Guide for creating graphical user interfaces',
    category: 'resource',
    page: 'java',
    keywords: ['gui', 'survival', 'guide', 'interface', 'swing', 'graphics'],
    url: '/documents/Java/Resources/GUISurvivalGuide.pdf'
  },

  // Java Bonus
  {
    id: 'java-bonus-coinflip',
    title: 'Coinflip Problem',
    description: 'Advanced probability and simulation problem',
    category: 'bonus',
    page: 'java',
    keywords: ['coinflip', 'probability', 'simulation', 'random', 'statistics'],
    url: '/documents/Java/Bonus/Java_Bonus_CoinFlip.pdf'
  },
  {
    id: 'java-bonus-fox-goose',
    title: 'Fox Goose Grain Problem',
    description: 'Classic logic puzzle implementation',
    category: 'bonus',
    page: 'java',
    keywords: ['fox', 'goose', 'grain', 'puzzle', 'logic', 'algorithm'],
    url: '/documents/Java/Bonus/Java_Bonus_FoxGooseGrain.pdf'
  },

  // AP Computer Science Assignments
  {
    id: 'apcs-assignment-0',
    title: '0: Summer Assignment',
    description: 'Summer preparation assignment for AP Computer Science',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['summer', 'assignment', 'preparation', 'introduction'],
    url: '/documents/APCS/Assignments/APCS_Assignment0_SummerAssignment.pdf'
  },
  {
    id: 'apcs-assignment-1',
    title: '1: Computer Components',
    description: 'Introduction to computer components and hardware',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['computer', 'components', 'hardware', 'introduction'],
    url: '/documents/APCS/Assignments/APCS_Assignment1_ComputerComponents.pdf'
  },
  {
    id: 'apcs-assignment-2',
    title: '2: Operations Calculator',
    description: 'Create a calculator for mathematical operations',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['operations', 'calculator', 'math', 'arithmetic', 'computation'],
    url: '/documents/APCS/Assignments/APCS_Assignment2_Operations Calculator.pdf'
  },
  {
    id: 'apcs-assignment-3',
    title: '3: Castle Stairs',
    description: 'Programming challenge involving castle stairs pattern',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['castle', 'stairs', 'pattern', 'loops', 'challenge'],
    url: '/documents/APCS/Assignments/APCS_Assignment3_CastleStairs.pdf'
  },
  {
    id: 'apcs-assignment-4',
    title: '4: Matrix Computer Store',
    description: 'Computer store management system using matrices',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['matrix', 'computer', 'store', 'management', 'system'],
    url: '/documents/APCS/Assignments/APCS_Assignment4_ComputerStore.pdf'
  },
  {
    id: 'apcs-assignment-5',
    title: '5: Reusable Components',
    description: 'Creating reusable programming components',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['reusable', 'components', 'methods', 'functions', 'modular'],
    url: '/documents/APCS/Assignments/APCS_Assignment5_DoubleIntVerifier.pdf'
  },
  {
    id: 'apcs-assignment-6',
    title: '6: Group Presentations',
    description: 'Group presentation assignment on programming topics',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['group', 'presentations', 'collaboration', 'topics'],
    url: '/documents/APCS/Assignments/APCS_Assignment6_GroupPresentations.pdf'
  },
  {
    id: 'apcs-assignment-7',
    title: '7: Object Oriented Programming',
    description: 'Introduction to object-oriented programming concepts',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['object', 'oriented', 'programming', 'oop', 'classes'],
    url: '/documents/APCS/Assignments/APCS_Assignment7_DevelopingClasses.pdf'
  },
  {
    id: 'apcs-assignment-8',
    title: '8: Additional Class Features',
    description: 'Advanced object-oriented programming features',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['advanced', 'oop', 'class', 'features', 'methods'],
    url: '/documents/APCS/Assignments/APCS_Assignment8_OOPRound2.pdf'
  },
  {
    id: 'apcs-assignment-9',
    title: '9: String Methods',
    description: 'String manipulation and processing techniques',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['strings', 'methods', 'manipulation', 'processing', 'characters'],
    url: '/documents/APCS/Assignments/APCS_Assignment9_Strings.pdf'
  },
  {
    id: 'apcs-assignment-10',
    title: '10: 2-Dimensional Arrays',
    description: 'Two-dimensional array processing and manipulation',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['2d', 'arrays', 'matrix', 'grid', 'dimensional', 'processing'],
    url: '/documents/APCS/Assignments/APCS_Assignment10_2DArrays.pdf'
  },
  {
    id: 'apcs-assignment-11',
    title: '11: List Management',
    description: 'Working with lists and list management',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['lists', 'management', 'arraylist', 'collections'],
    url: '/documents/APCS/Assignments/APCS_Assignment11_ListManager.pdf'
  },
  {
    id: 'apcs-assignment-12',
    title: '12: Polymorphism',
    description: 'Understanding polymorphism and inheritance',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['polymorphism', 'inheritance', 'extends', 'override'],
    url: '/documents/APCS/Assignments/APCS_Assignment12_Polymorphism.pdf'
  },
  {
    id: 'apcs-assignment-13',
    title: '13: Why Software is So Bad',
    description: 'Essay on software quality and development challenges',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['software', 'essay', 'quality', 'development', 'challenges'],
    url: '/documents/APCS/Assignments/APCS_Assignment13_SoftwareEssay.pdf'
  },
  {
    id: 'apcs-assignment-14',
    title: '14: Stacks',
    description: 'Understanding and implementing stack data structures',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['stacks', 'data', 'structures', 'push', 'pop'],
    url: '/documents/APCS/Assignments/APCS_Assignment14_Stacks.pdf'
  },
  {
    id: 'apcs-assignment-15',
    title: '15: Recursion',
    description: 'Recursive algorithms and problem solving',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['recursion', 'recursive', 'algorithms', 'base case', 'self-calling'],
    url: '/documents/APCS/Assignments/APCS_Assignment15_Recursion.pdf'
  },
  {
    id: 'apcs-assignment-16',
    title: '16: Intel Pentium Bug',
    description: 'Essay on the Intel Pentium floating-point bug',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['intel', 'pentium', 'bug', 'floating', 'point', 'essay'],
    url: '/documents/APCS/Assignments/APCS_Assignment16_IntelPentiumBugEssay.pdf'
  },
  {
    id: 'apcs-assignment-17',
    title: '17: Searching and Sorting',
    description: 'Implementing search and sort algorithms',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['searching', 'sorting', 'algorithms', 'binary', 'linear'],
    url: '/documents/APCS/Assignments/APCS_Assign17_Sorting_and_Searching.pdf'
  },
  {
    id: 'apcs-assignment-18',
    title: '18: Hangman',
    description: 'Create a hangman word guessing game',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['hangman', 'game', 'word', 'guessing', 'strings'],
    url: '/documents/APCS/Assignments/APCS_Assignment18_Hangman.pdf'
  },
  {
    id: 'apcs-assignment-strategy',
    title: 'Turn Based Strategy Game',
    description: 'Design and implement a turn-based strategy game',
    category: 'assignment',
    page: 'ap-cs',
    keywords: ['strategy', 'game', 'turn', 'based', 'design'],
    url: '/documents/APCS/Assignments/APCS_Assignment_TurnBasedStrategyGame.pdf'
  },

  // APCS Homework
  {
    id: 'apcs-hw-pythagorean',
    title: 'Pythagorean Triples',
    description: 'Working with Pythagorean theorem and triples',
    category: 'homework',
    page: 'ap-cs',
    keywords: ['pythagorean', 'triples', 'theorem', 'math', 'geometry'],
    url: '/documents/APCS/Homework/APCS_Homework_PythagoreanTriples.pdf'
  },
  {
    id: 'apcs-hw-spread-stars',
    title: 'Spread out the Stars',
    description: 'Pattern printing exercise with stars',
    category: 'homework',
    page: 'ap-cs',
    keywords: ['stars', 'pattern', 'printing', 'loops', 'formatting'],
    url: '/documents/APCS/Homework/APCS_Homework_SpreadStars.pdf'
  },
  {
    id: 'apcs-hw-array-copying',
    title: 'Array Copying',
    description: 'Practice with array manipulation and copying',
    category: 'homework',
    page: 'ap-cs',
    keywords: ['array', 'copying', 'manipulation', 'practice'],
    url: '/documents/APCS/Homework/APCS_Homework_ArrayCopying.pdf'
  },
  {
    id: 'apcs-hw-roach-population',
    title: 'Roach Population',
    description: 'Population growth simulation exercise',
    category: 'homework',
    page: 'ap-cs',
    keywords: ['population', 'growth', 'simulation', 'modeling'],
    url: '/documents/APCS/Homework/APCS_Homework_RoachPopulation.pdf'
  },
  {
    id: 'apcs-hw-paint-bullseye',
    title: 'Paint BullsEye and Scalable House',
    description: 'Graphics programming with shapes and scaling',
    category: 'homework',
    page: 'ap-cs',
    keywords: ['graphics', 'bullseye', 'house', 'scaling', 'drawing'],
    url: '/documents/APCS/Homework/APCS_Homework_PaintBullsEyeHouse.pdf'
  },
  {
    id: 'apcs-hw-inheritance',
    title: 'Inheritance Hierarchy',
    description: 'Understanding class inheritance hierarchies',
    category: 'homework',
    page: 'ap-cs',
    keywords: ['inheritance', 'hierarchy', 'classes', 'extends', 'polymorphism'],
    url: '/documents/APCS/Homework/APCS_Homework_InheritanceHierarchy.pdf'
  },
  {
    id: 'apcs-hw-coffee-seller',
    title: 'Coffee Seller',
    description: 'Object-oriented coffee selling system',
    category: 'homework',
    page: 'ap-cs',
    keywords: ['coffee', 'seller', 'object', 'oriented', 'system'],
    url: '/documents/APCS/Homework/APCSHomework_Coffee_SellerV2.pdf'
  },
  {
    id: 'apcs-hw-eniac',
    title: 'ENIAC Essay',
    description: 'Historical essay on the ENIAC computer',
    category: 'homework',
    page: 'ap-cs',
    keywords: ['eniac', 'essay', 'history', 'computer', 'early'],
    url: '/documents/APCS/Homework/APCS_Homework_ENIAC.pdf'
  },
  {
    id: 'apcs-hw-graphics-patterns',
    title: 'Graphics Patterns',
    description: 'Creating visual patterns with graphics programming',
    category: 'homework',
    page: 'ap-cs',
    keywords: ['graphics', 'patterns', 'visual', 'programming', 'design'],
    url: '/documents/APCS/Homework/APCS_Homework_Graphics_Patterns.pdf'
  },

  // APCS Resources
  {
    id: 'apcs-resource-cookbook',
    title: 'The Cookbook',
    description: 'Quick reference guide for AP Computer Science',
    category: 'resource',
    page: 'ap-cs',
    keywords: ['cookbook', 'reference', 'guide', 'quick', 'help'],
    url: '/documents/APCS/Resources/Cookbook.pdf'
  },
  {
    id: 'apcs-resource-printing',
    title: 'Netbeans Printing Guide',
    description: 'Guide for printing code from Netbeans IDE',
    category: 'resource',
    page: 'ap-cs',
    keywords: ['netbeans', 'printing', 'guide', 'ide', 'code'],
    url: '/documents/APCS/Resources/NetbeansPrintingGuide.pdf'
  },
  {
    id: 'apcs-resource-gui',
    title: 'GUI Survival Guide',
    description: 'Guide for creating graphical user interfaces',
    category: 'resource',
    page: 'ap-cs',
    keywords: ['gui', 'survival', 'guide', 'interface', 'swing'],
    url: '/documents/APCS/Resources/GUISurvivalGuide.pdf'
  },

  // APCS Bonus
  {
    id: 'apcs-bonus-base-converter',
    title: '1st Quarter: Base Converter',
    description: 'Number base conversion utility program',
    category: 'bonus',
    page: 'ap-cs',
    keywords: ['base', 'converter', 'number', 'conversion', 'binary', 'hexadecimal'],
    url: '/documents/APCS/Bonus/APCS_Bonus_BaseConverter.pdf'
  },
  {
    id: 'apcs-bonus-pnz',
    title: '1st Quarter: PNZ',
    description: 'PNZ bonus programming challenge',
    category: 'bonus',
    page: 'ap-cs',
    keywords: ['pnz', 'challenge', 'programming', 'logic'],
    url: '/documents/APCS/Bonus/APCS_Bonus_PNZ.pdf'
  },
  {
    id: 'apcs-bonus-hotel',
    title: '2nd Quarter: Hotel System',
    description: 'Hotel management system implementation',
    category: 'bonus',
    page: 'ap-cs',
    keywords: ['hotel', 'system', 'management', 'reservation', 'booking'],
    url: '/documents/APCS/Bonus/APCS_Bonus_HotelSystem.pdf'
  },
  {
    id: 'apcs-bonus-blackjack',
    title: '3rd Quarter: Black Jack',
    description: 'Blackjack card game implementation',
    category: 'bonus',
    page: 'ap-cs',
    keywords: ['blackjack', 'card', 'game', 'casino', 'implementation'],
    url: '/documents/APCS/Bonus/APCS_Bonus_BlackJack.pdf'
  },
  {
    id: 'apcs-bonus-yahtzee',
    title: 'Yahtzee',
    description: 'Yahtzee dice game implementation',
    category: 'bonus',
    page: 'ap-cs',
    keywords: ['yahtzee', 'dice', 'game', 'scoring', 'probability'],
    url: '/documents/APCS/Bonus/APCS_Bonus_Yahtzee.pdf'
  },
  {
    id: 'apcs-bonus-risk',
    title: 'Risk',
    description: 'Risk strategy board game implementation',
    category: 'bonus',
    page: 'ap-cs',
    keywords: ['risk', 'strategy', 'board', 'game', 'conquest'],
    url: '/documents/APCS/Bonus/APCS_Bonus_Risk.pdf'
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
