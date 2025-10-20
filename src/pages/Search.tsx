import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, ExternalLink, Filter, X } from 'lucide-react';
import Layout from '@/components/Layout';
import { searchAssignments, SearchItem, getAllCategories } from '@/utils/searchData';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [pageFilter, setPageFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.trim()) {
        const searchResults = searchAssignments(query, {
          pageFilter: pageFilter,
          categoryFilter: categoryFilter,
          maxResults: 20
        });
        setResults(searchResults);
        setSelectedIndex(0); // Reset selection on new results
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query, pageFilter, categoryFilter]);

  // Scroll selected result into view
  useEffect(() => {
    if (resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

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
      case 'Escape':
        setQuery('');
        searchInputRef.current?.blur();
        break;
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const words = query.toLowerCase().trim().split(/\s+/);
    let highlighted = text;
    
    words.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi');
      highlighted = highlighted.replace(regex, '<mark class="bg-search-accent/30 px-1 rounded">$1</mark>');
    });
    
    return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
  };

  const clearFilters = () => {
    setPageFilter('all');
    setCategoryFilter('all');
  };

  const categories = getAllCategories();
  const activeFilters = [pageFilter !== 'all' && 'Page', categoryFilter !== 'all' && 'Category'].filter(Boolean).length;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10 px-4">
        <div className="content-section">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center search-text">
            Advanced Search
          </h1>
          
          <div className="relative mb-6">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search assignments, lessons, and resources..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-search-accent focus:border-transparent text-foreground placeholder-muted-foreground"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg hover:border-search-accent/50 transition-colors text-sm"
            >
              <Filter className="h-4 w-4" />
              Filters {activeFilters > 0 && <span className="bg-search-accent/20 text-search-accent px-2 py-0.5 rounded-full text-xs">({activeFilters})</span>}
            </button>
            
            {showFilters && (
              <div className="mt-3 p-4 bg-card border border-border rounded-lg space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Course</label>
                  <div className="flex gap-2 flex-wrap">
                    {['all', 'java', 'apcs'].map(page => (
                      <button
                        key={page}
                        onClick={() => setPageFilter(page)}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                          pageFilter === page
                            ? 'bg-search-accent text-white'
                            : 'bg-secondary hover:bg-secondary/80'
                        }`}
                      >
                        {page === 'all' ? 'All Courses' : page === 'apcs' ? 'AP CS' : 'Java'}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setCategoryFilter('all')}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                        categoryFilter === 'all'
                          ? 'bg-search-accent text-white'
                          : 'bg-secondary hover:bg-secondary/80'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setCategoryFilter(cat)}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors capitalize ${
                          categoryFilter === cat
                            ? 'bg-search-accent text-white'
                            : 'bg-secondary hover:bg-secondary/80'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                
                {activeFilters > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-sm text-search-accent hover:text-search-accent/80"
                  >
                    <X className="h-4 w-4" />
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>

          {results.length > 0 && (
            <div className="space-y-4" ref={resultsRef}>
              <h2 className="text-xl font-semibold text-search-accent mb-4">
                Search Results ({results.length})
              </h2>
              
              {results.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => handleResultClick(item)}
                  className={`bg-card border rounded-lg p-4 hover:border-search-accent/50 transition-all cursor-pointer group ${
                    selectedIndex === index 
                      ? 'border-search-accent ring-2 ring-search-accent/20 shadow-lg' 
                      : 'border-border'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-search-accent transition-colors">
                          {highlightText(item.title, query)}
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getCategoryBadge(item.category)}`}>
                          {item.category}
                        </span>
                        <span className="px-2 py-1 text-xs rounded-full bg-secondary text-muted-foreground">
                          {item.page.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground mb-3">
                        {highlightText(item.description, query)}
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
                    
                    <div className="ml-4 p-2 bg-search-accent/10 group-hover:bg-search-accent/20 rounded-lg transition-colors">
                      <ExternalLink className="h-4 w-4 text-search-accent group-hover:text-search-accent/80" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {query.trim() && results.length === 0 && (
            <div className="text-center py-12">
              <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">
                Try searching for assignments, lessons, or specific topics like "recursion", "loops", or "oop"
              </p>
              {(pageFilter !== 'all' || categoryFilter !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-search-accent hover:text-search-accent/80 underline"
                >
                  Clear filters to see more results
                </button>
              )}
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
