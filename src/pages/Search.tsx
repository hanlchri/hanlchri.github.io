import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, ExternalLink } from 'lucide-react';
import Layout from '@/components/Layout';
import { searchAssignments, SearchItem } from '@/utils/searchData';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.trim()) {
        setIsSearching(true);
        const searchResults = searchAssignments(query);
        setResults(searchResults);
        setIsSearching(false);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'assignment': return 'text-blue-400';
      case 'lesson': return 'text-green-400';
      case 'resource': return 'text-yellow-400';
      case 'bonus': return 'text-purple-400';
      case 'homework': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'assignment': return 'bg-blue-500/20 text-blue-300';
      case 'lesson': return 'bg-green-500/20 text-green-300';
      case 'resource': return 'bg-yellow-500/20 text-yellow-300';
      case 'bonus': return 'bg-purple-500/20 text-purple-300';
      case 'homework': return 'bg-orange-500/20 text-orange-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const handleResultClick = (item: SearchItem) => {
    // If it has a file path, open the PDF
    if (item.filePath) {
      window.open(item.filePath, '_blank');
    } else {
      // Otherwise navigate to the page
      const pageLink = item.page === 'java' ? '/java' : '/ap-cs';
      window.location.href = pageLink;
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10 px-4">
        <div className="content-section">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center tech-text">
            Advanced Search
          </h1>
          
          <div className="relative mb-8">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Search assignments, lessons, and resources..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-tech-cyan focus:border-transparent text-foreground placeholder-muted-foreground"
              />
            </div>
          </div>

          {isSearching && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tech-cyan mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Searching...</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-tech-cyan mb-4">
                Search Results ({results.length})
              </h2>
              
              {results.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleResultClick(item)}
                  className="bg-card border border-border rounded-lg p-4 hover:border-tech-cyan/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-tech-cyan transition-colors">
                          {item.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getCategoryBadge(item.category)}`}>
                          {item.category}
                        </span>
                        <span className="px-2 py-1 text-xs rounded-full bg-secondary text-muted-foreground">
                          {item.page.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground mb-3">
                        {item.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1">
                        {item.keywords.slice(0, 5).map((keyword, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
                          >
                            {keyword}
                          </span>
                        ))}
                        {item.keywords.length > 5 && (
                          <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded">
                            +{item.keywords.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="ml-4 p-2 bg-tech-cyan/10 group-hover:bg-tech-cyan/20 rounded-lg transition-colors">
                      <ExternalLink className="h-4 w-4 text-tech-cyan group-hover:text-tech-cyan/80" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {query.trim() && results.length === 0 && !isSearching && (
            <div className="text-center py-12">
              <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try searching for assignments, lessons, or specific topics like "recursion", "loops", or "oop"
              </p>
            </div>
          )}

          {!query.trim() && (
            <div className="text-center py-12">
              <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Search for Assignments & Resources
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Find any assignment, lesson, or resource from the Java and AP Computer Science courses.
                Try searching for topics like "OOP", "arrays", "GUI", or specific assignment names.
              </p>
            </div>
          )}

          {/* Watermark */}
          <div className="mt-12 text-center">
            <p className="text-xs text-muted-foreground/50">Created by Hassaan Vani, Class of 2027</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
