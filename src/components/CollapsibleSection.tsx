
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
        className="collapsible-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-bold">{title}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-tech-cyan" />
        ) : (
          <ChevronDown className="h-5 w-5 text-tech-purple" />
        )}
      </div>
      {isOpen && (
        <div className="p-4 bg-black/30">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;
