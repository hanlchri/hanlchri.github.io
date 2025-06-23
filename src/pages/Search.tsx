
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { semanticSearch, SearchItem } from '@/utils/searchData';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
  // Debounce the search term
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      if (searchTerm.length > 0) {
        setShowResults(true);
      }
    }, 300);
    
    return () => clearTimeout(timerId);
  }, [searchTerm]);
  
  // Perform semantic search when debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm.trim() === '') {
      setResults([]);
      return;
    }
    
    const searchResults = semanticSearch(debouncedSearchTerm, 15);
    setResults(searchResults);
  }, [debouncedSearchTerm]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setDebouncedSearchTerm(searchTerm);
    setShowResults(true);
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="content-section">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center tech-text">Search</h1>
          
          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex gap-2 relative">
              <div className="relative flex-1">
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for assignments, lessons, resources..."
                  className="bg-secondary/50 border-tech-purple/30 focus:border-tech-purple pl-10"
                />
                <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                
                {/* Display dropdown suggestions as user types */}
                <AnimatePresence>
                  {searchTerm.length > 1 && results.length > 0 && !showResults && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 right-0 top-full mt-1 p-2 bg-popover border border-border rounded-lg shadow-lg z-50"
                    >
                      <p className="text-sm text-muted-foreground mb-2">Suggestions:</p>
                      <div className="max-h-60 overflow-y-auto">
                        {results.slice(0, 5).map((result) => (
                          <a 
                            key={result.id}
                            href={result.path}
                            className="block py-2 px-3 hover:bg-secondary rounded-md text-sm"
                          >
                            <span className="font-medium">{result.title}</span>
                            <span className="text-xs text-muted-foreground ml-2">({result.category})</span>
                          </a>
                        ))}
                        {results.length > 5 && (
                          <p className="text-xs text-center text-muted-foreground mt-2">
                            {results.length - 5} more results...
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Button type="submit" className="bg-tech-purple hover:bg-tech-purple/80">
                Search
              </Button>
            </form>
          </div>
          
          <AnimatePresence>
            {showResults && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="search-results"
              >
                <h2 className="text-2xl font-bold mb-4">
                  {results.length > 0 
                    ? `Found ${results.length} results for "${searchTerm}"` 
                    : `No results found for "${searchTerm}"`}
                </h2>
                
                {results.length > 0 && (
                  <div className="space-y-4">
                    {results.map((result, index) => (
                      <motion.div 
                        key={result.id} 
                        className="p-4 bg-card rounded-lg hover:border-tech-purple/50 border border-border/50 transition-all" 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { delay: index * 0.05 }
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-tech-cyan">{result.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              Category: {result.category}
                            </p>
                            {result.keywords.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {result.keywords.slice(0, 4).map((keyword, i) => (
                                  <span key={i} className="text-xs bg-secondary px-2 py-1 rounded">
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                            )}
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
          </AnimatePresence>
          
          {!showResults && !searchTerm && (
            <div className="text-center py-10">
              <p className="text-lg text-muted-foreground">
                Enter a search term to find assignments, lessons, resources, and more.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Try searching for "loops", "arrays", "oop", "calculator", or any topic you're looking for.
              </p>
            </div>
          )}

          {/* Discrete watermark */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground/50">Created by Hassaan Vani, Class of 2027</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
