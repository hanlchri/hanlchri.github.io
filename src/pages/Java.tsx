
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import CollapsibleSection from '@/components/CollapsibleSection';

const Java = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center tech-text">Java</h1>
          
          <div className="space-y-6">
            <CollapsibleSection 
              title="Assignments" 
              defaultOpen={openSections.includes('assignments')}
            >
              <ul className="space-y-3">
                {renderItemWithHighlight("1: Basic Console Applications", "/documents/Java/Assignments/Java_Assignment1_BasicConsoleApplications.pdf")}
                {renderItemWithHighlight("2: Currency Converter", "/documents/Java/Assignments/Java_Assignment2_CurrencyConverter.pdf")}
                {renderItemWithHighlight("2.5: Change Calculator", "/documents/Java/Assignments/Java_Assignment2.5_ChangeTwenty.pdf")}
                {renderItemWithHighlight("3: Loops", "/documents/Java/Assignments/Java_Assignment3_LoopPractice.pdf")}
                {renderItemWithHighlight("4: Arrays", "/documents/Java/Assignments/Java_Assignment4_Budget.pdf")}
                {renderItemWithHighlight("4.5: Object Oriented Basics", "/documents/Java/Assignments/Java_Assignment4.5_Object_Oriented_Basics.pdf")}
                {renderItemWithHighlight("6: Final Project", "/documents/Java/Assignments/Java_Assignment6_FinalProject.pdf")}
              </ul>
            </CollapsibleSection>

            <CollapsibleSection 
              title="Homework" 
              defaultOpen={openSections.includes('homework')}
            >
              <ul className="space-y-3">
                {renderItemWithHighlight("Glossary Terms", "/documents/Java/Homework/GlossaryTerms.pdf")}
                {renderItemWithHighlight("Java Loops HW", "/documents/Java/Homework/Java_Loops_HW.pdf")}
              </ul>
            </CollapsibleSection>

            <CollapsibleSection 
              title="Lessons" 
              defaultOpen={openSections.includes('lessons')}
            >
              <ul className="space-y-3">
                {renderItemWithHighlight("Flowcharting Lesson", "/documents/Java/Lessons/Java_Lesson_FlowCharting_Blank.docx")}
                {renderItemWithHighlight("Math Operations", "/documents/Java/Lessons/Java_Lesson_MathOperators_Blank.docx")}
                {renderItemWithHighlight("Looping & Random", "/documents/Java/Lessons/Java_Lesson_Looping_Blank.docx")}
              </ul>
            </CollapsibleSection>

            <CollapsibleSection 
              title="Resources" 
              defaultOpen={true}
            >
              <ul className="space-y-3">
                {renderItemWithHighlight("Textbook Chapters 1 and 2", "/documents/Java/Resources/hi.txt")}
                {renderItemWithHighlight("The Cookbook (Java)", "/documents/Java/Resources/Cookbook.pdf")}
                {renderItemWithHighlight("Guide for Round Buttons", "/documents/Java/Resources/GUISurvivalGuide.pdf")}
              </ul>
            </CollapsibleSection>

            <CollapsibleSection 
              title="Bonus" 
              defaultOpen={true}
            >
              <ul className="space-y-3">
                {renderItemWithHighlight("Coin Flip", "/documents/Java/Bonus/Java_Bonus_CoinFlip.pdf")}
                {renderItemWithHighlight("Fox Goose Grain", "/documents/Java/Bonus/Java_Bonus_FoxGooseGrain.pdf")}
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

export default Java;
