
import React from 'react';
import NavBar from './NavBar';
import NetworkBackground from './NetworkBackground';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="network-bg min-h-screen">
      <NetworkBackground />
      <NavBar />
      <main className="pt-20 pb-12 container mx-auto px-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
