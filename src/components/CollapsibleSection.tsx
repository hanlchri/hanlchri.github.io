
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ 
  title, 
  children, 
  defaultOpen = false 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="collapsible-section mb-4">
      <div 
        className="collapsible-header flex justify-between items-center p-4 cursor-pointer bg-secondary hover:bg-secondary/80 transition-colors rounded-t-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-bold">{title}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-tech-cyan transition-transform duration-300" />
        ) : (
          <ChevronDown className="h-5 w-5 text-tech-purple transition-transform duration-300" />
        )}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-black/30 backdrop-blur-sm rounded-b-lg border-t border-border/50">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollapsibleSection;
