import React from 'react';
import Layout from '@/components/Layout';
import CollapsibleSection from '@/components/CollapsibleSection';
// Assuming you have Tabs and TabsList components from a UI library like shadcn/ui
// If not, you'll need to import them or replace them with your actual tab components.
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Java = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-10">
        <div className="content-section">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center tech-text">Java</h1>

          <Tabs defaultValue="assignments" className="w-full">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 mb-6 bg-secondary">
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="Bonus">Bonus</TabsTrigger>
            </TabsList>

            <TabsContent value="assignments">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-tech-cyan">Assignments</h2>

                <CollapsibleSection title="Assignments">
                  <ul className="list-disc pl-6 space-y-1">
                    <li><a href="/documents/Java_Assignment1_BasicConsoleApplications.pdf" target="_blank" rel="noopener noreferrer">1: Basic Console Applications</a></li>
                    <li><a href="/documents/Java_Assignment2_CurrencyConverter.pdf" target="_blank" rel="noopener noreferrer">2: Currency Converter</a></li>
                    <li>
                      2.5: Change Calculator
                      {/* Nested dropdown for Change Calculator */}
                      <CollapsibleSection title="Details">
                        <ul className="list-disc pl-6 space-y-1">
                          <li><a href="/documents/Java_Assignment2.5_ChangeTwenty.pdf" target="_blank" rel="noopener noreferrer">Details</a></li>
                          <li><a href="/documents/Assign2In.txt" target="_blank" rel="noopener noreferrer">Sample Input</a></li>
                          <li><a href="/documents/Assign2Out.txt" target="_blank" rel="noopener noreferrer">Sample Output</a></li>
                          <li><a href="/documents/Assign2Test1.txt" target="_blank" rel="noopener noreferrer">Test 1</a></li>
                          <li><a href="/documents/Assign2Test2.txt" target="_blank" rel="noopener noreferrer">Test 2</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    <li>
                      3: Loops
                      {/* Nested dropdown for Loops */}
                      <CollapsibleSection title="Details">
                        <ul className="list-disc pl-6 space-y-1">
                          <li><a href="/documents/Java_Assignment3_LoopPractice.pdf" target="_blank" rel="noopener noreferrer">Details</a></li>
                          <li><a href="/documents/Assign3FreqFrameSolution.java" target="_blank" rel="noopener noreferrer">Frequency Frame</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    <li>
                      4: Arrays
                      {/* Nested dropdown for Arrays */}
                      <CollapsibleSection title="Details">
                        <ul className="list-disc pl-6 space-y-1">
                          <li><a href="/documents/Java_Assignment4_Budget.pdf" target="_blank" rel="noopener noreferrer">Budget</a></li>
                          <li><a href="/documents/Java_Assignment4_RackO.pdf" target="_blank" rel="noopener noreferrer">RackO</a></li>
                          <li><a href="/documents/Assign4BudgetExample.jar" target="_blank" rel="noopener noreferrer">Budget Example</a></li>
                          <li><a href="/documents/Assign4RackOSkeleton.java" target="_blank" rel="noopener noreferrer">RackO Skeleton</a></li>
                          <li><a href="/documents/Assign4ArrayPowerpoint.pdf" target="_blank" rel="noopener noreferrer">Arrays PDF</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    <li>
                      4.5: Object Oriented Basics
                      {/* Nested dropdown for Object Oriented Basics */}
                      <CollapsibleSection title="Details">
                        <ul className="list-disc pl-6 space-y-1">
                          <li><a href="/documents/Java_Assignment4.5_Object_Oriented_Basics.pdf" target="_blank" rel="noopener noreferrer">Assignment</a></li>
                          <li><a href="/documents/Assign4.5Student.java" target="_blank" rel="noopener noreferrer">Student.java</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    <li><a href="/documents/Java_Assignment5_SwingBasics.pdf" target="_blank" rel="noopener noreferrer">5: Swing Basics</a></li>
                    <li>
                      6: Final Project
                      {/* Nested dropdown for Final Project */}
                      <CollapsibleSection title="Details">
                        <ul className="list-disc pl-6 space-y-1">
                          <li><a href="/documents/Java_Assignment6_FinalProject.pdf" target="_blank" rel="noopener noreferrer">Assignment</a></li>
                          <li><a href="/documents/Assign6BlackJackSkeleton.zip" target="_blank" rel="noopener noreferrer">Blackjack Skeleton</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Homework">
                  <ul className="list-disc pl-6 space-y-1">
                    <li><a href="/documents/GlossaryTerms.pdf" target="_blank" rel="noopener noreferrer">Glossary Terms</a></li>
                    <li><a href="/documents/LogicalOperatorsHW.pdf" target="_blank" rel="noopener noreferrer">Logical Operators HW</a></li>
                    <li><a href="/documents/Java_Loops_HW.pdf" target="_blank" rel="noopener noreferrer">Loops HW</a></li>
                    <li><a href="/documents/JavaHWArrays.pdf" target="_blank" rel="noopener noreferrer">Arrays HW</a></li>
                  </ul>
                </CollapsibleSection>
              </div>
            </TabsContent>

            <TabsContent value="lessons">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-tech-cyan">Lessons</h2>

                <CollapsibleSection title="Unit 1 Review">
                  <ul className="list-disc pl-6 space-y-1">
                    <li><a href="/documents/FlowchartTaxCalculator.pdf" target="_blank" rel="noopener noreferrer">Flowchart for Tax Calculator</a></li>
                    <li><a href="/documents/TaxCalc.java" target="_blank" rel="noopener noreferrer">TaxCalc</a></li>
                    <li>
                      Flowcharting Lesson:
                      <a href="/documents/FlowchartingLesson_Blank.pdf" target="_blank" rel="noopener noreferrer" className="ml-2">Blank</a> |
                      <a href="/documents/FlowchartingLesson_Filled.pdf" target="_blank" rel="noopener noreferrer" className="ml-1">Filled</a>
                    </li>
                    <li><a href="/documents/TeachJava.java" target="_blank" rel="noopener noreferrer">TeachJava</a></li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 2 Data and Variables">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Math Operations:
                      <a href="/documents/MathOperations_Blank.pdf" target="_blank" rel="noopener noreferrer" className="ml-2">Blank</a> |
                      <a href="/documents/MathOperations_Filled.pdf" target="_blank" rel="noopener noreferrer" className="ml-1">Filled</a>
                    </li>
                    <li>
                      Data Modeling:
                      <a href="/documents/DataModeling_Blank.pdf" target="_blank" rel="noopener noreferrer" className="ml-2">Blank</a> |
                      <a href="/documents/DataModeling_Filled.pdf" target="_blank" rel="noopener noreferrer" className="ml-1">Filled</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 3 Selection Statements">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Selection Statements:
                      <a href="/documents/SelectionStatements_Blank.pdf" target="_blank" rel="noopener noreferrer" className="ml-2">Blank</a> |
                      <a href="/documents/SelectionStatements_Filled.pdf" target="_blank" rel="noopener noreferrer" className="ml-1">Filled</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 4 Looping & Random">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Looping:
                      <a href="/documents/Looping_Blank.pdf" target="_blank" rel="noopener noreferrer" className="ml-2">Blank</a> |
                      <a href="/documents/Looping_Filled.pdf" target="_blank" rel="noopener noreferrer" className="ml-1">Filled</a>
                    </li>
                    <li>
                      Random:
                      <a href="/documents/Random_Blank.pdf" target="_blank" rel="noopener noreferrer" className="ml-2">Blank</a> |
                      <a href="/documents/Random_Filled.pdf" target="_blank" rel="noopener noreferrer" className="ml-1">Filled</a> |
                      <a href="/documents/RandExamples.java" target="_blank" rel="noopener noreferrer" className="ml-1">RandExamples.java</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 5 Scope">
                  <p>
                    Scope:
                    <a href="/documents/Scope_Blank.pdf" target="_blank" rel="noopener noreferrer" className="ml-2">Blank</a> |
                    <a href="/documents/Scope_Filled.pdf" target="_blank" rel="noopener noreferrer" className="ml-1">Filled</a>
                  </p>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 6 Arrays">
                  <p>
                    Arrays:
                    <a href="/documents/Arrays_Blank.pdf" target="_blank" rel="noopener noreferrer" className="ml-2">Blank</a> |
                    <a href="/documents/Arrays_Filled.pdf" target="_blank" rel="noopener noreferrer" className="ml-1">Filled</a>
                  </p>
                </CollapsibleSection>

                <CollapsibleSection title="Final Review">
                  <p>
                    Final Exam:
                    <a href="/documents/FinalExam_Review.pdf" target="_blank" rel="noopener noreferrer" className="ml-2">Review</a> |
                    <a href="/documents/FinalExam_Powerpoint.pptx" target="_blank" rel="noopener noreferrer" className="ml-1">Powerpoint</a>
                  </p>
                </CollapsibleSection>
              </div>
            </TabsContent>

            <TabsContent value="resources">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-tech-cyan">Resources</h2>

                <CollapsibleSection title="Resources">
                  <ul className="list-disc pl-6 space-y-1">
                    <li><a href="/documents/TextbookChapters1_2.pdf" target="_blank" rel="noopener noreferrer">Textbook Chapters 1 and 2</a></li>
                    <li><a href="/documents/TheCookbook.pdf" target="_blank" rel="noopener noreferrer">The Cookbook</a></li>
                    <li><a href="/documents/PrintingFromNetbeans.pdf" target="_blank" rel="noopener noreferrer">Printing from Netbeans</a></li>
                    <li><a href="/documents/GUISurvivalGuide.pdf" target="_blank" rel="noopener noreferrer">GUI Survival Guide</a></li>
                    <li><a href="/documents/GuideForRoundButtons.pdf" target="_blank" rel="noopener noreferrer">Guide for Round Buttons</a></li>
                    <li>
                      Sounds
                      {/* Nested dropdown for Sounds */}
                      <CollapsibleSection title="Sound Files">
                        <ul className="list-disc pl-6 space-y-1">
                          <li><a href="/sounds/Ring10.wav" target="_blank" rel="noopener noreferrer">Ring10.wav</a></li>
                          <li><a href="/sounds/chimes.wav" target="_blank" rel="noopener noreferrer">chimes.wav</a></li>
                          <li><a href="/sounds/drumroll.wav" target="_blank" rel="noopener noreferrer">drumroll.wav</a></li>
                          <li><a href="/sounds/fanfare.wav" target="_blank" rel="noopener noreferrer">fanfare.wav</a></li>
                          <li><a href="/sounds/vibe.wav" target="_blank" rel="noopener noreferrer">vibe.wav</a></li>
                          <li><a href="/sounds/Wind.wav" target="_blank" rel="noopener noreferrer">Wind.wav</a></li>
                          <li><a href="/sounds/Explosion.wav" target="_blank" rel="noopener noreferrer">Explosion.wav</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                  </ul>
                </CollapsibleSection>
              </div>
            </TabsContent>

            <TabsContent value="Bonus">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-tech-cyan">Bonus</h2>

                <CollapsibleSection title="Resources">
                  <ul className="list-disc pl-6 space-y-1">
                    <li><a href="/documents/CoinflipProblem.pdf" target="_blank" rel="noopener noreferrer">Coinflip Problem</a></li>
                    <li><a href="/documents/FoxGooseGrainProblem.pdf" target="_blank" rel="noopener noreferrer">Fox Goose Grain Problem</a></li>
                  </ul>
                </CollapsibleSection>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Java;
