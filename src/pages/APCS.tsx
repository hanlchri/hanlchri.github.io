
import React from 'react';
import Layout from '@/components/Layout';
import CollapsibleSection from '@/components/CollapsibleSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const APCS = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <div className="content-section">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center tech-text">AP Computer Science</h1>

          <Tabs defaultValue="assignments" className="w-full">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="bonuses">Bonuses</TabsTrigger>
            </TabsList>

            <TabsContent value="assignments">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-tech-cyan">Assignments</h2>
                
                <CollapsibleSection title="Assignments">
                  <ul className="list-disc pl-6 space-y-3">
                    <li><a href="/documents/APCS/Assignments/APCS_Assignment0_SummerAssignment.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Summer Assignment</a></li>
                    <li><a href="/documents/APCS/Assignments/APCS_Assignment1_ComputerComponents.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">1: Computer Components</a></li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="2: Operations Calculator" isNested={true}>
                         <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li><a href="/documents/APCS/Assignments/APCS_Assignment2_Operations Calculator.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Details</a></li>
                          <li><a href="https://youtu.be/Hrn66uHLPSE" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Run-through</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="3: Castle Stairs" isNested={true}>
                         <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li><a href="/documents/APCS/Assignments/APCS_Assignment3_CastleStairs.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Details</a></li>
                          <li><a href="https://www.youtube.com/watch?v=g-OvJcWdtD0" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Run-through</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li><a href="/documents/APCS/Assignments/APCS_Assignment4_ComputerStore.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">4: Matrix Computer Store</a></li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="5: Reusable Components" isNested={true}>
                         <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li><a href="/documents/APCS/Assignments/APCS_Assignment5_DoubleIntVerifier.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Details</a></li>
                          <li><a href="/documents/APCS/Assignments/Assign5Tester.java" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Tester</a></li>
                          <li><a href="/documents/APCS/Resources/SoundFile.wav" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Explosion.wav</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li><a href="/documents/APCS/Assignments/APCS_Assignment6_GroupPresentations.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">6: Group Presentations</a></li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="7: Object Oriented Programming" isNested={true}>
                         <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li><a href="/documents/APCS/Assignments/APCS_Assignment7_DevelopingClasses.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Details</a></li>
                          <li><a href="/documents/APCS/Assignments/Assign7Skeleton.java" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Skeleton</a></li>
                          <li><a href="https://www.youtube.com/watch?v=DDjtNVQKhtU" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">JUnit Tutorial</a></li>
                          <li><a href="https://www.youtube.com/watch?v=qHiSuJ1_qSw" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Employee Class Example</a></li>
                          <li><a href="https://www.youtube.com/watch?v=GJ1AArWb0Rk&feature=youtu.be" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Car Class Example</a></li>
                          <li><a href="https://www.youtube.com/watch?v=z3nQZNykhbM" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Student Class Example</a></li>
                          <li><a href="https://youtu.be/sZHRQtxX_eg" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Planet and Custom Example</a></li>
                          <li><a href="/documents/APCS/Assignments/Assign7EmployeeTester.java" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Employee JUnit Class</a></li>
                          <li><a href="/documents/APCS/Assignments/Assign7CarTester.java" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Car JUnit Class</a></li>
                          <li><a href="/documents/APCS/Assignments/Assign7StudentTester.java" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Student JUnit Class</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="8: Additional Class Features" isNested={true}>
                         <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li><a href="/documents/APCS/Assignments/APCS_Assignment8_OOPRound2.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Details</a></li>
                          <li><a href="/documents/APCS/Assignments/Assign8TurnInInstructions.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Submission Instructions</a></li>
                          <li><a href="https://www.youtube.com/watch?v=SFOemS0RQUE&feature=youtu.be" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Enhanced Car Example</a></li>
                          <li><a href="https://www.youtube.com/watch?v=eIat0PdJlCg&feature=youtu.be" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Enhanced Employee Example</a></li>
                          <li><a href="https://www.youtube.com/watch?v=aq2GNhIIybs" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Enhanced Student Example</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="9: String Methods" isNested={true}>
                         <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li><a href="/documents/APCS/Assignments/APCS_Assignment9_Strings.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Details</a></li>
                          <li><a href="/documents/APCS/Assignments/Assign9Skeleton.zip" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Skeleton</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="10: 2-Dimensional Arrays" isNested={true}>
                         <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li><a href="/documents/APCS/Assignments/APCS_Assignment10_2DArrays.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Details</a></li>
                          <li><a href="https://www.youtube.com/watch?v=Os1lAvj8LBc" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">JButton Array Tutorial Part 1</a></li>
                          <li><a href="https://www.youtube.com/watch?v=VlmyTOvvuJc" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">JButton Array Tutorial Part 2</a></li>
                          <li><a href="https://www.youtube.com/watch?v=uQ0IXyrM1ik" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Columnar Encryption Example</a></li>
                          <li><a href="https://www.youtube.com/watch?v=Tv6gvUb0Zng" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Movie Theater Example Part 1</a></li>
                          <li><a href="https://www.youtube.com/watch?v=nOtVKMf68N4" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Movie Theater Example Part 2</a></li>
                          <li><a href="https://youtu.be/egLMDLCXRPc" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Ultimate Tic Tac Toe Runthrough</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li><a href="/documents/APCS/Assignments/APCS_Assignment11_ListManager.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">11: List Management</a></li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="12: Polymorphism" isNested={true}>
                         <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li><a href="/documents/APCS/Assignments/APCS_Assignment12_Polymorphism.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Details</a></li>
                          <li><a href="/documents/APCS/Assignments/Assign12RectangleExample.zip" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Rectangle Example</a></li>
                          <li><a href="https://www.mathopenref.com/coordpolycalc.html" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Polygon Vertex Calculator</a></li>
                          <li><a href="https://www.youtube.com/watch?v=9YxET5GfAR4" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">RPG Example</a></li>
                          <li><a href="https://youtu.be/EkteizHrSDA" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Polymorphic Quiz Example</a></li>
                          <li><a href="https://youtu.be/UQEKyFCv6-0" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Polymorphic Monopoly Example</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li><a href="/documents/APCS/Assignments/APCS_Assignment13_SoftwareEssay.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">13: Why Software is So Bad</a></li>
                    <li><a href="/documents/APCS/Assignments/APCS_Assignment14_Stacks.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">14: Stacks</a></li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="15: Recursion" isNested={true}>
                         <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li><a href="/documents/APCS/Assignments/APCS_Assignment15_Recursion.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Details</a></li>
                          <li><a href="/documents/APCS/Assignments/Assign15RecursionSkeleton.zip" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Skeleton</a></li>
                          <li><a href="https://www.youtube.com/watch?v=ahXIMUkSXX0" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Real World Recursion Example</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li><a href="/documents/APCS/Assignments/APCS_Assignment16_IntelPentiumBugEssay.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">16: Intel Pentium Bug</a></li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="17: Searching and Sorting" isNested={true}>
                         <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li><a href="/documents/APCS/Assignments/APCS_Assign17_Sorting_and_Searching.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Details</a></li>
                          <li><a href="/documents/APCS/Assignments/SearchAndSortStatesSkeleton.zip" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Skeleton</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="18: Hangman" isNested={true}>
                         <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li><a href="/documents/APCS/Assignments/APCS_Assignment18_Hangman.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Details</a></li>
                          <li><a href="/documents/APCS/Assignments/Assign18HangmanSkeleton.java" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Skeleton</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li><a href="/documents/APCS/Assignments/APCS_Assignment_TurnBasedStrategyGame.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Turn Based Strategy Game</a></li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Homework">
                  <ul className="list-disc pl-6 space-y-3">
                    <li><a href="/documents/APCS/Homework/APCS_Homework_PythagoreanTriples.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Pythagorean Triples</a></li>
                    <li><a href="/documents/APCS/Homework/APCS_Homework_SpreadStars.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Spread out the Stars</a></li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="Array Copying" isNested={true}>
                         <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li><a href="/documents/APCS/Homework/APCS_Homework_ArrayCopying.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Details</a></li>
                          <li><a href="/documents/APCS/Homework/ArrayPractice_Copying_Skeleton.java" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Skeleton</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li><a href="/documents/APCS/Homework/APCS_Homework_RoachPopulation.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Roach Population</a></li>
                    <li><a href="/documents/APCS/Homework/APCS_Homework_PaintBullsEyeHouse.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Paint BullsEye and Scalable House</a></li>
                    <li><a href="/documents/APCS/Homework/APCS_Homework_InheritanceHierarchy.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Inheritance Hierarchy</a></li>
                    <li><a href="/documents/APCS/Homework/APCSHomework_Coffee_SellerV2.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Coffee Seller</a></li>
                    <li><a href="/documents/APCS/Homework/APCS_Homework_ENIAC.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">ENIAC Essay</a></li>
                    <li><a href="/documents/APCS/Homework/APCS_Homework_Graphics_Patterns.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Graphics Patterns</a></li>
                  </ul>
                </CollapsibleSection>
              </div>
            </TabsContent>

            <TabsContent value="lessons">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-tech-cyan">Lessons</h2>
                
                <CollapsibleSection title="Unit 1 Review">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Review: 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_JavaReview_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_JavaReview_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                    <li>
                      Imports: 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_ClassImports_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_ClassImports_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                    <li>
                      Bases: 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_AssigningBases_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_AssigningBases_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                    <li>
                      Round Off Error: 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_RoundOffError_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_RoundOffError_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 2 Math Operations">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Random: 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_Random_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_Random_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 3 Primitives/References/Short Circuit">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Objects: 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_Objects_Blank.pptx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_Objects_FilledOut.pptx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                    <li>
                      Parameter Passing: 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_ParamPassing_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_ParamPassing_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                    <li>
                      Short Circuit Evals: 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_ShortEval_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_ShortEval_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 4 Object Oriented">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      OOP: 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_OOP_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_OOP_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                    <li>
                      OOP Part 2: 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_AdvancedOOP_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_AdvancedOOP_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                    <li>
                      Interfaces: 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_Interfaces_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_Interfaces_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 5 Strings">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Strings: 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_Strings_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_Strings_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 6 Arrays & ArrayLists">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Arrays: 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_Arrays_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_Arrays_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                    <li>
                      ArrayLists: 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_ArrayLists_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_ArrayLists_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                    <li>
                      ForEachLoop: 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_ForEachLoop_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_ForEachLoop_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Midterm Review">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Review: 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_MidtermReview_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_MidtermReview_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 7 File IO">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      File I/O: 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_FilesIO_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_FilesIO_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 8 Inheritance & Polymorphism">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Inheritance: 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_Inheritance_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_Inheritance_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                    <li>
                      Polymorphism: 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_Polymorphism_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 9 Recursion">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Recursion: 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_Recursion_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="/documents/APCS/Lessons/APCS_Lesson_Recursion_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 10 Stacks">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Stacks: 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 12 Searching and Sorting">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Searching and Sorting: 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                  </ul>
                </CollapsibleSection>
              </div>
            </TabsContent>

            <TabsContent value="resources">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-tech-cyan" >Resources</h2>

                <CollapsibleSection title="Resources" defaultOpen={true}>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><a href="/documents/APCS/Resources/Cookbook.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">The Cookbook</a></li>
                    <li><a href="/documents/APCS/Resources/NetbeansPrintingGuide.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Printing from Netbeans</a></li>
                    <li><a href="/documents/APCS/Resources/GUISurvivalGuide.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">GUI Survival Guide</a></li>
                    <li><a href="/documents/APCS/Resources/SoundFile.wav" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Sound File</a></li>
                    <li><a href="/documents/APCS/Resources/JTattoo-1.6.13.jar" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Making round buttons</a></li>
                  </ul>
                </CollapsibleSection>
              </div>
            </TabsContent>

            <TabsContent value="bonuses">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-tech-cyan">Bonuses</h2>

                <CollapsibleSection title="Bonus Projects" defaultOpen={true}>
                  <ul className="list-disc pl-6 space-y-3">
                    <li><a href="/documents/APCS/Bonus/APCS_Bonus_BaseConverter.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">1st Quarter: Base Converter</a></li>
                    <li><a href="/documents/APCS/Bonus/APCS_Bonus_PNZ.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">1st Quarter: PNZ</a></li>
                    <li><a href="/documents/APCS/Bonus/APCS_Bonus_HotelSystem.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">2nd Quarter: Hotel System</a></li>
                    <li className="space-y-1">
                      <CollapsibleSection title="3rd Quarter: Black Jack" isNested={true}>
                         <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li><a href="/documents/APCS/Bonus/APCS_Bonus_BlackJack.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Black Jack Description</a></li>
                          <li><a href="/documents/APCS/Bonus/BlackJackSkeletonLISTPROJECT.zip" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Skeleton</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="Yahtzee" isNested={true}>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li><a href="/documents/APCS/Bonus/APCS_Bonus_Yahtzee.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Yahtzee Details</a></li>
                          <li><a href="https://www.youtube.com/watch?v=wI1d5-HAERQ&t=8s" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Allison Leonard Console Yahtzee</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    <li><a href="/documents/APCS/Bonus/APCS_Bonus_Risk.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Risk</a></li>
                  </ul>
                </CollapsibleSection>
              </div>
            </TabsContent>
          </Tabs>

          {/* Watermark */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground/50">Created by Hassaan Vani, Class of 2027</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default APCS;
