
import React, { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClickAway } from '@/hooks/use-click-away';

// Mock search results data
const mockResources = [
  { id: 1, title: "Computer Components Assignment", category: "Assignments", path: "/ap-cs" },
  { id: 2, title: "Java Arrays Tutorial", category: "Java", path: "/java" },
  { id: 3, title: "Printing from Netbeans", category: "Resources", path: "/ap-cs" },
  { id: 4, title: "Unit 1 Review", category: "Lessons", path: "/ap-cs" },
  { id: 5, title: "W3Schools Reference", category: "References", path: "/references" },
  { id: 6, title: "String Methods", category: "Assignments", path: "/ap-cs" },
  { id: 7, title: "Inheritance Hierarchy", category: "Homework", path: "/ap-cs" },
  { id: 8, title: "OOP Concepts", category: "Lessons", path: "/ap-cs" },
  { id: 9, title: "HackerRank Practice", category: "Practice", path: "/references" },
  { id: 10, title: "Repl.it IDE Guide", category: "IDEs", path: "/references" },
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<typeof mockResources>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof mockResources>([]);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  
  useClickAway(suggestionsRef, () => {
    setShowSuggestions(false);
  });
  
  useEffect(() => {
    if (searchTerm.trim().length >= 2) {
      // Filter suggestions based on search term
      const filteredSuggestions = mockResources.filter(resource => 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        resource.category.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions
      
      setSuggestions(filteredSuggestions);
      setShowSuggestions(filteredSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchTerm.trim() === '') {
      setResults([]);
      setHasSearched(false);
      return;
    }
    
    // Filter the mock resources based on search term
    const filteredResults = mockResources.filter(resource => 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      resource.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setResults(filteredResults);
    setHasSearched(true);
    setShowSuggestions(false);
  };
  
  const selectSuggestion = (suggestion: typeof mockResources[0]) => {
    setSearchTerm(suggestion.title);
    setShowSuggestions(false);
    
    // Auto-submit search
    const filteredResults = mockResources.filter(resource => 
      resource.title.toLowerCase().includes(suggestion.title.toLowerCase()) || 
      resource.category.toLowerCase().includes(suggestion.title.toLowerCase())
    );
    
    setResults(filteredResults);
    setHasSearched(true);
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10">
        <motion.div 
          className="content-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-8 text-center tech-text font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Search
          </motion.h1>
          
          <div className="mb-8 relative" ref={suggestionsRef}>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for resources, assignments, lessons..."
                  className="bg-secondary/50 border-tech-purple/30 focus:border-tech-purple pl-10 font-sans"
                />
                <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
              <Button type="submit" className="bg-tech-purple hover:bg-tech-purple/80 font-mono">
                Search
              </Button>
            </form>
            
            {/* Suggestions dropdown */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div 
                  className="absolute z-10 mt-1 w-full bg-popover border border-border rounded-md shadow-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ul className="py-2">
                    {suggestions.map((suggestion) => (
                      <li 
                        key={suggestion.id} 
                        className="px-4 py-2 hover:bg-accent cursor-pointer transition-colors"
                        onClick={() => selectSuggestion(suggestion)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{suggestion.title}</span>
                          <span className="text-xs text-muted-foreground">{suggestion.category}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {hasSearched && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4 font-mono">
                {results.length > 0 
                  ? `Found ${results.length} results for "${searchTerm}"` 
                  : `No results found for "${searchTerm}"`}
              </h2>
              
              {results.length > 0 && (
                <div className="space-y-4">
                  {results.map((result, index) => (
                    <motion.div 
                      key={result.id} 
                      className="p-4 bg-card rounded-lg border border-border/30 backdrop-blur-sm hover:border-tech-purple/30 transition-all"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-tech-cyan font-mono">{result.title}</h3>
                          <p className="text-sm text-muted-foreground font-sans">
                            Category: {result.category}
                          </p>
                        </div>
                        <Button asChild variant="outline" size="sm">
                          <a href={result.path}>View</a>
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
          
          {!hasSearched && (
            <div className="text-center py-10">
              <p className="text-lg text-muted-foreground font-sans">
                Enter a search term to find resources, assignments, lessons, and more.
              </p>
              <p className="text-sm text-muted-foreground mt-2 font-sans">
                Try searching for "Java", "Assignment", or "OOP"
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default Search;
