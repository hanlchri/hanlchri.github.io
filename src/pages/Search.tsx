
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';

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
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
  // Debounce the search term to avoid excessive filtering
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    
    return () => clearTimeout(timerId);
  }, [searchTerm]);
  
  // Filter results when debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm.trim() === '') {
      setResults([]);
      return;
    }
    
    const filteredResults = mockResources.filter(resource => 
      resource.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
      resource.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    
    setResults(filteredResults);
    setHasSearched(true);
  }, [debouncedSearchTerm]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // We're already searching as the user types, but this will trigger a search on submit
    setDebouncedSearchTerm(searchTerm);
    setHasSearched(true);
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10">
        <div className="content-section">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center tech-text">Search</h1>
          
          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for resources, assignments, lessons..."
                  className="bg-secondary/50 border-tech-purple/30 focus:border-tech-purple pl-10"
                />
                <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
              <Button type="submit" className="bg-tech-purple hover:bg-tech-purple/80">
                Search
              </Button>
            </form>
          </div>
          
          {searchTerm.length > 0 && (
            <div className="search-results">
              <h2 className="text-2xl font-bold mb-4">
                {results.length > 0 
                  ? `Found ${results.length} results for "${searchTerm}"` 
                  : `No results found for "${searchTerm}"`}
              </h2>
              
              {results.length > 0 && (
                <div className="space-y-4">
                  {results.map((result, index) => (
                    <div 
                      key={result.id} 
                      className="p-4 bg-card rounded-lg hover:border-tech-purple/50 border border-border/50 transition-all" 
                      style={{ 
                        animationDelay: `${index * 50}ms`,
                        animationFillMode: 'both' 
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-tech-cyan">{result.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Category: {result.category}
                          </p>
                        </div>
                        <Button asChild variant="outline" size="sm">
                          <a href={result.path}>View</a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {!hasSearched && !searchTerm && (
            <div className="text-center py-10">
              <p className="text-lg text-muted-foreground">
                Enter a search term to find resources, assignments, lessons, and more.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
