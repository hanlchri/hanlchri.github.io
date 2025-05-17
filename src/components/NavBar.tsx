
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavBar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scrolling for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || isMenuOpen ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tech-text">Hanley's Hood</Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          <Link to="/java" className={`nav-link ${isActive('/java')}`}>Java</Link>
          <Link to="/ap-cs" className={`nav-link ${isActive('/ap-cs')}`}>AP Computer Science</Link>
          <Link to="/references" className={`nav-link ${isActive('/references')}`}>References</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>Contact</Link>
          <Link to="/search" className={`nav-link ${isActive('/search')}`}>
            Search
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-tech-purple" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </nav>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col">
            <Link to="/" className={`nav-link py-4 ${isActive('/')}`}>Home</Link>
            <Link to="/java" className={`nav-link py-4 ${isActive('/java')}`}>Java</Link>
            <Link to="/ap-cs" className={`nav-link py-4 ${isActive('/ap-cs')}`}>AP Computer Science</Link>
            <Link to="/references" className={`nav-link py-4 ${isActive('/references')}`}>References</Link>
            <Link to="/contact" className={`nav-link py-4 ${isActive('/contact')}`}>Contact</Link>
            <Link to="/search" className={`nav-link py-4 ${isActive('/search')}`}>Search</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
