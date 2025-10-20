# Search Optimization Recommendations

## High Priority Fixes

### 1. Add Memoization/Caching
```typescript
// Cache preprocessed search data
const searchCache = new Map<string, SearchItem[]>();
const preprocessedItems = searchItems.map(item => ({
  ...item,
  titleLower: item.title.toLowerCase(),
  descriptionLower: item.description.toLowerCase(),
  keywordsLower: item.keywords.map(k => k.toLowerCase())
}));
```

### 2. Optimize Semantic Matching
```typescript
// Pre-compute keyword set for O(1) lookup
function getKeywordScore(searchTerm: string, keywordsLower: string[]): number {
  const term = searchTerm.toLowerCase();
  const keywordSet = new Set(keywordsLower);
  let score = 0;
  
  // Direct match - O(1) instead of O(n)
  if (keywordSet.has(term)) {
    score += 10;
  }
  
  // Partial matches - only check if needed
  for (const keyword of keywordsLower) {
    if (keyword.includes(term)) {
      score += 5;
    }
  }
  
  // Semantic - reduced complexity
  const semanticWords = semanticMappings[term];
  if (semanticWords) {
    for (const word of semanticWords) {
      if (keywordSet.has(word)) {
        score += 3;
      }
    }
  }
  
  return score;
}
```

### 3. Add Multi-word Search Support
```typescript
export function searchAssignments(query: string): SearchItem[] {
  if (!query.trim()) return [];
  
  // Split query into words for better matching
  const searchTerms = query.toLowerCase().trim().split(/\s+/);
  const results: (SearchItem & { score: number })[] = [];
  
  for (const item of preprocessedItems) {
    let totalScore = 0;
    
    // Score each search term
    for (const term of searchTerms) {
      let score = 0;
      
      if (item.titleLower.includes(term)) {
        score += item.titleLower === term ? 100 : 50;
      }
      
      if (item.descriptionLower.includes(term)) {
        score += 20;
      }
      
      score += getKeywordScore(term, item.keywordsLower);
      totalScore += score;
    }
    
    if (totalScore > 0) {
      results.push({ ...item, score: totalScore });
    }
  }
  
  return results.sort((a, b) => b.score - a.score);
}
```

### 4. Add Result Filtering to UI
```tsx
const [selectedPage, setSelectedPage] = useState<string>('all');
const [selectedCategory, setSelectedCategory] = useState<string>('all');

const filteredResults = results.filter(item => {
  if (selectedPage !== 'all' && item.page !== selectedPage) return false;
  if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
  return true;
});
```

### 5. Add Keyboard Navigation
```tsx
const [selectedIndex, setSelectedIndex] = useState(0);

const handleKeyDown = (e: React.KeyboardEvent) => {
  switch(e.key) {
    case 'ArrowDown':
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
      break;
    case 'ArrowUp':
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
      break;
    case 'Enter':
      e.preventDefault();
      if (results[selectedIndex]) {
        handleResultClick(results[selectedIndex]);
      }
      break;
  }
};
```

### 6. Add Search Highlighting
```tsx
const highlightText = (text: string, query: string) => {
  if (!query.trim()) return text;
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, i) => 
    part.toLowerCase() === query.toLowerCase() ? 
      <mark key={i} className="bg-search-accent/30">{part}</mark> : part
  );
};
```

## Medium Priority Improvements

### 7. Add Fuzzy Matching
Use a library like `fuse.js` for typo tolerance:
```bash
npm install fuse.js
```

```typescript
import Fuse from 'fuse.js';

const fuse = new Fuse(searchItems, {
  keys: ['title', 'description', 'keywords'],
  threshold: 0.3,
  includeScore: true
});

export function searchAssignments(query: string): SearchItem[] {
  const results = fuse.search(query);
  return results.map(r => r.item).slice(0, 20);
}
```

### 8. Add Search Analytics
Track what users search for to improve the experience:
```typescript
const searchHistory = new Map<string, number>();

function trackSearch(query: string, resultCount: number) {
  searchHistory.set(query, resultCount);
  // Could save to localStorage for persistence
}
```

### 9. Add Pagination
```tsx
const [currentPage, setCurrentPage] = useState(1);
const ITEMS_PER_PAGE = 10;

const paginatedResults = filteredResults.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
);
```

## Low Priority Nice-to-Haves

- Search suggestions/autocomplete
- Recent searches
- "Did you mean..." for typos
- Export search results
- Share search results via URL params
- Voice search
