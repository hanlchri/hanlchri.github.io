export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: 'assignment' | 'homework' | 'lesson' | 'resource' | 'bonus' | 'gallery' | 'reference';
  page: 'java' | 'apcs' | 'gallery' | 'references';
  keywords: string[];
  filePath?: string;
}

const searchItems: SearchItem[] = [
  // APCS Assignments
  {
    id: 'apcs-assignment-0',
    title: 'Summer Assignment',
    description: 'APCS Summer Assignment to prepare for the course',
    category: 'assignment',
    page: 'apcs',
    keywords: ['summer', 'assignment', 'preparation', 'apcs'],
    filePath: '/documents/APCS/Assignments/APCS_Assignment0_SummerAssignment.pdf'
  },
  {
    id: 'apcs-assignment-1',
    title: '1: Computer Components',
    description: 'Introduction to computer components and hardware',
    category: 'assignment',
    page: 'apcs',
    keywords: ['computer', 'components', 'hardware', 'assignment'],
    filePath: '/documents/APCS/Assignments/APCS_Assignment1_ComputerComponents.pdf'
  },
  {
    id: 'apcs-assignment-2',
    title: '2: Operations Calculator',
    description: 'Building a calculator application with basic operations',
    category: 'assignment',
    page: 'apcs',
    keywords: ['calculator', 'operations', 'math', 'programming'],
    filePath: '/documents/APCS/Assignments/APCS_Assignment2_Operations Calculator.pdf'
  },
  {
    id: 'apcs-assignment-3',
    title: '3: Castle Stairs',
    description: 'Programming project involving graphics and loops',
    category: 'assignment',
    page: 'apcs',
    keywords: ['castle', 'stairs', 'graphics', 'loops'],
    filePath: '/documents/APCS/Assignments/APCS_Assignment3_CastleStairs.pdf'
  },
  {
    id: 'apcs-assignment-4',
    title: '4: Matrix Computer Store',
    description: 'Computer store management system project',
    category: 'assignment',
    page: 'apcs',
    keywords: ['matrix', 'computer', 'store', 'management'],
    filePath: '/documents/APCS/Assignments/APCS_Assignment4_ComputerStore.pdf'
  },
  {
    id: 'apcs-assignment-5',
    title: '5: Reusable Components',
    description: 'Creating reusable software components',
    category: 'assignment',
    page: 'apcs',
    keywords: ['reusable', 'components', 'modular', 'programming'],
    filePath: '/documents/APCS/Assignments/APCS_Assignment5_DoubleIntVerifier.pdf'
  },
  {
    id: 'apcs-assignment-6',
    title: '6: Group Presentations',
    description: 'Group presentation assignment for APCS',
    category: 'assignment',
    page: 'apcs',
    keywords: ['group', 'presentation', 'teamwork', 'communication'],
    filePath: '/documents/APCS/Assignments/APCS_Assignment6_GroupPresentations.pdf'
  },
  {
    id: 'apcs-assignment-7',
    title: '7: Object Oriented Programming',
    description: 'Introduction to OOP concepts and implementation',
    category: 'assignment',
    page: 'apcs',
    keywords: ['oop', 'object', 'oriented', 'programming', 'classes'],
    filePath: '/documents/APCS/Assignments/APCS_Assignment7_DevelopingClasses.pdf'
  },
  {
    id: 'apcs-assignment-8',
    title: '8: Additional Class Features',
    description: 'Advanced class features and OOP concepts',
    category: 'assignment',
    page: 'apcs',
    keywords: ['class', 'features', 'advanced', 'oop'],
    filePath: '/documents/APCS/Assignments/APCS_Assignment8_OOPRound2.pdf'
  },
  {
    id: 'apcs-assignment-9',
    title: '9: String Methods',
    description: 'Working with string manipulation and methods',
    category: 'assignment',
    page: 'apcs',
    keywords: ['string', 'methods', 'manipulation', 'text'],
    filePath: '/documents/APCS/Assignments/APCS_Assignment9_Strings.pdf'
  },
  {
    id: 'apcs-assignment-10',
    title: '10: 2-Dimensional Arrays',
    description: 'Working with 2D arrays and matrix operations',
    category: 'assignment',
    page: 'apcs',
    keywords: ['2d', 'arrays', 'matrix', 'multidimensional'],
    filePath: '/documents/APCS/Assignments/APCS_Assignment10_2DArrays.pdf'
  },
  {
    id: 'apcs-assignment-11',
    title: '11: List Management',
    description: 'Managing lists and collections in Java',
    category: 'assignment',
    page: 'apcs',
    keywords: ['list', 'management', 'collections', 'arraylist'],
    filePath: '/documents/APCS/Assignments/APCS_Assignment11_ListManager.pdf'
  },
  {
    id: 'apcs-assignment-12',
    title: '12: Polymorphism',
    description: 'Understanding and implementing polymorphism',
    category: 'assignment',
    page: 'apcs',
    keywords: ['polymorphism', 'inheritance', 'abstract', 'interfaces'],
    filePath: '/documents/APCS/Assignments/APCS_Assignment12_Polymorphism.pdf'
  },
  {
    id: 'apcs-assignment-13',
    title: '13: Why Software is So Bad',
    description: 'Essay on software quality and engineering practices',
    category: 'assignment',
    page: 'apcs',
    keywords: ['software', 'essay', 'quality', 'engineering'],
    filePath: '/documents/APCS/Assignments/APCS_Assignment13_SoftwareEssay.pdf'
  },
  {
    id: 'apcs-assignment-14',
    title: '14: Stacks',
    description: 'Implementation and use of stack data structure',
    category: 'assignment',
    page: 'apcs',
    keywords: ['stack', 'data', 'structure', 'lifo'],
    filePath: '/documents/APCS/Assignments/APCS_Assignment14_Stacks.pdf'
  },
  {
    id: 'apcs-assignment-15',
    title: '15: Recursion',
    description: 'Understanding and implementing recursive algorithms',
    category: 'assignment',
    page: 'apcs',
    keywords: ['recursion', 'recursive', 'algorithms', 'base case'],
    filePath: '/documents/APCS/Assignments/APCS_Assignment15_Recursion.pdf'
  },
  {
    id: 'apcs-assignment-16',
    title: '16: Intel Pentium Bug',
    description: 'Essay on the Intel Pentium floating-point bug',
    category: 'assignment',
    page: 'apcs',
    keywords: ['intel', 'pentium', 'bug', 'floating point', 'essay'],
    filePath: '/documents/APCS/Assignments/APCS_Assignment16_IntelPentiumBugEssay.pdf'
  },
  {
    id: 'apcs-assignment-17',
    title: '17: Searching and Sorting',
    description: 'Implementation of search and sort algorithms',
    category: 'assignment',
    page: 'apcs',
    keywords: ['searching', 'sorting', 'algorithms', 'binary search'],
    filePath: '/documents/APCS/Assignments/APCS_Assign17_Sorting_and_Searching.pdf'
  },
  {
    id: 'apcs-assignment-18',
    title: '18: Hangman',
    description: 'Creating a hangman word game',
    category: 'assignment',
    page: 'apcs',
    keywords: ['hangman', 'game', 'word', 'project'],
    filePath: '/documents/APCS/Assignments/APCS_Assignment18_Hangman.pdf'
  },
  {
    id: 'apcs-assignment-strategy',
    title: 'Turn Based Strategy Game',
    description: 'Final project creating a turn-based strategy game',
    category: 'assignment',
    page: 'apcs',
    keywords: ['strategy', 'game', 'turn-based', 'final project'],
    filePath: '/documents/APCS/Assignments/APCS_Assignment_TurnBasedStrategyGame.pdf'
  },

  // APCS Homework
  {
    id: 'apcs-hw-pythagorean',
    title: 'Pythagorean Triples',
    description: 'Homework on Pythagorean triples calculation',
    category: 'homework',
    page: 'apcs',
    keywords: ['pythagorean', 'triples', 'math', 'homework'],
    filePath: '/documents/APCS/Homework/APCS_Homework_PythagoreanTriples.pdf'
  },
  {
    id: 'apcs-hw-stars',
    title: 'Spread out the Stars',
    description: 'Graphics homework involving star patterns',
    category: 'homework',
    page: 'apcs',
    keywords: ['stars', 'graphics', 'patterns', 'homework'],
    filePath: '/documents/APCS/Homework/APCS_Homework_SpreadStars.pdf'
  },
  {
    id: 'apcs-hw-arrays',
    title: 'Array Copying',
    description: 'Homework on array copying techniques',
    category: 'homework',
    page: 'apcs',
    keywords: ['array', 'copying', 'homework', 'references'],
    filePath: '/documents/APCS/Homework/APCS_Homework_ArrayCopying.pdf'
  },
  {
    id: 'apcs-hw-roach',
    title: 'Roach Population',
    description: 'Simulation homework on population growth',
    category: 'homework',
    page: 'apcs',
    keywords: ['roach', 'population', 'simulation', 'growth'],
    filePath: '/documents/APCS/Homework/APCS_Homework_RoachPopulation.pdf'
  },
  {
    id: 'apcs-hw-graphics',
    title: 'Paint BullsEye and Scalable House',
    description: 'Graphics homework with geometric shapes',
    category: 'homework',
    page: 'apcs',
    keywords: ['graphics', 'bullseye', 'house', 'shapes'],
    filePath: '/documents/APCS/Homework/APCS_Homework_PaintBullsEyeHouse.pdf'
  },
  {
    id: 'apcs-hw-inheritance',
    title: 'Inheritance Hierarchy',
    description: 'Homework on inheritance and class hierarchies',
    category: 'homework',
    page: 'apcs',
    keywords: ['inheritance', 'hierarchy', 'classes', 'oop'],
    filePath: '/documents/APCS/Homework/APCS_Homework_InheritanceHierarchy.pdf'
  },
  {
    id: 'apcs-hw-coffee',
    title: 'Coffee Seller',
    description: 'Homework on coffee seller application',
    category: 'homework',
    page: 'apcs',
    keywords: ['coffee', 'seller', 'application', 'business'],
    filePath: '/documents/APCS/Homework/APCSHomework_Coffee_SellerV2.pdf'
  },
  {
    id: 'apcs-hw-eniac',
    title: 'ENIAC Essay',
    description: 'Essay homework on ENIAC computer history',
    category: 'homework',
    page: 'apcs',
    keywords: ['eniac', 'essay', 'computer', 'history'],
    filePath: '/documents/APCS/Homework/APCS_Homework_ENIAC.pdf'
  },
  {
    id: 'apcs-hw-patterns',
    title: 'Graphics Patterns',
    description: 'Homework on creating graphics patterns',
    category: 'homework',
    page: 'apcs',
    keywords: ['graphics', 'patterns', 'homework', 'drawing'],
    filePath: '/documents/APCS/Homework/APCS_Homework_Graphics_Patterns.pdf'
  },

  // APCS Lessons
  {
    id: 'apcs-lesson-java-review',
    title: 'Java Review',
    description: 'Review lesson for Java fundamentals',
    category: 'lesson',
    page: 'apcs',
    keywords: ['java', 'review', 'fundamentals', 'lesson'],
    filePath: '/documents/APCS/Lessons/APCS_Lesson_JavaReview_FilledOut.docx'
  },
  {
    id: 'apcs-lesson-imports',
    title: 'Class Imports',
    description: 'Lesson on importing classes and packages',
    category: 'lesson',
    page: 'apcs',
    keywords: ['imports', 'classes', 'packages', 'lesson'],
    filePath: '/documents/APCS/Lessons/APCS_Lesson_ClassImports_FilledOut.docx'
  },
  {
    id: 'apcs-lesson-bases',
    title: 'Assigning Bases',
    description: 'Lesson on number bases and conversion',
    category: 'lesson',
    page: 'apcs',
    keywords: ['bases', 'number', 'conversion', 'binary'],
    filePath: '/documents/APCS/Lessons/APCS_Lesson_AssigningBases_FilledOut.docx'
  },
  {
    id: 'apcs-lesson-roundoff',
    title: 'Round Off Error',
    description: 'Lesson on floating-point precision errors',
    category: 'lesson',
    page: 'apcs',
    keywords: ['roundoff', 'error', 'floating point', 'precision'],
    filePath: '/documents/APCS/Lessons/APCS_Lesson_RoundOffError_FilledOut.docx'
  },
  {
    id: 'apcs-lesson-random',
    title: 'Random',
    description: 'Lesson on random number generation',
    category: 'lesson',
    page: 'apcs',
    keywords: ['random', 'numbers', 'generation', 'lesson'],
    filePath: '/documents/APCS/Lessons/APCS_Lesson_Random_FilledOut.docx'
  },
  {
    id: 'apcs-lesson-objects',
    title: 'Objects',
    description: 'Lesson on object-oriented programming concepts',
    category: 'lesson',
    page: 'apcs',
    keywords: ['objects', 'oop', 'classes', 'instances'],
    filePath: '/documents/APCS/Lessons/APCS_Lesson_Objects_FilledOut.pptx'
  },
  {
    id: 'apcs-lesson-params',
    title: 'Parameter Passing',
    description: 'Lesson on parameter passing in methods',
    category: 'lesson',
    page: 'apcs',
    keywords: ['parameter', 'passing', 'methods', 'arguments'],
    filePath: '/documents/APCS/Lessons/APCS_Lesson_ParamPassing_FilledOut.docx'
  },
  {
    id: 'apcs-lesson-shorteval',
    title: 'Short Circuit Evaluation',
    description: 'Lesson on short-circuit evaluation in boolean expressions',
    category: 'lesson',
    page: 'apcs',
    keywords: ['short circuit', 'evaluation', 'boolean', 'expressions'],
    filePath: '/documents/APCS/Lessons/APCS_Lesson_ShortEval_FilledOut.docx'
  },
  {
    id: 'apcs-lesson-oop',
    title: 'Object Oriented Programming',
    description: 'Core lesson on OOP principles',
    category: 'lesson',
    page: 'apcs',
    keywords: ['oop', 'object oriented', 'programming', 'principles'],
    filePath: '/documents/APCS/Lessons/APCS_Lesson_OOP_FilledOut.docx'
  },
  {
    id: 'apcs-lesson-advanced-oop',
    title: 'Advanced OOP',
    description: 'Advanced object-oriented programming concepts',
    category: 'lesson',
    page: 'apcs',
    keywords: ['advanced', 'oop', 'inheritance', 'polymorphism'],
    filePath: '/documents/APCS/Lessons/APCS_Lesson_AdvancedOOP_FilledOut.docx'
  },
  {
    id: 'apcs-lesson-interfaces',
    title: 'Interfaces',
    description: 'Lesson on Java interfaces and abstract classes',
    category: 'lesson',
    page: 'apcs',
    keywords: ['interfaces', 'abstract', 'classes', 'contracts'],
    filePath: '/documents/APCS/Lessons/APCS_Lesson_Interfaces_FilledOut.docx'
  },
  {
    id: 'apcs-lesson-strings',
    title: 'Strings',
    description: 'Lesson on string manipulation and methods',
    category: 'lesson',
    page: 'apcs',
    keywords: ['strings', 'manipulation', 'methods', 'text'],
    filePath: '/documents/APCS/Lessons/APCS_Lesson_Strings_FilledOut.docx'
  },
  {
    id: 'apcs-lesson-arrays',
    title: 'Arrays',
    description: 'Lesson on array creation and manipulation',
    category: 'lesson',
    page: 'apcs',
    keywords: ['arrays', 'creation', 'manipulation', 'data structures'],
    filePath: '/documents/APCS/Lessons/APCS_Lesson_Arrays_FilledOut.docx'
  },
  {
    id: 'apcs-lesson-arraylists',
    title: 'ArrayLists',
    description: 'Lesson on ArrayList usage and methods',
    category: 'lesson',
    page: 'apcs',
    keywords: ['arraylist', 'dynamic', 'arrays', 'collections'],
    filePath: '/documents/APCS/Lessons/APCS_Lesson_ArrayLists_FilledOut.docx'
  },
  {
    id: 'apcs-lesson-foreach',
    title: 'For-Each Loop',
    description: 'Lesson on for-each loop syntax and usage',
    category: 'lesson',
    page: 'apcs',
    keywords: ['for each', 'loop', 'enhanced', 'iteration'],
    filePath: '/documents/APCS/Lessons/APCS_Lesson_ForEachLoop_FilledOut.docx'
  },
  {
    id: 'apcs-lesson-midterm',
    title: 'Midterm Review',
    description: 'Review lesson for midterm examination',
    category: 'lesson',
    page: 'apcs',
    keywords: ['midterm', 'review', 'exam', 'preparation'],
    filePath: '/documents/APCS/Lessons/APCS_Lesson_MidtermReview_FilledOut.docx'
  },
  {
    id: 'apcs-lesson-fileio',
    title: 'File I/O',
    description: 'Lesson on file input and output operations',
    category: 'lesson',
    page: 'apcs',
    keywords: ['file', 'input', 'output', 'io', 'reading', 'writing'],
    filePath: '/documents/APCS/Lessons/APCS_Lesson_FilesIO_FilledOut.docx'
  },
  {
    id: 'apcs-lesson-inheritance',
    title: 'Inheritance',
    description: 'Lesson on inheritance and class hierarchies',
    category: 'lesson',
    page: 'apcs',
    keywords: ['inheritance', 'super', 'extends', 'hierarchy'],
    filePath: '/documents/APCS/Lessons/APCS_Lesson_Inheritance_FilledOut.docx'
  },
  {
    id: 'apcs-lesson-polymorphism',
    title: 'Polymorphism',
    description: 'Lesson on polymorphism implementation',
    category: 'lesson',
    page: 'apcs',
    keywords: ['polymorphism', 'override', 'dynamic', 'binding'],
    filePath: '/documents/APCS/Lessons/APCS_Lesson_Polymorphism_FilledOut.docx'
  },
  {
    id: 'apcs-lesson-recursion',
    title: 'Recursion',
    description: 'Lesson on recursive programming techniques',
    category: 'lesson',
    page: 'apcs',
    keywords: ['recursion', 'recursive', 'base case', 'algorithms'],
    filePath: '/documents/APCS/Lessons/APCS_Lesson_Recursion_FilledOut.docx'
  },

  // APCS Resources
  {
    id: 'apcs-resource-cookbook',
    title: 'The Cookbook',
    description: 'Programming cookbook with common code patterns',
    category: 'resource',
    page: 'apcs',
    keywords: ['cookbook', 'patterns', 'code', 'reference'],
    filePath: '/documents/Resources/Cookbook.pdf'
  },
  {
    id: 'apcs-resource-netbeans',
    title: 'Printing from Netbeans',
    description: 'Guide for printing code from NetBeans IDE',
    category: 'resource',
    page: 'apcs',
    keywords: ['netbeans', 'printing', 'ide', 'guide'],
    filePath: '/documents/Resources/NetbeansPrintingGuide.pdf'
  },
  {
    id: 'apcs-resource-gui',
    title: 'GUI Survival Guide',
    description: 'Guide for creating graphical user interfaces',
    category: 'resource',
    page: 'apcs',
    keywords: ['gui', 'interface', 'swing', 'graphics'],
    filePath: '/documents/Resources/GUISurvivalGuide.pdf'
  },
  {
    id: 'apcs-resource-sound',
    title: 'Sound File',
    description: 'Audio file resource for programming projects',
    category: 'resource',
    page: 'apcs',
    keywords: ['sound', 'audio', 'file', 'wav'],
    filePath: '/documents/Resources/SoundFile.wav'
  },
  {
    id: 'apcs-resource-jtattoo',
    title: 'Making round buttons',
    description: 'JTattoo library for custom button styling',
    category: 'resource',
    page: 'apcs',
    keywords: ['jtattoo', 'buttons', 'styling', 'gui', 'round'],
    filePath: '/documents/Resources/JTattoo-1.6.13.jar'
  },

  // APCS Bonus Projects
  {
    id: 'apcs-bonus-base-converter',
    title: '1st Quarter: Base Converter',
    description: 'Bonus project for converting between number bases',
    category: 'bonus',
    page: 'apcs',
    keywords: ['base', 'converter', 'number', 'binary', 'hexadecimal'],
    filePath: '/documents/APCS/Bonus/APCS_Bonus_BaseConverter.pdf'
  },
  {
    id: 'apcs-bonus-pnz',
    title: '1st Quarter: PNZ',
    description: 'PNZ bonus project for first quarter',
    category: 'bonus',
    page: 'apcs',
    keywords: ['pnz', 'bonus', 'project', 'first quarter'],
    filePath: '/documents/APCS/Bonus/APCS_Bonus_PNZ.pdf'
  },
  {
    id: 'apcs-bonus-hotel',
    title: '2nd Quarter: Hotel System',
    description: 'Hotel management system bonus project',
    category: 'bonus',
    page: 'apcs',
    keywords: ['hotel', 'system', 'management', 'bonus'],
    filePath: '/documents/APCS/Bonus/APCS_Bonus_HotelSystem.pdf'
  },
  {
    id: 'apcs-bonus-blackjack',
    title: '3rd Quarter: Black Jack',
    description: 'Blackjack card game bonus project',
    category: 'bonus',
    page: 'apcs',
    keywords: ['blackjack', 'card', 'game', 'bonus'],
    filePath: '/documents/APCS/Bonus/APCS_Bonus_BlackJack.pdf'
  },
  {
    id: 'apcs-bonus-yahtzee',
    title: 'Yahtzee',
    description: 'Yahtzee dice game bonus project',
    category: 'bonus',
    page: 'apcs',
    keywords: ['yahtzee', 'dice', 'game', 'bonus'],
    filePath: '/documents/APCS/Bonus/APCS_Bonus_Yahtzee.pdf'
  },
  {
    id: 'apcs-bonus-risk',
    title: 'Risk',
    description: 'Risk strategy game bonus project',
    category: 'bonus',
    page: 'apcs',
    keywords: ['risk', 'strategy', 'game', 'bonus'],
    filePath: '/documents/APCS/Bonus/APCS_Bonus_Risk.pdf'
  },

  // Java Assignments
  {
    id: 'java-assignment-1',
    title: '1: Basic Console Applications',
    description: 'Introduction to Java console programming',
    category: 'assignment',
    page: 'java',
    keywords: ['console', 'basic', 'java', 'programming', 'introduction'],
    filePath: '/documents/Java/Assignments/Java_Assignment1_BasicConsoleApplications.pdf'
  },
  {
    id: 'java-assignment-2',
    title: '2: Currency Converter',
    description: 'Building a currency conversion application',
    category: 'assignment',
    page: 'java',
    keywords: ['currency', 'converter', 'exchange', 'rates'],
    filePath: '/documents/Java/Assignments/Java_Assignment2_CurrencyConverter.pdf'
  },
  {
    id: 'java-assignment-2-5',
    title: '2.5: Change Calculator',
    description: 'Calculator for making change from purchases',
    category: 'assignment',
    page: 'java',
    keywords: ['change', 'calculator', 'money', 'math'],
    filePath: '/documents/Java/Assignments/Java_Assignment2.5_ChangeTwenty.pdf'
  },
  {
    id: 'java-assignment-3',
    title: '3: Loops',
    description: 'Loop practice and implementation exercises',
    category: 'assignment',
    page: 'java',
    keywords: ['loops', 'practice', 'for', 'while', 'iteration'],
    filePath: '/documents/Java/Assignments/Java_Assignment3_LoopPractice.pdf'
  },
  {
    id: 'java-assignment-4-budget',
    title: '4: Budget',
    description: 'Budget management application using arrays',
    category: 'assignment',
    page: 'java',
    keywords: ['budget', 'arrays', 'finance', 'management'],
    filePath: '/documents/Java/Assignments/Java_Assignment4_Budget.pdf'
  },
  {
    id: 'java-assignment-4-racko',
    title: '4: RackO',
    description: 'RackO card game implementation',
    category: 'assignment',
    page: 'java',
    keywords: ['racko', 'card', 'game', 'arrays'],
    filePath: '/documents/Java/Assignments/Java_Assignment4_RackO.pdf'
  },
  {
    id: 'java-assignment-4-5',
    title: '4.5: Object Oriented Basics',
    description: 'Introduction to object-oriented programming in Java',
    category: 'assignment',
    page: 'java',
    keywords: ['object', 'oriented', 'basics', 'classes', 'objects'],
    filePath: '/documents/Java/Assignments/Java_Assignment4.5_Object_Oriented_Basics.pdf'
  },
  {
    id: 'java-assignment-5',
    title: '5: Swing Basics',
    description: 'Introduction to GUI programming with Swing',
    category: 'assignment',
    page: 'java',
    keywords: ['swing', 'gui', 'interface', 'basics'],
    filePath: '/documents/Java/Assignments/Java_Assignment5_SwingBasics.pdf'
  },
  {
    id: 'java-assignment-6',
    title: '6: Final Project',
    description: 'Comprehensive final project for Java course',
    category: 'assignment',
    page: 'java',
    keywords: ['final', 'project', 'comprehensive', 'application'],
    filePath: '/documents/Java/Assignments/Java_Assignment6_FinalProject.pdf'
  },

  // Java Homework
  {
    id: 'java-hw-glossary',
    title: 'Glossary Terms',
    description: 'Java programming terminology and definitions',
    category: 'homework',
    page: 'java',
    keywords: ['glossary', 'terms', 'definitions', 'vocabulary'],
    filePath: '/documents/Java/Homework/GlossaryTerms.pdf'
  },
  {
    id: 'java-hw-loops',
    title: 'Loops',
    description: 'Homework exercises on loop structures',
    category: 'homework',
    page: 'java',
    keywords: ['loops', 'homework', 'practice', 'exercises'],
    filePath: '/documents/Java/Homework/Java_Loops_HW.pdf'
  },
  {
    id: 'java-hw-arrays',
    title: 'Arrays',
    description: 'Array homework exercises and problems',
    category: 'homework',
    page: 'java',
    keywords: ['arrays', 'homework', 'exercises', 'data structures'],
    filePath: '/documents/Java/Homework/JavaHWArrays.pdf'
  },

  // Java Lessons  
  {
    id: 'java-lesson-math-ops',
    title: 'Math Operations',
    description: 'Lesson on mathematical operations in Java',
    category: 'lesson',
    page: 'java',
    keywords: ['math', 'operations', 'arithmetic', 'calculations'],
    filePath: '/documents/Java/Lessons/Java_Lesson_MathOperators_FilledOut.docx'
  },
  {
    id: 'java-lesson-data-modeling',
    title: 'Data Modeling',
    description: 'Introduction to data modeling concepts',
    category: 'lesson',
    page: 'java',
    keywords: ['data', 'modeling', 'structures', 'design'],
    filePath: '/documents/Java/Lessons/Java_Lesson_Intro_To_DataModeling_Blank_FilledOut.docx'
  },
  {
    id: 'java-lesson-selection',
    title: 'Selection Statements',
    description: 'Lesson on if-else and switch statements',
    category: 'lesson',
    page: 'java',
    keywords: ['selection', 'if', 'else', 'switch', 'conditions'],
    filePath: '/documents/Java/Lessons/Java_Lesson_SelectionStatements_FilledOut.docx'
  },
  {
    id: 'java-lesson-looping',
    title: 'Looping',
    description: 'Comprehensive lesson on loop structures',
    category: 'lesson',
    page: 'java',
    keywords: ['looping', 'for', 'while', 'do-while', 'iteration'],
    filePath: '/documents/Java/Lessons/Java_Lesson_Looping_FilledOut.docx'
  },
  {
    id: 'java-lesson-random',
    title: 'Random',
    description: 'Working with random numbers in Java',
    category: 'lesson',
    page: 'java',
    keywords: ['random', 'numbers', 'generation', 'math'],
    filePath: '/documents/Java/Lessons/Java_Lesson_Random_FilledOut.docx'
  },
  {
    id: 'java-lesson-scope',
    title: 'Scope',
    description: 'Understanding variable scope in Java',
    category: 'lesson',
    page: 'java',
    keywords: ['scope', 'variables', 'local', 'global'],
    filePath: '/documents/Java/Lessons/Java_Lesson_Scope_FilledOut.docx'
  },
  {
    id: 'java-lesson-arrays',
    title: 'Arrays',
    description: 'Working with arrays in Java',
    category: 'lesson',
    page: 'java',
    keywords: ['arrays', 'data structures', 'collections'],
    filePath: '/documents/Java/Lessons/Java_Lesson_Arrays_FilledOut.docx'
  },
  {
    id: 'java-lesson-final-review',
    title: 'Final Review',
    description: 'Final exam review material for Java course',
    category: 'lesson',
    page: 'java',
    keywords: ['final', 'review', 'exam', 'preparation'],
    filePath: '/documents/Java/Lessons/Java_Lesson_FinalReview.docx'
  },

  // Java Resources
  {
    id: 'java-resource-cookbook',
    title: 'The Cookbook',
    description: 'Java programming cookbook with examples',
    category: 'resource',
    page: 'java',
    keywords: ['cookbook', 'examples', 'reference', 'patterns'],
    filePath: '/documents/Resources/Cookbook.pdf'
  },
  {
    id: 'java-resource-netbeans',
    title: 'Printing from Netbeans',
    description: 'Guide for printing from NetBeans IDE',
    category: 'resource',
    page: 'java',
    keywords: ['netbeans', 'printing', 'ide', 'guide'],
    filePath: '/documents/Resources/NetbeansPrintingGuide.pdf'
  },
  {
    id: 'java-resource-gui-guide',
    title: 'GUI Survival Guide',
    description: 'Guide for Java GUI programming',
    category: 'resource',
    page: 'java',
    keywords: ['gui', 'swing', 'interface', 'guide'],
    filePath: '/documents/Resources/GUISurvivalGuide.pdf'
  },

  // Java Bonus
  {
    id: 'java-bonus-coinflip',
    title: 'Coinflip Problem',
    description: 'Bonus problem involving coin flip simulation',
    category: 'bonus',
    page: 'java',
    keywords: ['coinflip', 'simulation', 'probability', 'bonus'],
    filePath: '/documents/Java/Bonus/Java_Bonus_CoinFlip.pdf'
  },
  {
    id: 'java-bonus-fox-goose',
    title: 'Fox Goose Grain Problem',
    description: 'Classic logic puzzle bonus problem',
    category: 'bonus',
    page: 'java',
    keywords: ['fox', 'goose', 'grain', 'logic', 'puzzle'],
    filePath: '/documents/Java/Bonus/Java_Bonus_FoxGooseGrain.pdf'
  },

  // Gallery Items
  {
    id: 'gallery-p5js-game',
    title: 'P5.js Game',
    description: 'A creative JavaScript game built with p5.js created by Mr. Hanley',
    category: 'gallery',
    page: 'gallery',
    keywords: ['p5js', 'javascript', 'game', 'interactive', 'creative'],
    filePath: '/GalleryPages/FallingBlocks/index.html'
  },
  {
    id: 'gallery-java-swing',
    title: 'Java Swing Example',
    description: 'Java Swing example demonstrating GUI programming',
    category: 'gallery',
    page: 'gallery',
    keywords: ['java', 'swing', 'gui', 'example', 'demo'],
    filePath: '/gallery/files/swing-demo.jar'
  },

  // References
  {
    id: 'reference-w3schools',
    title: 'W3Schools',
    description: 'Comprehensive web development tutorials and references',
    category: 'reference',
    page: 'references',
    keywords: ['w3schools', 'tutorials', 'web', 'development', 'reference']
  },
  {
    id: 'reference-sololearn',
    title: 'SoloLearn',
    description: 'Interactive coding lessons and practice',
    category: 'reference',
    page: 'references',
    keywords: ['sololearn', 'interactive', 'coding', 'lessons', 'practice']
  },
  {
    id: 'reference-programiz',
    title: 'Programiz',
    description: 'Programming tutorials and examples',
    category: 'reference',
    page: 'references',
    keywords: ['programiz', 'programming', 'tutorials', 'examples']
  },
  {
    id: 'reference-codecademy',
    title: 'Code Academy',
    description: 'Interactive programming courses',
    category: 'reference',
    page: 'references',
    keywords: ['codecademy', 'interactive', 'courses', 'programming']
  },
  {
    id: 'reference-hackerrank',
    title: 'HackerRank',
    description: 'Coding challenges and practice problems',
    category: 'reference',
    page: 'references',
    keywords: ['hackerrank', 'coding', 'challenges', 'practice', 'problems']
  },
  {
    id: 'reference-codingbat',
    title: 'CodingBat',
    description: 'Java and Python coding practice',
    category: 'reference',
    page: 'references',
    keywords: ['codingbat', 'java', 'python', 'coding', 'practice']
  },
  {
    id: 'reference-codechef',
    title: 'CodeChef',
    description: 'Competitive programming platform',
    category: 'reference',
    page: 'references',
    keywords: ['codechef', 'competitive', 'programming', 'contests']
  },
  {
    id: 'reference-codewars',
    title: 'CodeWars',
    description: 'Coding challenges and kata',
    category: 'reference',
    page: 'references',
    keywords: ['codewars', 'challenges', 'kata', 'coding']
  },
  {
    id: 'reference-replit',
    title: 'Repl.it',
    description: 'Online IDE for various programming languages',
    category: 'reference',
    page: 'references',
    keywords: ['replit', 'online', 'ide', 'programming', 'editor']
  }
];

// Semantic keyword mappings for better search
const semanticMappings: { [key: string]: string[] } = {
  'oop': ['object oriented', 'object-oriented', 'classes', 'objects', 'inheritance', 'polymorphism', 'encapsulation'],
  'arrays': ['array', 'list', 'collection', 'data structure', 'arraylist'],
  'loops': ['loop', 'iteration', 'for', 'while', 'do-while', 'foreach', 'enhanced for'],
  'string': ['strings', 'text', 'character', 'char', 'manipulation'],
  'gui': ['swing', 'interface', 'graphics', 'buttons', 'windows', 'frames'],
  'math': ['mathematics', 'calculation', 'arithmetic', 'numbers', 'operations'],
  'game': ['games', 'gaming', 'interactive', 'play', 'simulation'],
  'recursion': ['recursive', 'self-calling', 'base case'],
  'inheritance': ['extends', 'super', 'hierarchy', 'parent', 'child'],
  'polymorphism': ['override', 'overload', 'multiple forms', 'dynamic binding'],
  'file': ['files', 'io', 'input', 'output', 'reading', 'writing', 'data'],
  'review': ['exam', 'test', 'preparation', 'study', 'practice'],
  'bonus': ['extra', 'additional', 'challenge', 'optional']
};

// Preprocessed search items for performance
interface PreprocessedSearchItem extends SearchItem {
  titleLower: string;
  descriptionLower: string;
  keywordsLower: string[];
  keywordSet: Set<string>;
}

const preprocessedItems: PreprocessedSearchItem[] = searchItems.map(item => ({
  ...item,
  titleLower: item.title.toLowerCase(),
  descriptionLower: item.description.toLowerCase(),
  keywordsLower: item.keywords.map(k => k.toLowerCase()),
  keywordSet: new Set(item.keywords.map(k => k.toLowerCase()))
}));

function getKeywordScore(searchTerm: string, item: PreprocessedSearchItem): number {
  let score = 0;
  
  // O(1) exact match check
  if (item.keywordSet.has(searchTerm)) {
    score += 10;
  }
  
  // Partial keyword matches
  for (const keyword of item.keywordsLower) {
    if (keyword !== searchTerm && keyword.includes(searchTerm)) {
      score += 5;
    }
  }
  
  // Semantic matches - optimized
  const semanticWords = semanticMappings[searchTerm];
  if (semanticWords) {
    for (const semanticWord of semanticWords) {
      if (item.keywordSet.has(semanticWord)) {
        score += 3;
        break; // Only count once per semantic group
      }
    }
    
    // Check for partial semantic matches
    for (const semanticWord of semanticWords) {
      for (const keyword of item.keywordsLower) {
        if (keyword.includes(semanticWord)) {
          score += 1;
          break;
        }
      }
    }
  }
  
  return score;
}

export function searchAssignments(query: string, options?: { 
  pageFilter?: string;
  categoryFilter?: string;
  maxResults?: number;
}): SearchItem[] {
  if (!query.trim()) return [];
  
  const { pageFilter = 'all', categoryFilter = 'all', maxResults = 20 } = options || {};
  
  // Multi-word search support
  const searchTerms = query.toLowerCase().trim().split(/\s+/);
  const results: (PreprocessedSearchItem & { score: number })[] = [];
  
  for (const item of preprocessedItems) {
    // Apply filters early for performance
    if (pageFilter !== 'all' && item.page !== pageFilter) continue;
    if (categoryFilter !== 'all' && item.category !== categoryFilter) continue;
    
    let totalScore = 0;
    
    // Score each search term
    for (const term of searchTerms) {
      let termScore = 0;
      
      // Title matching (highest priority)
      if (item.titleLower.includes(term)) {
        termScore += item.titleLower === term ? 100 : 50;
      }
      
      // Description matching
      if (item.descriptionLower.includes(term)) {
        termScore += 20;
      }
      
      // Category matching
      if (item.category.toLowerCase().includes(term)) {
        termScore += 15;
      }
      
      // Page matching
      if (item.page.toLowerCase().includes(term)) {
        termScore += 10;
      }
      
      // Keyword matching with semantic support
      termScore += getKeywordScore(term, item);
      
      totalScore += termScore;
    }
    
    // Bonus for matching all terms
    if (searchTerms.length > 1) {
      let matchedTerms = 0;
      for (const term of searchTerms) {
        if (item.titleLower.includes(term) || 
            item.descriptionLower.includes(term) ||
            item.keywordsLower.some(k => k.includes(term))) {
          matchedTerms++;
        }
      }
      if (matchedTerms === searchTerms.length) {
        totalScore += 25; // Bonus for matching all search terms
      }
    }
    
    if (totalScore > 0) {
      results.push({ ...item, score: totalScore });
    }
  }
  
  // Sort by score and return limited results
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(({ score, keywordSet, keywordsLower, titleLower, descriptionLower, ...item }) => item as SearchItem);
}

// Utility functions for filtering
export function getItemsByPage(page: 'java' | 'apcs' | 'gallery' | 'references'): SearchItem[] {
  return searchItems.filter(item => item.page === page);
}

export function getItemsByCategory(category: SearchItem['category']): SearchItem[] {
  return searchItems.filter(item => item.category === category);
}

export function getAllCategories(): string[] {
  return [...new Set(searchItems.map(item => item.category))];
}

export function getAllPages(): string[] {
  return [...new Set(searchItems.map(item => item.page))];
}