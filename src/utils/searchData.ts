
// Search data for semantic search functionality
export interface SearchItem {
  id: string;
  title: string;
  category: string;
  keywords: string[];
  path: string;
  description?: string;
}

export const searchData: SearchItem[] = [
  // Java Assignments
  { id: 'java-1', title: 'Basic Console Applications', category: 'Java Assignments', keywords: ['console', 'basic', 'input', 'output', 'scanner'], path: '/java' },
  { id: 'java-2', title: 'Currency Converter', category: 'Java Assignments', keywords: ['currency', 'converter', 'math', 'calculations'], path: '/java' },
  { id: 'java-2.5', title: 'Change Calculator', category: 'Java Assignments', keywords: ['change', 'calculator', 'money', 'coins', 'bills'], path: '/java' },
  { id: 'java-3', title: 'Loops', category: 'Java Assignments', keywords: ['loops', 'for', 'while', 'iteration', 'frequency'], path: '/java' },
  { id: 'java-4', title: 'Arrays', category: 'Java Assignments', keywords: ['arrays', 'budget', 'racko', 'data structures'], path: '/java' },
  { id: 'java-4.5', title: 'Object Oriented Basics', category: 'Java Assignments', keywords: ['oop', 'objects', 'classes', 'student', 'basics'], path: '/java' },
  { id: 'java-5', title: 'Swing Basics', category: 'Java Assignments', keywords: ['swing', 'gui', 'interface', 'buttons', 'graphics'], path: '/java' },
  { id: 'java-6', title: 'Final Project', category: 'Java Assignments', keywords: ['final', 'project', 'blackjack', 'card', 'game'], path: '/java' },

  // APCS Assignments
  { id: 'apcs-summer', title: 'Summer Assignment', category: 'APCS Assignments', keywords: ['summer', 'preparation', 'intro'], path: '/ap-cs' },
  { id: 'apcs-1', title: 'Computer Components', category: 'APCS Assignments', keywords: ['computer', 'components', 'hardware', 'basics'], path: '/ap-cs' },
  { id: 'apcs-2', title: 'Operations Calculator', category: 'APCS Assignments', keywords: ['operations', 'calculator', 'math', 'arithmetic'], path: '/ap-cs' },
  { id: 'apcs-3', title: 'Castle Stairs', category: 'APCS Assignments', keywords: ['castle', 'stairs', 'patterns', 'loops'], path: '/ap-cs' },
  { id: 'apcs-4', title: 'Matrix Computer Store', category: 'APCS Assignments', keywords: ['matrix', 'computer', 'store', 'arrays'], path: '/ap-cs' },
  { id: 'apcs-5', title: 'Reusable Components', category: 'APCS Assignments', keywords: ['reusable', 'components', 'methods', 'functions'], path: '/ap-cs' },
  { id: 'apcs-6', title: 'Group Presentations', category: 'APCS Assignments', keywords: ['group', 'presentations', 'teamwork'], path: '/ap-cs' },
  { id: 'apcs-7', title: 'Object Oriented Programming', category: 'APCS Assignments', keywords: ['oop', 'object', 'oriented', 'classes', 'inheritance'], path: '/ap-cs' },
  { id: 'apcs-8', title: 'Additional Class Features', category: 'APCS Assignments', keywords: ['class', 'features', 'enhanced', 'methods'], path: '/ap-cs' },
  { id: 'apcs-9', title: 'String Methods', category: 'APCS Assignments', keywords: ['string', 'methods', 'text', 'manipulation'], path: '/ap-cs' },
  { id: 'apcs-10', title: '2-Dimensional Arrays', category: 'APCS Assignments', keywords: ['2d', 'arrays', 'matrices', 'grid', 'tic tac toe'], path: '/ap-cs' },
  { id: 'apcs-11', title: 'List Management', category: 'APCS Assignments', keywords: ['list', 'management', 'arraylist', 'collections'], path: '/ap-cs' },
  { id: 'apcs-12', title: 'Polymorphism', category: 'APCS Assignments', keywords: ['polymorphism', 'inheritance', 'override', 'abstract'], path: '/ap-cs' },
  { id: 'apcs-13', title: 'Why Software is So Bad', category: 'APCS Assignments', keywords: ['software', 'quality', 'bugs', 'essay'], path: '/ap-cs' },
  { id: 'apcs-14', title: 'Stacks', category: 'APCS Assignments', keywords: ['stacks', 'data structures', 'lifo'], path: '/ap-cs' },
  { id: 'apcs-15', title: 'Recursion', category: 'APCS Assignments', keywords: ['recursion', 'recursive', 'functions', 'base case'], path: '/ap-cs' },
  { id: 'apcs-16', title: 'Intel Pentium Bug', category: 'APCS Assignments', keywords: ['intel', 'pentium', 'bug', 'hardware', 'error'], path: '/ap-cs' },
  { id: 'apcs-17', title: 'Searching and Sorting', category: 'APCS Assignments', keywords: ['search', 'sort', 'algorithms', 'binary', 'merge'], path: '/ap-cs' },
  { id: 'apcs-18', title: 'Hangman', category: 'APCS Assignments', keywords: ['hangman', 'game', 'strings', 'user input'], path: '/ap-cs' },
  { id: 'apcs-strategy', title: 'Turn Based Strategy Game', category: 'APCS Assignments', keywords: ['strategy', 'game', 'turn based', 'final project'], path: '/ap-cs' },

  // Resources and References
  { id: 'w3schools', title: 'W3Schools', category: 'References', keywords: ['w3schools', 'tutorial', 'reference', 'web'], path: '/references' },
  { id: 'sololearn', title: 'SoloLearn', category: 'References', keywords: ['sololearn', 'interactive', 'learning'], path: '/references' },
  { id: 'programiz', title: 'Programiz', category: 'References', keywords: ['programiz', 'tutorials', 'examples'], path: '/references' },
  { id: 'codecademy', title: 'Code Academy', category: 'References', keywords: ['codecademy', 'interactive', 'courses'], path: '/references' },
  { id: 'hackerrank', title: 'HackerRank', category: 'Practice', keywords: ['hackerrank', 'practice', 'coding', 'challenges'], path: '/references' },
  { id: 'codingbat', title: 'CodingBat', category: 'Practice', keywords: ['codingbat', 'practice', 'problems', 'java'], path: '/references' },
  { id: 'replit', title: 'Repl.it', category: 'IDEs', keywords: ['replit', 'ide', 'online', 'compiler'], path: '/references' },
];

export const semanticSearch = (query: string, limit: number = 10): SearchItem[] => {
  if (!query.trim()) return [];
  
  const queryWords = query.toLowerCase().split(' ').filter(word => word.length > 0);
  
  const scoredResults = searchData.map(item => {
    let score = 0;
    const searchableText = [
      item.title,
      item.category,
      ...item.keywords,
      item.description || ''
    ].join(' ').toLowerCase();
    
    queryWords.forEach(word => {
      // Exact title match gets highest score
      if (item.title.toLowerCase().includes(word)) {
        score += 10;
      }
      // Category match
      if (item.category.toLowerCase().includes(word)) {
        score += 8;
      }
      // Keyword match
      if (item.keywords.some(keyword => keyword.includes(word))) {
        score += 6;
      }
      // General text match
      if (searchableText.includes(word)) {
        score += 3;
      }
      // Partial match
      if (searchableText.includes(word.substring(0, Math.max(3, word.length - 1)))) {
        score += 1;
      }
    });
    
    return { ...item, score };
  });
  
  return scoredResults
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};
