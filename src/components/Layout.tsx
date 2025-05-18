
import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import NetworkBackground from './NetworkBackground';
import TerminalBackground from './backgrounds/TerminalBackground';
import RetroGridBackground from './backgrounds/RetroGridBackground';
import InteractiveBackground from './backgrounds/InteractiveBackground';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  const renderBackground = () => {
    switch (path) {
      case '/':
        return <TerminalBackground />;
      case '/about':
        return <RetroGridBackground />;
      case '/java':
        return <InteractiveBackground variant="java" />;
      case '/ap-cs':
        return <InteractiveBackground variant="apcs" />;
      case '/references':
        return <InteractiveBackground variant="references" />;
      case '/contact':
        return <InteractiveBackground variant="contact" />;
      case '/search':
        return <InteractiveBackground variant="search" />;
      default:
        return <NetworkBackground />;
    }
  };
  
  // Determine the main container class based on the page
  const getContainerClass = () => {
    switch (path) {
      case '/':
        return 'terminal-bg min-h-screen';
      case '/about':
        return 'retro-bg min-h-screen';
      default:
        return 'network-bg min-h-screen';
    }
  };

  return (
    <div className={getContainerClass()}>
      {renderBackground()}
      <NavBar />
      <main className="pt-20 pb-12 container mx-auto px-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
