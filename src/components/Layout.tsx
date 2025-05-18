
import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import NetworkBackground from './NetworkBackground';
import TerminalBackground from './TerminalBackground';
import RetroGridBackground from './RetroGridBackground';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Determine background type based on current route
  const renderBackground = () => {
    if (location.pathname === '/') {
      return (
        <div className="terminal-bg min-h-screen">
          <TerminalBackground />
        </div>
      );
    } else if (location.pathname === '/about') {
      return (
        <div className="retro-grid-bg min-h-screen">
          <RetroGridBackground />
        </div>
      );
    } else {
      return (
        <div className="network-bg min-h-screen">
          <NetworkBackground />
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen">
      {renderBackground()}
      <NavBar />
      <main className="pt-20 pb-12 container mx-auto px-4">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
