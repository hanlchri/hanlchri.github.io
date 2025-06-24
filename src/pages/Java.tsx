
import React from 'react';
import Layout from '@/components/Layout';
import CollapsibleSection from '@/components/CollapsibleSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Java = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <div className="content-section">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center" style={{ color: '#FF8C42' }}>Java</h1>

          <Tabs defaultValue="assignments" className="w-full">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 mb-6 bg-secondary gap-1 p-1">
              <TabsTrigger value="assignments" className="text-xs sm:text-sm py-2 px-1 sm:px-2 h-auto min-h-[2.5rem]">Assignments</TabsTrigger>
              <TabsTrigger value="lessons" className="text-xs sm:text-sm py-2 px-1 sm:px-2 h-auto min-h-[2.5rem]">Lessons</TabsTrigger>
              <TabsTrigger value="resources" className="text-xs sm:text-sm py-2 px-1 sm:px-2 h-auto min-h-[2.5rem]">Resources</TabsTrigger>
              <TabsTrigger value="Bonus" className="text-xs sm:text-sm py-2 px-1 sm:px-2 h-auto min-h-[2.5rem]">Bonus</TabsTrigger>
            </TabsList>

            <TabsContent value="assignments">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#FF8C42' }}>Assignments</h2>

                <CollapsibleSection title="Assignments" titleColor="#FF8C42">
                  <ul className="list-disc pl-6 space-y-3">
                    <li><a href="/documents/Java/Assignments/Java_Assignment1_BasicConsoleApplications.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>1: Basic Console Applications</a></li>
                    <li><a href="/documents/Java/Assignments/Java_Assignment2_CurrencyConverter.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>2: Currency Converter</a></li>
                    <li>
                      <CollapsibleSection title="2.5: Change Calculator" isNested={true} titleColor="#FF8C42">
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="/documents/Java/Assignments/Java_Assignment2.5_ChangeTwenty.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Details</a></li>
                          <li><a href="/documents/Java/Assignments/Assign2In.txt" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Sample Input</a></li>
                          <li><a href="/documents/Java/Assignments/Assign2Out.txt" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Sample Output</a></li>
                          <li><a href="/documents/Java/Assignments/Assign2Test1.txt" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Test 1</a></li>
                          <li><a href="/documents/Java/Assignments/Assign2Test2.txt" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Test 2</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    <li>
                      <CollapsibleSection title="3: Loops" isNested={true} titleColor="#FF8C42">
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="/documents/Java/Assignments/Java_Assignment3_LoopPractice.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Details</a></li>
                          <li><a href="/documents/Java/Assignments/Assign3FreqFrameSolution.java" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Frequency Frame</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    <li>
                      <CollapsibleSection title="4: Arrays" isNested={true} titleColor="#FF8C42">
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="/documents/Java/Assignments/Java_Assignment4_Budget.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Budget</a></li>
                          <li><a href="/documents/Java/Assignments/Java_Assignment4_RackO.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>RackO</a></li>
                          <li><a href="/documents/Java/Assignments/Assign4BudgetExample (1).jar" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Budget Example</a></li>
                          <li><a href="/documents/Java/Assignments/Assign4RackOSkeleton.java" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>RackO Skeleton</a></li>
                          <li><a href="/documents/Java/Assignments/Assign4ArrayPowerpoint.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Arrays PDF</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    <li>
                      <CollapsibleSection title="4.5: Object Oriented Basics" isNested={true} titleColor="#FF8C42">
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="/documents/Java/Assignments/Java_Assignment4.5_Object_Oriented_Basics.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Assignment</a></li>
                          <li><a href="/documents/Java/Assignments/Assign4.5Student.java" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Student.java</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    <li><a href="/documents/Java/Assignments/Java_Assignment5_SwingBasics.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>5: Swing Basics</a></li>
                    <li>
                      <CollapsibleSection title="6: Final Project" isNested={true} titleColor="#FF8C42">
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="/documents/Java/Assignments/Java_Assignment6_FinalProject.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Assignment</a></li>
                          <li><a href="/documents/Java/Assignments/Assign6BlackJackSkeleton.zip" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Blackjack Skeleton</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Homework" titleColor="#FF8C42">
                  <ul className="list-disc pl-6 space-y-2">
                    <li><a href="/documents/Java/Homework/GlossaryTerms.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Glossary Terms</a></li>
                    <li><a href="/documents/Java/Homework/LogicalOperatorsHW.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Logical Operators</a></li>
                    <li><a href="/documents/Java/Homework/Java_Loops_HW.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Loops</a></li>
                    <li><a href="/documents/Java/Homework/JavaHWArrays.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Arrays</a></li>
                  </ul>
                </CollapsibleSection>
              </div>
            </TabsContent>

            <TabsContent value="lessons">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#FF8C42' }}>Lessons</h2>

                <CollapsibleSection title="Unit 1 Review" titleColor="#FF8C42">
                  <ul className="list-disc pl-6 space-y-1">
                    <li><a href="/documents/Java/Lessons/FlowchartTaxCalculator.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Flowchart for Tax Calculator</a></li>
                    <li><a href="/documents/Java/Lessons/TaxCalc.java" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>TaxCalc</a></li>
                    <li>
                      Flowcharting Lesson:
                      <a href="/documents/Java/Lessons/FlowchartingLesson_Blank.pdf" target="_blank" rel="noopener noreferrer" className="ml-2 hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Blank</a> |
                      <a href="/documents/Java/Lessons/FlowchartingLesson_Filled.pdf" target="_blank" rel="noopener noreferrer" className="ml-1 hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Filled</a>
                    </li>
                    <li><a href="/documents/Java/Lessons/TeachJava.java" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>TeachJava</a></li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 2 Data and Variables" titleColor="#FF8C42">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Math Operations:
                      <a href="/documents/Java/Lessons/MathOperations_Blank.pdf" target="_blank" rel="noopener noreferrer" className="ml-2 hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Blank</a> |
                      <a href="/documents/Java/Lessons/MathOperations_Filled.pdf" target="_blank" rel="noopener noreferrer" className="ml-1 hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Filled</a>
                    </li>
                    <li>
                      Data Modeling:
                      <a href="/documents/Java/Lessons/DataModeling_Blank.pdf" target="_blank" rel="noopener noreferrer" className="ml-2 hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Blank</a> |
                      <a href="/documents/Java/Lessons/DataModeling_Filled.pdf" target="_blank" rel="noopener noreferrer" className="ml-1 hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Filled</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 3 Selection Statements" titleColor="#FF8C42">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Selection Statements:
                      <a href="/documents/Java/Lessons/SelectionStatements_Blank.pdf" target="_blank" rel="noopener noreferrer" className="ml-2 hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Blank</a> |
                      <a href="/documents/Java/Lessons/SelectionStatements_Filled.pdf" target="_blank" rel="noopener noreferrer" className="ml-1 hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Filled</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 4 Looping & Random" titleColor="#FF8C42">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Looping:
                      <a href="/documents/Java/Lessons/Looping_Blank.pdf" target="_blank" rel="noopener noreferrer" className="ml-2 hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Blank</a> |
                      <a href="/documents/Java/Lessons/Looping_Filled.pdf" target="_blank" rel="noopener noreferrer" className="ml-1 hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Filled</a>
                    </li>
                    <li>
                      Random:
                      <a href="/documents/Java/Lessons/Random_Blank.pdf" target="_blank" rel="noopener noreferrer" className="ml-2 hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Blank</a> |
                      <a href="/documents/Java/Lessons/Random_Filled.pdf" target="_blank" rel="noopener noreferrer" className="ml-1 hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Filled</a> |
                      <a href="/documents/Java/Lessons/RandExamples.java" target="_blank" rel="noopener noreferrer" className="ml-1 hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>RandExamples.java</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 5 Scope" titleColor="#FF8C42">
                  <p className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>
                    Scope:
                    <a href="/documents/Java/Lessons/Scope_Blank.pdf" target="_blank" rel="noopener noreferrer" className="ml-2 hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Blank</a> |
                    <a href="/documents/Java/Lessons/Scope_Filled.pdf" target="_blank" rel="noopener noreferrer" className="ml-1 hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Filled</a>
                  </p>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 6 Arrays" titleColor="#FF8C42">
                  <p className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>
                    Arrays:
                    <a href="/documents/Java/Lessons/Arrays_Blank.pdf" target="_blank" rel="noopener noreferrer" className="ml-2 hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Blank</a> |
                    <a href="/documents/Java/Lessons/Arrays_Filled.pdf" target="_blank" rel="noopener noreferrer" className="ml-1 hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Filled</a>
                  </p>
                </CollapsibleSection>

                <CollapsibleSection title="Final Review" titleColor="#FF8C42">
                  <p className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>
                    Final Exam:
                    <a href="/documents/Java/Lessons/FinalExam_Review.pdf" target="_blank" rel="noopener noreferrer" className="ml-2 hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Review</a> |
                    <a href="/documents/Java/Lessons/FinalExam_Powerpoint.pptx" target="_blank" rel="noopener noreferrer" className="ml-1 hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Powerpoint</a>
                  </p>
                </CollapsibleSection>
              </div>
            </TabsContent>

            <TabsContent value="resources">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#FF8C42' }}>Resources</h2>

                <CollapsibleSection title="Resources" titleColor="#FF8C42">
                  <ul className="list-disc pl-6 space-y-1">
                    <li><a href="/documents/Java/Resources/TextbookChapters1_2.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Textbook Chapters 1 and 2</a></li>
                    <li><a href="/documents/Java/Resources/TheCookbook.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>The Cookbook</a></li>
                    <li><a href="/documents/Java/Resources/PrintingFromNetbeans.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Printing from Netbeans</a></li>
                    <li><a href="/documents/Java/Resources/GUISurvivalGuide.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>GUI Survival Guide</a></li>
                    <li><a href="/documents/Java/Resources/GuideForRoundButtons.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Guide for Round Buttons</a></li>
                    <li>
                      <CollapsibleSection title="Sounds" isNested={true} titleColor="#FF8C42">
                        <ul className="list-disc pl-6 space-y-1">
                          <li><a href="/documents/Java/Resources/Ring10.wav" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Ring10.wav</a></li>
                          <li><a href="/documents/Java/Resources/chimes.wav" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>chimes.wav</a></li>
                          <li><a href="/documents/Java/Resources/drumroll.wav" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>drumroll.wav</a></li>
                          <li><a href="/documents/Java/Resources/fanfare.wav" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>fanfare.wav</a></li>
                          <li><a href="/documents/Java/Resources/vibe.wav" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>vibe.wav</a></li>
                          <li><a href="/documents/Java/Resources/Wind.wav" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Wind.wav</a></li>
                          <li><a href="/documents/Java/Resources/Explosion.wav" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Explosion.wav</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                  </ul>
                </CollapsibleSection>
              </div>
            </TabsContent>

            <TabsContent value="Bonus">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#FF8C42' }}>Bonus</h2>

                <CollapsibleSection title="Resources" titleColor="#FF8C42">
                  <ul className="list-disc pl-6 space-y-1">
                    <li><a href="/documents/Java/Bonus/Java_Bonus_CoinFlip.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Coinflip Problem</a></li>
                    <li><a href="/documents/Java/Bonus/Java_Bonus_FoxGooseGrain.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" style={{ color: '#FF8C42' }}>Fox Goose Grain Problem</a></li>
                  </ul>
                </CollapsibleSection>
              </div>
            </TabsContent>
          </Tabs>

          {/* Discrete watermark */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground/50">Created by Hassaan Vani, Class of 2027</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Java;
