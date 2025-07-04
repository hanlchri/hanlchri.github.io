
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const getLogoColor = () => {
    switch (location.pathname) {
      case '/java':
        return 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600';
      case '/ap-cs':
        return 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600';
      case '/gallery':
        return 'text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600';
      case '/references':
        return 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500';
      case '/contact':
        return 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600';
      case '/search':
        return 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600';
      case '/about':
        return 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400';
      default:
        return 'text-tech-neon';
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className={`text-xl sm:text-2xl font-bold font-mono ${getLogoColor()}`}
              onClick={closeMenu}
            >
              Hanley's Hood
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/java" 
              className={`nav-link ${location.pathname === '/java' ? 'active' : ''}`}
            >
              Java
            </Link>
            <Link 
              to="/ap-cs" 
              className={`nav-link text-sm lg:text-lg ${location.pathname === '/ap-cs' ? 'active' : ''}`}
            >
              <span className="hidden lg:inline">AP Computer Science</span>
              <span className="lg:hidden">AP CS</span>
            </Link>
            <Link 
              to="/gallery" 
              className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}
            >
              Gallery
            </Link>
            <Link 
              to="/references" 
              className={`nav-link ${location.pathname === '/references' ? 'active' : ''}`}
            >
              References
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
            >
              Contact
            </Link>
            <Link 
              to="/search" 
              className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`}
            >
              Search
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-foreground hover:text-tech-purple transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md border-t border-border/50">
              <Link 
                to="/" 
                className={`block px-3 py-2 text-base font-medium hover:text-tech-purple transition-colors ${location.pathname === '/' ? 'text-tech-purple' : 'text-foreground/80'}`}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link 
                to="/java" 
                className={`block px-3 py-2 text-base font-medium hover:text-tech-purple transition-colors ${location.pathname === '/java' ? 'text-tech-purple' : 'text-foreground/80'}`}
                onClick={closeMenu}
              >
                Java
              </Link>
              <Link 
                to="/ap-cs" 
                className={`block px-3 py-2 text-base font-medium hover:text-tech-purple transition-colors ${location.pathname === '/ap-cs' ? 'text-tech-purple' : 'text-foreground/80'}`}
                onClick={closeMenu}
              >
                AP Computer Science
              </Link>
              <Link 
                to="/gallery" 
                className={`block px-3 py-2 text-base font-medium hover:text-tech-purple transition-colors ${location.pathname === '/gallery' ? 'text-tech-purple' : 'text-foreground/80'}`}
                onClick={closeMenu}
              >
                Gallery
              </Link>
              <Link 
                to="/references" 
                className={`block px-3 py-2 text-base font-medium hover:text-tech-purple transition-colors ${location.pathname === '/references' ? 'text-tech-purple' : 'text-foreground/80'}`}
                onClick={closeMenu}
              >
                References
              </Link>
              <Link 
                to="/contact" 
                className={`block px-3 py-2 text-base font-medium hover:text-tech-purple transition-colors ${location.pathname === '/contact' ? 'text-tech-purple' : 'text-foreground/80'}`}
                onClick={closeMenu}
              >
                Contact
              </Link>
              <Link 
                to="/search" 
                className={`block px-3 py-2 text-base font-medium hover:text-tech-purple transition-colors ${location.pathname === '/search' ? 'text-tech-purple' : 'text-foreground/80'}`}
                onClick={closeMenu}
              >
                Search
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
