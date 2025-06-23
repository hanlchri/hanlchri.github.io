
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
    <div className={`collapsible-section ${isNested ? 'ml-0' : 'mb-2'}`}>
      <div 
        className={`collapsible-header flex justify-between items-center cursor-pointer transition-colors
          ${isNested 
            ? 'py-1 px-0 hover:text-tech-cyan/80 rounded-sm' 
            : 'p-2 bg-secondary hover:bg-secondary/80 rounded-t-lg'
          }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className={`font-bold break-words pr-2 ${
          isNested 
            ? 'text-sm text-foreground font-medium' 
            : 'text-lg sm:text-xl'
        }`}>
          {title}
        </h3>
        {isOpen ? (
          <ChevronUp className={`flex-shrink-0 transition-transform duration-300 ${
            isNested 
              ? 'h-3 w-3 text-foreground/70' 
              : 'h-5 w-5 text-tech-cyan'
          }`} />
        ) : (
          <ChevronDown className={`flex-shrink-0 transition-transform duration-300 ${
            isNested 
              ? 'h-3 w-3 text-foreground/70' 
              : 'h-5 w-5 text-tech-purple'
          }`} />
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
              ? 'ml-4 pt-1 pb-1' 
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
