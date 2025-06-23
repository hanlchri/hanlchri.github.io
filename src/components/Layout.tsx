
import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from './NavBar';
import JavaBackground from './JavaBackground';
import APCSBackground from './APCSBackground';
import ReferencesBackground from './ReferencesBackground';
import SearchBackground from './SearchBackground';
import ContactBackground from './ContactBackground';
import NetworkBackground from './NetworkBackground';
import TerminalBackground from './TerminalBackground';
import RetroGridBackground from './RetroGridBackground';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const getBackgroundComponent = () => {
    switch (location.pathname) {
      case '/java':
        return <JavaBackground />;
      case '/ap-cs':
        return <APCSBackground />;
      case '/references':
        return <ReferencesBackground />;
      case '/search':
        return <SearchBackground />;
      case '/contact':
        return <ContactBackground />;
      case '/about':
        return <NetworkBackground />;
      default:
        return <RetroGridBackground />;
    }
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      y: -20,
      scale: 1.02
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {getBackgroundComponent()}
      <NavBar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="relative z-10 pt-16"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  );
};

export default Layout;
