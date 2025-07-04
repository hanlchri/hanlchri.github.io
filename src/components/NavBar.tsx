import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { searchAssignments } from '@/utils/searchData';

const NavBar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Track scrolling for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    // Use the actual search function from searchData
    const results = searchAssignments(term).slice(0, 5); // Limit to top 5 results
    setSearchResults(results);
  };

  // Handle result click
  const handleResultClick = (item: any) => {
    // If it has a file path, open the PDF
    if (item.filePath) {
      window.open(item.filePath, '_blank');
    } else {
      // Otherwise navigate to the page
      const pageLink = item.page === 'java' ? '/java' : '/ap-cs';
      window.location.href = pageLink;
    }
    setIsSearchOpen(false);
  };

  // Get logo class based on current route
  const getLogoClass = () => {
    if (location.pathname === '/') {
      return 'terminal-title';
    } else if (location.pathname === '/java') {
      return 'java-text';
    } else if (location.pathname === '/ap-cs') {
      return 'tech-text';
    } else if (location.pathname === '/gallery') {
      return 'gallery-text';
    } else if (location.pathname === '/references') {
      return 'references-text';
    } else if (location.pathname === '/contact') {
      return 'text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-600';
    } else if (location.pathname === '/search') {
      return 'search-text';
    } else if (location.pathname === '/about') {
      return 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600';
    }
    return 'tech-text';
  };

  // Get background style based on current route
  const getNavBackground = () => {
    if (scrolled || isMenuOpen) {
      return 'bg-black/80 backdrop-blur-md';
    }
    
    if (location.pathname === '/') {
      return 'bg-transparent';
    } else if (location.pathname === '/about') {
      return 'bg-transparent';
    } else {
      return 'bg-transparent';
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${getNavBackground()}`}
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className={`text-2xl font-bold transition-all duration-300 ${getLogoClass()}`}
        >
          Hanley's Hood
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          <Link to="/java" className={`nav-link ${isActive('/java')}`}>Java</Link>
          <Link to="/ap-cs" className={`nav-link text-sm xl:text-base ${isActive('/ap-cs')}`}>
            <span className="hidden xl:inline">AP Computer Science</span>
            <span className="xl:hidden">AP CS</span>
          </Link>
          <Link to="/gallery" className={`nav-link ${isActive('/gallery')}`}>Gallery</Link>
          <Link to="/references" className={`nav-link ${isActive('/references')}`}>References</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>Contact</Link>
          <Link to="/about" className={`nav-link ${isActive('/about')}`}>About</Link>
          
          {/* Search Popover */}
          <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 space-y-4">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    autoFocus
                  />
                </div>
                
                {searchResults.length > 0 && (
                  <div className="search-results max-h-60 overflow-auto space-y-2">
                    {searchResults.map((result) => (
                      <div 
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className="block p-2 hover:bg-secondary rounded-md transition-colors cursor-pointer"
                      >
                        <div className="font-medium">{result.title}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="px-2 py-1 text-xs rounded-full bg-muted">
                            {result.category}
                          </span>
                          <span className="px-2 py-1 text-xs rounded-full bg-secondary">
                            {result.page.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {searchTerm && searchResults.length === 0 && (
                  <div className="text-center py-2 text-muted-foreground">
                    No results found
                  </div>
                )}
                
                <div className="border-t pt-2">
                  <Link 
                    to="/search" 
                    className="text-sm text-center block w-full text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    Advanced Search
                  </Link>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Medium screens navigation */}
        <div className="hidden md:flex lg:hidden items-center gap-1 text-sm">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          <Link to="/java" className={`nav-link ${isActive('/java')}`}>Java</Link>
          <Link to="/ap-cs" className={`nav-link ${isActive('/ap-cs')}`}>AP CS</Link>
          <Link to="/gallery" className={`nav-link ${isActive('/gallery')}`}>Gallery</Link>
          <Link to="/references" className={`nav-link ${isActive('/references')}`}>Refs</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>Contact</Link>
          <Link to="/about" className={`nav-link ${isActive('/about')}`}>About</Link>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-0" align="end">
              <div className="p-4 space-y-4">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    autoFocus
                  />
                </div>
                
                {searchResults.length > 0 && (
                  <div className="search-results max-h-60 overflow-auto space-y-2">
                    {searchResults.map((result) => (
                      <div 
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className="block p-2 hover:bg-secondary rounded-md transition-colors cursor-pointer"
                      >
                        <div className="font-medium">{result.title}</div>
                        <div className="text-sm text-muted-foreground">{result.category}</div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="border-t pt-2">
                  <Link 
                    to="/search" 
                    className="text-sm text-center block w-full text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Advanced Search
                  </Link>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-0" align="end">
              <div className="p-4 space-y-4">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    autoFocus
                  />
                </div>
                
                {searchResults.length > 0 && (
                  <div className="search-results max-h-60 overflow-auto space-y-2">
                    {searchResults.map((result) => (
                      <div 
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className="block p-2 hover:bg-secondary rounded-md transition-colors cursor-pointer"
                      >
                        <div className="font-medium">{result.title}</div>
                        <div className="text-sm text-muted-foreground">{result.category}</div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="border-t pt-2">
                  <Link 
                    to="/search" 
                    className="text-sm text-center block w-full text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Advanced Search
                  </Link>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-tech-purple" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md dropdown-content">
          <div className="container mx-auto px-4 py-4 flex flex-col">
            <Link to="/" className={`nav-link py-4 ${isActive('/')}`}>Home</Link>
            <Link to="/java" className={`nav-link py-4 ${isActive('/java')}`}>Java</Link>
            <Link to="/ap-cs" className={`nav-link py-4 ${isActive('/ap-cs')}`}>AP Computer Science</Link>
            <Link to="/gallery" className={`nav-link py-4 ${isActive('/gallery')}`}>Gallery</Link>
            <Link to="/references" className={`nav-link py-4 ${isActive('/references')}`}>References</Link>
            <Link to="/contact" className={`nav-link py-4 ${isActive('/contact')}`}>Contact</Link>
            <Link to="/about" className={`nav-link py-4 ${isActive('/about')}`}>About</Link>
            <Link to="/search" className={`nav-link py-4 ${isActive('/search')}`}>Search</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
