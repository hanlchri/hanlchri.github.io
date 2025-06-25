
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import CollapsibleSection from '@/components/CollapsibleSection';

const APCS = () => {
  const location = useLocation();
  const [highlightedItem, setHighlightedItem] = useState<string>('');
  const [openSections, setOpenSections] = useState<string[]>(['resources', 'bonus']);

  // Handle search navigation from navbar
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const highlight = searchParams.get('highlight');
    const section = searchParams.get('section');
    
    if (highlight && section) {
      setHighlightedItem(highlight);
      if (!openSections.includes(section)) {
        setOpenSections(prev => [...prev, section]);
      }
      
      // Auto-scroll to the highlighted item after a brief delay
      setTimeout(() => {
        const element = document.querySelector(`[data-item="${highlight}"]`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
      
      // Clear highlight after animation
      setTimeout(() => {
        setHighlightedItem('');
      }, 3000);
    }
  }, [location.search]);

  const renderItemWithHighlight = (title: string, href: string) => {
    const isHighlighted = highlightedItem === title;
    return (
      <li 
        data-item={title}
        className={`border-b border-border pb-2 transition-all duration-1000 ${
          isHighlighted ? 'bg-tech-cyan/20 rounded-md p-2 animate-pulse' : ''
        }`}
      >
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-lg hover:text-tech-purple transition-colors"
        >
          {title}
        </a>
      </li>
    );
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-10">
        <div className="content-section">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center tech-text">AP Computer Science</h1>
          
          <div className="space-y-6">
            <CollapsibleSection 
              title="Assignments" 
              defaultOpen={openSections.includes('assignments')}
            >
              <ul className="space-y-3">
                {renderItemWithHighlight("1: Computer Components", "/documents/APCS/Assignments/APCS_Assignment1_ComputerComponents.pdf")}
                {renderItemWithHighlight("2: Operations Calculator", "/documents/APCS/Assignments/APCS_Assignment2_Operations Calculator.pdf")}
                {renderItemWithHighlight("3: Castle Stairs", "/documents/APCS/Assignments/APCS_Assignment3_CastleStairs.pdf")}
                {renderItemWithHighlight("4: Matrix Computer Store", "/documents/APCS/Assignments/APCS_Assignment4_ComputerStore.pdf")}
                {renderItemWithHighlight("5: Reusable Components", "/documents/APCS/Assignments/APCS_Assignment5_DoubleIntVerifier.pdf")}
                {renderItemWithHighlight("9: String Methods", "/documents/APCS/Assignments/APCS_Assignment9_Strings.pdf")}
                {renderItemWithHighlight("18: Hangman", "/documents/APCS/Assignments/APCS_Assignment18_Hangman.pdf")}
                {renderItemWithHighlight("Turn Based Strategy Game", "/documents/APCS/Assignments/APCS_Assignment_TurnBasedStrategyGame.pdf")}
              </ul>
            </CollapsibleSection>

            <CollapsibleSection 
              title="Homework" 
              defaultOpen={openSections.includes('homework')}
            >
              <ul className="space-y-3">
                {renderItemWithHighlight("Inheritance Hierarchy", "/documents/APCS/Homework/APCS_Homework_InheritanceHierarchy.pdf")}
                {renderItemWithHighlight("Array Copying", "/documents/APCS/Homework/APCS_Homework_ArrayCopying.pdf")}
                {renderItemWithHighlight("Paint BullsEye and Scalable House", "/documents/APCS/Homework/APCS_Homework_PaintBullsEyeHouse.pdf")}
              </ul>
            </CollapsibleSection>

            <CollapsibleSection 
              title="Lessons" 
              defaultOpen={openSections.includes('lessons')}
            >
              <ul className="space-y-3">
                {renderItemWithHighlight("Unit 1 Review", "/documents/APCS/Lessons/APCS_Lesson_JavaReview_Blank.docx")}
                {renderItemWithHighlight("Unit 4 Object Oriented", "/documents/APCS/Lessons/APCS_Lesson_OOP_Blank.docx")}
                {renderItemWithHighlight("Unit 6 Arrays & ArrayLists", "/documents/APCS/Lessons/APCS_Lesson_Arrays_Blank.docx")}
              </ul>
            </CollapsibleSection>

            <CollapsibleSection 
              title="Resources" 
              defaultOpen={true}
            >
              <ul className="space-y-3">
                {renderItemWithHighlight("Printing from Netbeans", "/documents/APCS/Resources/NetbeansPrintingGuide.pdf")}
                {renderItemWithHighlight("The Cookbook", "/documents/APCS/Resources/Cookbook.pdf")}
                {renderItemWithHighlight("GUI Survival Guide", "/documents/APCS/Resources/GUISurvivalGuide.pdf")}
              </ul>
            </CollapsibleSection>

            <CollapsibleSection 
              title="Bonus" 
              defaultOpen={true}
            >
              <ul className="space-y-3">
                {renderItemWithHighlight("Base Converter", "/documents/APCS/Bonus/APCS_Bonus_BaseConverter.pdf")}
                {renderItemWithHighlight("BlackJack", "/documents/APCS/Bonus/APCS_Bonus_BlackJack.pdf")}
                {renderItemWithHighlight("Hotel System", "/documents/APCS/Bonus/APCS_Bonus_HotelSystem.pdf")}
                {renderItemWithHighlight("PNZ", "/documents/APCS/Bonus/APCS_Bonus_PNZ.pdf")}
                {renderItemWithHighlight("Risk", "/documents/APCS/Bonus/APCS_Bonus_Risk.pdf")}
                {renderItemWithHighlight("Yahtzee", "/documents/APCS/Bonus/APCS_Bonus_Yahtzee.pdf")}
              </ul>
            </CollapsibleSection>
          </div>

          {/* Watermark */}
          <div className="mt-12 text-center">
            <p className="text-xs text-muted-foreground/50">Created by Hassaan Vani, Class of 2027</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default APCS;
