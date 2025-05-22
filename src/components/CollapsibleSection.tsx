
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isNested?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ 
  title, 
  children, 
  defaultOpen = false,
  isNested = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`collapsible-section mb-2 ${isNested ? 'ml-0 sm:ml-2 border-l-2 border-tech-purple/30 pl-2' : ''}`}>
      <div 
        className={`collapsible-header flex justify-between items-center p-2 cursor-pointer transition-colors rounded-md 
          ${isNested 
            ? 'bg-black/20 hover:bg-black/30' 
            : 'bg-secondary hover:bg-secondary/80 rounded-t-lg'
          }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className={`font-bold break-words pr-2 ${isNested ? 'text-sm sm:text-base text-tech-cyan' : 'text-lg sm:text-xl'}`}>{title}</h3>
        {isOpen ? (
          <ChevronUp className={`flex-shrink-0 transition-transform duration-300 ${isNested ? 'h-4 w-4 text-tech-cyan/80' : 'h-5 w-5 text-tech-cyan'}`} />
        ) : (
          <ChevronDown className={`flex-shrink-0 transition-transform duration-300 ${isNested ? 'h-4 w-4 text-tech-purple/80' : 'h-5 w-5 text-tech-purple'}`} />
        )}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className={`${isNested 
              ? 'p-2 bg-black/10 backdrop-blur-sm rounded-b-md' 
              : 'p-2 sm:p-4 bg-black/30 backdrop-blur-sm rounded-b-lg border-t border-border/50'
            }`}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollapsibleSection;
