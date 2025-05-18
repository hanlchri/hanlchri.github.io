
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="mb-4 border border-border/50 rounded-lg overflow-hidden transition-all duration-300"
    >
      <CollapsibleTrigger className="w-full">
        <div className="flex justify-between items-center p-4 bg-secondary/80 hover:bg-secondary/60 transition-colors">
          <h3 className="text-xl font-bold">{title}</h3>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-tech-cyan transition-transform duration-300" />
          ) : (
            <ChevronDown className="h-5 w-5 text-tech-purple transition-transform duration-300" />
          )}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="transition-all duration-300 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="p-4 bg-black/30 animate-fade-in">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleSection;
