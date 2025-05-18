
import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import NetworkBackground from './NetworkBackground';
import TerminalBackground from './TerminalBackground';
import RetroBackground from './RetroBackground';
import InteractiveBackground from './InteractiveBackground';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;
  
  // Determine which background to use based on the current path
  const renderBackground = () => {
    switch (path) {
      case '/':
        return <TerminalBackground />;
      case '/about':
        return <RetroBackground />;
      case '/java':
        return <InteractiveBackground colorScheme="orange" />;
      case '/ap-cs':
        return <InteractiveBackground colorScheme="green" />;
      case '/references':
        return <InteractiveBackground colorScheme="cyan" />;
      case '/contact':
        return <InteractiveBackground colorScheme="purple" />;
      case '/search':
        return <InteractiveBackground colorScheme="mixed" />;
      default:
        return <NetworkBackground />;
    }
  };
  
  return (
    <div className="min-h-screen">
      {renderBackground()}
      <NavBar />
      <main className="pt-20 pb-12 container mx-auto px-4 transition-all duration-300">
        {children}
      </main>
    </div>
  );
};

export default Layout;
