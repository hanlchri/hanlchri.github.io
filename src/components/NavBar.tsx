import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';

const mockResources = [
  // APCS Assignments
  { id: 1, title: "1: Computer Components", category: "Assignments", path: "/ap-cs", section: "assignments" },
  { id: 2, title: "2: Operations Calculator", category: "Assignments", path: "/ap-cs", section: "assignments" },
  { id: 3, title: "3: Castle Stairs", category: "Assignments", path: "/ap-cs", section: "assignments" },
  { id: 4, title: "4: Matrix Computer Store", category: "Assignments", path: "/ap-cs", section: "assignments" },
  { id: 5, title: "5: Reusable Components", category: "Assignments", path: "/ap-cs", section: "assignments" },
  { id: 6, title: "9: String Methods", category: "Assignments", path: "/ap-cs", section: "assignments" },
  { id: 7, title: "18: Hangman", category: "Assignments", path: "/ap-cs", section: "assignments" },
  { id: 8, title: "Turn Based Strategy Game", category: "Assignments", path: "/ap-cs", section: "assignments" },

  // APCS Homework
  { id: 9, title: "Inheritance Hierarchy", category: "Homework", path: "/ap-cs", section: "homework" },
  { id: 10, title: "Array Copying", category: "Homework", path: "/ap-cs", section: "homework" },
  { id: 11, title: "Paint BullsEye and Scalable House", category: "Homework", path: "/ap-cs", section: "homework" },

  // APCS Lessons
  { id: 12, title: "Unit 1 Review", category: "Lessons", path: "/ap-cs", section: "lessons" },
  { id: 13, title: "Unit 4 Object Oriented", category: "Lessons", path: "/ap-cs", section: "lessons" },
  { id: 14, title: "Unit 6 Arrays & ArrayLists", category: "Lessons", path: "/ap-cs", section: "lessons" },

  // APCS Resources
  { id: 15, title: "Printing from Netbeans", category: "Resources", path: "/ap-cs", section: "resources" },
  { id: 16, title: "The Cookbook", category: "Resources", path: "/ap-cs", section: "resources" },
  { id: 17, title: "GUI Survival Guide", category: "Resources", path: "/ap-cs", section: "resources" },

  // APCS Bonus
  { id: 30, title: "Base Converter", category: "Bonus", path: "/ap-cs", section: "bonus" },
  { id: 31, title: "BlackJack", category: "Bonus", path: "/ap-cs", section: "bonus" },
  { id: 32, title: "Hotel System", category: "Bonus", path: "/ap-cs", section: "bonus" },

  // Java Assignments
  { id: 18, title: "1: Basic Console Applications", category: "Assignments", path: "/java", section: "assignments" },
  { id: 19, title: "2: Currency Converter", category: "Assignments", path: "/java", section: "assignments" },
  { id: 20, title: "2.5: Change Calculator", category: "Assignments", path: "/java", section: "assignments" },
  { id: 21, title: "3: Loops", category: "Assignments", path: "/java", section: "assignments" },
  { id: 22, title: "4: Arrays", category: "Assignments", path: "/java", section: "assignments" },
  { id: 23, title: "4.5: Object Oriented Basics", category: "Assignments", path: "/java", section: "assignments" },
  { id: 24, title: "6: Final Project", category: "Assignments", path: "/java", section: "assignments" },

  // Java Homework
  { id: 25, title: "Glossary Terms", category: "Homework", path: "/java", section: "homework" },
  { id: 26, title: "Java Loops HW", category: "Homework", path: "/java", section: "homework" },

  // Java Lessons
  { id: 27, title: "Flowcharting Lesson", category: "Lessons", path: "/java", section: "lessons" },
  { id: 28, title: "Math Operations", category: "Lessons", path: "/java", section: "lessons" },
  { id: 29, title: "Looping & Random", category: "Lessons", path: "/java", section: "lessons" },

  // Java Resources
  { id: 33, title: "Textbook Chapters 1 and 2", category: "Resources", path: "/java", section: "resources" },
  { id: 34, title: "The Cookbook (Java)", category: "Resources", path: "/java", section: "resources" },
  { id: 35, title: "Guide for Round Buttons", category: "Resources", path: "/java", section: "resources" },

  // Java Bonus
  { id: 36, title: "Coin Flip", category: "Bonus", path: "/java", section: "bonus" },
  { id: 37, title: "Fox Goose Grain", category: "Bonus", path: "/java", section: "bonus" },

  // Shared References
  { id: 38, title: "W3Schools Reference", category: "References", path: "/references", section: "references" },
];

const NavBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<typeof mockResources>([]);
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
    
    // Filter resources based on search term
    const results = mockResources.filter(resource => 
      resource.title.toLowerCase().includes(term.toLowerCase()) || 
      resource.category.toLowerCase().includes(term.toLowerCase())
    ).slice(0, 5); // Limit to top 5 results
    
    setSearchResults(results);
  };

  // Handle search result click with navigation and highlighting
  const handleSearchResultClick = (result: typeof mockResources[0]) => {
    setIsSearchOpen(false);
    setSearchTerm('');
    setSearchResults([]);
    
    // Navigate with search parameters for auto-opening and highlighting
    navigate(`${result.path}?highlight=${encodeURIComponent(result.title)}&section=${result.section}`);
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
          className={`text-2xl font-bold transition-all duration-300 ${
            location.pathname === '/' ? 'terminal-title' : 'tech-text'
          }`}
        >
          Hanley's Hood
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          <Link to="/java" className={`nav-link ${isActive('/java')}`}>Java</Link>
          <Link to="/ap-cs" className={`nav-link ${isActive('/ap-cs')}`}>AP Computer Science</Link>
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
                        onClick={() => handleSearchResultClick(result)}
                        className="block p-2 hover:bg-secondary rounded-md transition-colors cursor-pointer"
                      >
                        <div className="font-medium">{result.title}</div>
                        <div className="text-sm text-muted-foreground">{result.category}</div>
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
                        onClick={() => handleSearchResultClick(result)}
                        className="block p-2 hover:bg-secondary rounded-md transition-colors cursor-pointer"
                      >
                        <div className="font-medium">{result.title}</div>
                        <div className="text-sm text-muted-foreground">{result.category}</div>
                      </div>
                    ))}
                  </div>
                )}
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
