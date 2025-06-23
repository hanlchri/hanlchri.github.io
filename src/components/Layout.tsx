
import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from './NavBar';
import NetworkBackground from './NetworkBackground';
import TerminalBackground from './TerminalBackground';
import RetroGridBackground from './RetroGridBackground';
import JavaBackground from './JavaBackground';
import APCSBackground from './APCSBackground';
import ReferencesBackground from './ReferencesBackground';
import ContactBackground from './ContactBackground';
import SearchBackground from './SearchBackground';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Determine background type based on current route
  const renderBackground = () => {
    if (location.pathname === '/') {
      return (
        <div className="terminal-bg fixed inset-0">
          <TerminalBackground />
        </div>
      );
    } else if (location.pathname === '/about') {
      return (
        <div className="retro-grid-bg fixed inset-0">
          <RetroGridBackground />
        </div>
      );
    } else if (location.pathname === '/java') {
      return (
        <div className="network-bg fixed inset-0">
          <JavaBackground />
        </div>
      );
    } else if (location.pathname === '/ap-cs') {
      return (
        <div className="network-bg fixed inset-0">
          <APCSBackground />
        </div>
      );
    } else if (location.pathname === '/references') {
      return (
        <div className="network-bg fixed inset-0">
          <ReferencesBackground />
        </div>
      );
    } else if (location.pathname === '/contact') {
      return (
        <div className="network-bg fixed inset-0">
          <ContactBackground />
        </div>
      );
    } else if (location.pathname === '/search') {
      return (
        <div className="network-bg fixed inset-0">
          <SearchBackground />
        </div>
      );
    } else {
      return (
        <div className="network-bg fixed inset-0">
          <NetworkBackground />
        </div>
      );
    }
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: -20,
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  return (
    <div className="min-h-screen relative">
      {renderBackground()}
      <NavBar />
      <main className="relative pt-16 pb-12 container mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Layout;
