import React from 'react';
import Layout from '@/components/Layout';
import CollapsibleSection from '@/components/CollapsibleSection';

const Java = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10">
        <div className="content-section">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center tech-text">Java</h1>
          
          <CollapsibleSection title="Assignments">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <a href="./documents/Java/Assignments/Java_Assignment1_BasicConsoleApplications.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-purple hover:text-tech-cyan transition-colors">
                  Basic Console Applications
                </a>
              </li>
              <li>
                <a href="./documents/Java/Assignments/Java_Assignment2_CurrencyConverter.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-purple hover:text-tech-cyan transition-colors">
                  Currency Converter
                </a>
              </li>
              <li>
                <a href="./documents/Java/Assignments/Java_Assignment2.5_ChangeTwenty.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-purple hover:text-tech-cyan transition-colors">
                  Change Twenty
                </a>
              </li>
              <li>
                <a href="./documents/Java/Assignments/Java_Assignment3_LoopPractice.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-purple hover:text-tech-cyan transition-colors">
                  Loop Practice
                </a>
              </li>
              <li>
                <a href="./documents/Java/Assignments/Java_Assignment4_Budget.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-purple hover:text-tech-cyan transition-colors">
                  Budget Application
                </a>
              </li>
              <li>
                <a href="./documents/Java/Assignments/Java_Assignment4_RackO.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-purple hover:text-tech-cyan transition-colors">
                  RackO Game
                </a>
              </li>
              <li>
                <a href="./documents/Java/Assignments/Java_Assignment4.5_Object_Oriented_Basics.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-purple hover:text-tech-cyan transition-colors">
                  Object Oriented Basics
                </a>
              </li>
              <li>
                <a href="./documents/Java/Assignments/Java_Assignment5_SwingBasics.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-purple hover:text-tech-cyan transition-colors">
                  Swing Basics
                </a>
              </li>
              <li>
                <a href="./documents/Java/Assignments/Java_Assignment6_FinalProject.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-purple hover:text-tech-cyan transition-colors">
                  Final Project
                </a>
              </li>
            </ul>
          </CollapsibleSection>

          <CollapsibleSection title="Lessons">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <a href="./documents/Java/Lessons/Java_Lesson_Arrays_Blank.docx" target="_blank" rel="noopener noreferrer" className="text-tech-purple hover:text-tech-cyan transition-colors">
                  Arrays Lesson
                </a>
              </li>
              <li>
                <a href="./documents/Java/Lessons/Java_Lesson_Looping_Blank.docx" target="_blank" rel="noopener noreferrer" className="text-tech-purple hover:text-tech-cyan transition-colors">
                  Looping Lesson
                </a>
              </li>
              <li>
                <a href="./documents/Java/Lessons/Java_Lesson_MathOperators_Blank.docx" target="_blank" rel="noopener noreferrer" className="text-tech-purple hover:text-tech-cyan transition-colors">
                  Math Operators Lesson
                </a>
              </li>
              <li>
                <a href="./documents/Java/Lessons/Java_Lesson_SelectionStatements_Blank.docx" target="_blank" rel="noopener noreferrer" className="text-tech-purple hover:text-tech-cyan transition-colors">
                  Selection Statements Lesson
                </a>
              </li>
            </ul>
          </CollapsibleSection>

          <CollapsibleSection title="Resources" defaultOpen={true}>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <a href="https://docs.oracle.com/en/java/" target="_blank" rel="noopener noreferrer" className="text-tech-purple hover:text-tech-cyan transition-colors">
                  Official Java Documentation
                </a>
              </li>
              <li>
                <a href="https://www.tutorialspoint.com/java/index.htm" target="_blank" rel="noopener noreferrer" className="text-tech-purple hover:text-tech-cyan transition-colors">
                  Tutorials Point Java Tutorial
                </a>
              </li>
              <li>
                <a href="https://www.geeksforgeeks.org/java/" target="_blank" rel="noopener noreferrer" className="text-tech-purple hover:text-tech-cyan transition-colors">
                  GeeksforGeeks Java
                </a>
              </li>
            </ul>
          </CollapsibleSection>
          
          <CollapsibleSection title="Quizzes">
            <p className="mb-4">
              Test your knowledge with these interactive quizzes.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <a href="https://www.w3schools.com/java/java_quiz.asp" target="_blank" rel="noopener noreferrer" className="text-tech-purple hover:text-tech-cyan transition-colors">
                  W3Schools Java Quiz
                </a>
              </li>
              <li>
                <a href="https://www.tutorialspoint.com/java/java_online_quiz.htm" target="_blank" rel="noopener noreferrer" className="text-tech-purple hover:text-tech-cyan transition-colors">
                  Tutorials Point Java Quiz
                </a>
              </li>
            </ul>
          </CollapsibleSection>

          <CollapsibleSection title="Bonus" defaultOpen={true}>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <a href="https://www.youtube.com/watch?v=GoXwIVyQalq" target="_blank" rel="noopener noreferrer" className="text-tech-purple hover:text-tech-cyan transition-colors">
                  Java Tutorial for Beginners
                </a>
              </li>
              <li>
                <a href="https://www.codecademy.com/learn/learn-java" target="_blank" rel="noopener noreferrer" className="text-tech-purple hover:text-tech-cyan transition-colors">
                  Codecademy Learn Java
                </a>
              </li>
            </ul>
          </CollapsibleSection>

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
