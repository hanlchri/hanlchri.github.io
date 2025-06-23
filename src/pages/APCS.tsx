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
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 mb-6 bg-secondary gap-1 p-1">
              <TabsTrigger value="assignments" className="text-xs sm:text-sm py-2 px-1 sm:px-2 h-auto min-h-[2.5rem]">Assignments</TabsTrigger>
              <TabsTrigger value="lessons" className="text-xs sm:text-sm py-2 px-1 sm:px-2 h-auto min-h-[2.5rem]">Lessons</TabsTrigger>
              <TabsTrigger value="resources" className="text-xs sm:text-sm py-2 px-1 sm:px-2 h-auto min-h-[2.5rem]">Resources</TabsTrigger>
              <TabsTrigger value="bonuses" className="text-xs sm:text-sm py-2 px-1 sm:px-2 h-auto min-h-[2.5rem]">Bonuses</TabsTrigger>
              <TabsTrigger value="homework" className="text-xs sm:text-sm py-2 px-1 sm:px-2 h-auto min-h-[2.5rem]">Homework</TabsTrigger>
            </TabsList>

            <TabsContent value="assignments">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-tech-cyan">Assignments</h2>
                
                <CollapsibleSection title="Assignments">
                  <ul className="list-disc pl-6 space-y-3">
                    <li><a href="/apcs/assigns/APCS_Assignment0_SummerAssignment.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Summer Assignment</a></li>
                    <li><a href="/apcs/assigns/APCS_Assignment1_ComputerComponents.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">1: Computer Components</a></li>
                    
                    <li className="space-y-1">
                      <span className="font-medium">2: Operations Calculator</span>
                      <CollapsibleSection title="Details" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="/apcs/assigns/APCS_Assignment2_Operations Calculator.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Details</a></li>
                          <li><a href="/videos/assignment2-runthrough" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Run-through</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li className="space-y-1">
                      <span className="font-medium">3: Castle Stairs</span>
                      <CollapsibleSection title="Details" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="/apcs/assigns/APCS_Assignment3_CastleStairs.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Details</a></li>
                          <li><a href="/videos/assignment3-runthrough" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Run-through</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li><a href="/apcs/assigns/APCS_Assignment4_ComputerStore.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">4: Matrix Computer Store</a></li>
                    
                    <li className="space-y-1">
                      <span className="font-medium">5: Reusable Components</span>
                      <CollapsibleSection title="Details" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="/apcs/assigns/APCS_Assignment5_DoubleIntVerifier.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Details</a></li>
                          <li><a href="/apcs/resources/Assign5Tester.java" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Tester</a></li>
                          <li><a href="/resources/sounds/Explosion.wav" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Explosion.wav</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li><a href="/apcs/assigns/APCS_Assignment6_GroupPresentations.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">6: Group Presentations</a></li>
                    
                    <li className="space-y-1">
                      <span className="font-medium">7: Object Oriented Programming</span>
                      <CollapsibleSection title="Details" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="/apcs/assigns/APCS_Assignment7_DevelopingClasses.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Details</a></li>
                          <li><a href="/apcs/resources/Assign7Skeleton.java" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Skeleton</a></li>
                          <li><a href="/videos/junit-tutorial" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">JUnit Tutorial</a></li>
                          <li><a href="/videos/employee-class-example" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Employee Class Example</a></li>
                          <li><a href="/videos/car-class-example" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Car Class Example</a></li>
                          <li><a href="/videos/student-class-example" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Student Class Example</a></li>
                          <li><a href="/videos/planet-custom-example" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Planet and Custom Example</a></li>
                          <li><a href="/apcs/resources/Assign7EmployeeTester.java" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Employee JUnit Class</a></li>
                          <li><a href="/apcs/resources/Assign7CarTester.java" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Car JUnit Class</a></li>
                          <li><a href="/apcs/resources/Assign7StudentTester.java" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Student JUnit Class</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li className="space-y-1">
                      <span className="font-medium">8: Additional Class Features</span>
                      <CollapsibleSection title="Details" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="/apcs/assigns/APCS_Assignment8_OOPRound2.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Details</a></li>
                          <li><a href="/apcs/resources/Assign8TurnInInstructions.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Submission Instructions</a></li>
                          <li><a href="/videos/enhanced-car-example" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Enhanced Car Example</a></li>
                          <li><a href="/videos/enhanced-employee-example" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Enhanced Employee Example</a></li>
                          <li><a href="/videos/enhanced-student-example" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Enhanced Student Example</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li className="space-y-1">
                      <span className="font-medium">9: String Methods</span>
                      <CollapsibleSection title="Details" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="/apcs/assigns/APCS_Assignment9_Strings.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Details</a></li>
                          <li><a href="/apcs/resources/Assign9Skeleton.zip" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Skeleton</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li className="space-y-1">
                      <span className="font-medium">10: 2-Dimensional Arrays</span>
                      <CollapsibleSection title="Details" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="/apcs/assigns/APCS_Assignment10_2DArrays.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Details</a></li>
                          <li><a href="/videos/jbutton-array-tutorial-1" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">JButton Array Tutorial Part 1</a></li>
                          <li><a href="/videos/jbutton-array-tutorial-2" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">JButton Array Tutorial Part 2</a></li>
                          <li><a href="/videos/columnar-encryption-example" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Columnar Encryption Example</a></li>
                          <li><a href="/videos/movie-theater-example-1" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Movie Theater Example Part 1</a></li>
                          <li><a href="/videos/movie-theater-example-2" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Movie Theater Example Part 2</a></li>
                          <li><a href="/videos/ultimate-tic-tac-toe-runthrough" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Ultimate Tic Tac Toe Runthrough</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li><a href="/apcs/assigns/APCS_Assignment11_ListManager.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">11: List Management</a></li>
                    
                    <li className="space-y-1">
                      <span className="font-medium">12: Polymorphism</span>
                      <CollapsibleSection title="Details" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="/apcs/assigns/APCS_Assignment12_Polymorphism.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Details</a></li>
                          <li><a href="/apcs/resources/Assign12RectangleExample.zip" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Rectangle Example</a></li>
                          <li><a href="/tools/polygon-vertex-calculator" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Polygon Vertex Calculator</a></li>
                          <li><a href="/videos/rpg-example" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">RPG Example</a></li>
                          <li><a href="/videos/polymorphic-quiz-example" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Polymorphic Quiz Example</a></li>
                          <li><a href="/videos/polymorphic-monopoly-example" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Polymorphic Monopoly Example</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li><a href="/apcs/assigns/APCS_Assignment13_SoftwareEssay.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">13: Why Software is So Bad</a></li>
                    <li><a href="/apcs/assigns/APCS_Assignment14_Stacks.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">14: Stacks</a></li>
                    
                    <li className="space-y-1">
                      <span className="font-medium">15: Recursion</span>
                      <CollapsibleSection title="Details" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="/apcs/assigns/APCS_Assignment15_Recursion.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Details</a></li>
                          <li><a href="/apcs/resources/Assign15RecursionSkeleton.zip" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Skeleton</a></li>
                          <li><a href="/videos/real-world-recursion-example" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Real World Recursion Example</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li><a href="/apcs/assigns/APCS_Assignment16_IntelPentiumBugEssay.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">16: Intel Pentium Bug</a></li>
                    
                    <li className="space-y-1">
                      <span className="font-medium">17: Searching and Sorting</span>
                      <CollapsibleSection title="Details" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="/apcs/assigns/APCS_Assign17_Sorting_and_Searching.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Details</a></li>
                          <li><a href="/apcs/resources/SearchAndSortStatesSkeleton.zip" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Skeleton</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li className="space-y-1">
                      <span className="font-medium">18: Hangman</span>
                      <CollapsibleSection title="Details" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="/apcs/assigns/APCS_Assignment18_Hangman.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Details</a></li>
                          <li><a href="/apcs/resources/Assign18HangmanSkeleton.java" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Skeleton</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li><a href="/apcs/assigns/APCS_Assignment_TurnBasedStrategyGame.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Turn Based Strategy Game</a></li>
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
                      <span className="text-yellow-400 font-medium">Unit 1 Review:</span>
                      <ul className="list-disc pl-6 mt-1 space-y-1">
                        <li>
                          Review: 
                          <a href="/apcs/lessons/Unit 1_Computer_Number_Systems/APCS_Lesson_JavaReview_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                          <a href="/apcs/lessons/Unit 1_Computer_Number_Systems/APCS_Lesson_JavaReview_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                        </li>
                        <li>
                          Imports: 
                          <a href="/apcs/lessons/Unit 1_Computer_Number_Systems/APCS_Lesson_ClassImports_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                          <a href="/apcs/lessons/Unit 1_Computer_Number_Systems/APCS_Lesson_ClassImports_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                        </li>
                        <li>
                          Bases: 
                          <a href="/apcs/lessons/Unit 1_Computer_Number_Systems/APCS_Lesson_AssigningBases_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                          <a href="/apcs/lessons/Unit 1_Computer_Number_Systems/APCS_Lesson_AssigningBases_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                        </li>
                        <li>
                          Round Off Error: 
                          <a href="/apcs/lessons/Unit 1_Computer_Number_Systems/APCS_Lesson_RoundOffError_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                          <a href="/apcs/lessons/Unit 1_Computer_Number_Systems/APCS_Lesson_RoundOffError_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 2 Math Operations">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="text-yellow-400 font-medium">Unit 2 Math Operations:</span>
                      <ul className="list-disc pl-6 mt-1 space-y-1">
                        <li>
                          Random: 
                          <a href="/apcs/lessons/Unit 2_Math_System_Design/APCS_Lesson_Random_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                          <a href="/apcs/lessons/Unit 2_Math_System_Design/APCS_Lesson_Random_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 3 Primitives/References/Short Circuit">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="text-yellow-400 font-medium">Unit 3 Primitives/References/Short Circuit:</span>
                      <ul className="list-disc pl-6 mt-1 space-y-1">
                        <li>
                          Objects: 
                          <a href="/apcs/lessons/Unit 3_Objects_References/APCS_Lesson_Objects_Blank.pptx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                          <a href="/apcs/lessons/Unit 3_Objects_References/APCS_Lesson_Objects_FilledOut.pptx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                        </li>
                        <li>
                          Parameter Passing: 
                          <a href="/apcs/lessons/Unit 3_Objects_References/APCS_Lesson_ParamPassing_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                          <a href="/apcs/lessons/Unit 3_Objects_References/APCS_Lesson_ParamPassing_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                        </li>
                        <li>
                          Short Circuit Evals: 
                          <a href="/apcs/lessons/Unit 5_Strings_ShortCircuit/APCS_Lesson_ShortEval_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                          <a href="/apcs/lessons/Unit 5_Strings_ShortCircuit/APCS_Lesson_ShortEval_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 4 Object Oriented">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="text-yellow-400 font-medium">Unit 4 Object Oriented:</span>
                      <ul className="list-disc pl-6 mt-1 space-y-1">
                        <li>
                          OOP: 
                          <a href="/apcs/lessons/Unit 4_OOP/APCS_Lesson_OOP_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                          <a href="/apcs/lessons/Unit 4_OOP/APCS_Lesson_OOP_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                        </li>
                        <li>
                          OOP Part 2: 
                          <a href="/apcs/lessons/Unit 4_OOP/APCS_Lesson_AdvancedOOP_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                          <a href="/apcs/lessons/Unit 4_OOP/APCS_Lesson_AdvancedOOP_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                        </li>
                        <li>
                          Interfaces: 
                          <a href="/apcs/lessons/Unit 4_OOP/APCS_Lesson_Interfaces_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                          <a href="/apcs/lessons/Unit 4_OOP/APCS_Lesson_Interfaces_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 5 Strings">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="text-yellow-400 font-medium">Unit 5 Strings:</span>
                      <ul className="list-disc pl-6 mt-1 space-y-1">
                        <li>
                          Strings: 
                          <a href="/apcs/lessons/Unit 5_Strings_ShortCircuit/APCS_Lesson_Strings_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                          <a href="/apcs/lessons/Unit 5_Strings_ShortCircuit/APCS_Lesson_Strings_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 6 Arrays & ArrayLists">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="text-yellow-400 font-medium">Unit 6 Arrays & ArrayLists:</span>
                      <ul className="list-disc pl-6 mt-1 space-y-1">
                        <li>
                          Arrays: 
                          <a href="/apcs/lessons/Unit 6_Arrays_ArrayLists/APCS_Lesson_Arrays_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                          <a href="/apcs/lessons/Unit 6_Arrays_ArrayLists/APCS_Lesson_Arrays_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                        </li>
                        <li>
                          ArrayLists: 
                          <a href="/apcs/lessons/Unit 6_Arrays_ArrayLists/APCS_Lesson_ArrayLists_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                          <a href="/apcs/lessons/Unit 6_Arrays_ArrayLists/APCS_Lesson_ArrayLists_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                        </li>
                        <li>
                          ForEachLoop: 
                          <a href="/apcs/lessons/Unit 6_Arrays_ArrayLists/APCS_Lesson_ForEachLoop_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                          <a href="/apcs/lessons/Unit 6_Arrays_ArrayLists/APCS_Lesson_ForEachLoop_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Midterm Review">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="text-yellow-400 font-medium">Midterm Review</span>
                      <ul className="list-disc pl-6 mt-1 space-y-1">
                        <li>
                          Review: 
                          <a href="/apcs/lessons/Midterm Review/APCS_Lesson_MidtermReview_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                          <a href="/apcs/lessons/Midterm Review/APCS_Lesson_MidtermReview_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 7 File IO">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="text-yellow-400 font-medium">Unit 7 File IO:</span>
                      <ul className="list-disc pl-6 mt-1 space-y-1">
                        <li>
                          File I/O: 
                          <a href="/apcs/lessons/Unit 7_Files_IO/APCS_Lesson_FilesIO_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                          <a href="/apcs/lessons/Unit 7_Files_IO/APCS_Lesson_FilesIO_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 8 Inheritance & Polymorphism">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="text-yellow-400 font-medium">Unit 8 Inheritance & Polymorphism:</span>
                      <ul className="list-disc pl-6 mt-1 space-y-1">
                        <li>
                          Inheritance: 
                          <a href="/apcs/lessons/Unit 8_Inheritance_Polymorphism/APCS_Lesson_Inheritance_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                          <a href="/apcs/lessons/Unit 8_Inheritance_Polymorphism/APCS_Lesson_Inheritance_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                        </li>
                        <li>
                          Polymorphism: 
                          <a href="/apcs/lessons/Unit 8_Inheritance_Polymorphism/APCS_Lesson_Polymorphism.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                          <a href="/apcs/lessons/Unit 8_Inheritance_Polymorphism/APCS_Lesson_Polymorphism_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 9 Recursion">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="text-yellow-400 font-medium">Unit 9 Recursion:</span>
                      <ul className="list-disc pl-6 mt-1 space-y-1">
                        <li>
                          Recursion: 
                          <a href="/apcs/lessons/Unit 9_Recursion/APCS_Lesson_Recursion_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                          <a href="/apcs/lessons/Unit 9_Recursion/APCS_Lesson_Recursion_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 10 Stacks">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="text-yellow-400 font-medium">Unit 10 Stacks:</span>
                      <ul className="list-disc pl-6 mt-1 space-y-1">
                        <li>
                          Stacks: 
                          <a href="/apcs/lessons/Unit 9_Recursion/APCS_Lesson_Stacks_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                          <a href="/apcs/lessons/Unit 9_Recursion/APCS_Lesson_Stacks_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 12 Searching and Sorting">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="text-yellow-400 font-medium">Unit 12 Searching and Sorting:</span>
                      <ul className="list-disc pl-6 mt-1 space-y-1">
                        <li>
                          Searching and Sorting: 
                          <a href="/apcs/lessons/Unit 12_Searching_Sorting/APCS_Lesson_SearchSort_Blank.docx" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                          <a href="/apcs/lessons/Unit 12_Searching_Sorting/APCS_Lesson_SearchSort_FilledOut.docx" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </CollapsibleSection>
              </div>
            </TabsContent>

            <TabsContent value="resources">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-tech-cyan">Resources</h2>

                <CollapsibleSection title="Resources">
                  <ul className="list-disc pl-6 space-y-2">
                    <li><a href="/resources/Cookbook.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">The Cookbook</a></li>
                    <li><a href="/resources/NetbeansPrintingGuide.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Printing from Netbeans</a></li>
                    <li><a href="/resources/GUISurvivalGuide.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">GUI Survival Guide</a></li>
                    <li><a href="/resources/sounds/" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Sound Files</a></li>
                    <li><a href="/resources/JTattoo-1.6.13.jar" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Making round buttons</a></li>
                    <li><a href="/references" className="text-tech-cyan hover:text-tech-purple transition-colors">References</a></li>
                  </ul>
                </CollapsibleSection>
              </div>
            </TabsContent>

            <TabsContent value="bonuses">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-tech-cyan">Bonuses</h2>

                <CollapsibleSection title="Bonus Projects">
                  <ul className="list-disc pl-6 space-y-3">
                    <li><a href="/apcs/bonuses/APCS_Bonus_BaseConverter.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">1st Quarter: Base Converter</a></li>
                    <li><a href="/apcs/bonuses/APCS_Bonus_PNZ.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">1st Quarter: PNZ</a></li>
                    
                    <li className="space-y-1">
                      <span className="font-medium">3rd Quarter: Black Jack</span>
                      <CollapsibleSection title="Details" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="/apcs/bonuses/APCS_Bonus_BlackJack.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Black Jack Description</a></li>
                          <li><a href="/apcs/resources/BlackJackSkeletonLISTPROJECT.zip" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Skeleton</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li className="space-y-1">
                      <span className="font-medium">Yahtzee</span>
                      <CollapsibleSection title="Details" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="/apcs/bonuses/APCS_Bonus_Yahtzee.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Yahtzee Details</a></li>
                          <li><a href="/videos/allison-leonard-console-yahtzee" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Allison Leonard Console Yahtzee</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li><a href="/apcs/bonuses/APCS_Bonus_HotelSystem.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Hotel System</a></li>
                    <li><a href="/apcs/bonuses/APCS_Bonus_Risk.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Risk</a></li>
                  </ul>
                </CollapsibleSection>
              </div>
            </TabsContent>

            <TabsContent value="homework">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-tech-cyan">Homework</h2>

                <CollapsibleSection title="Homework Assignments">
                  <ul className="list-disc pl-6 space-y-3">
                    <li><a href="/apcs/homeworks/APCS_Homework_PythagoreanTriples.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Pythagorean Triples</a></li>
                    <li><a href="/apcs/homeworks/APCS_Homework_SpreadStars.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Spread out the Stars</a></li>
                    
                    <li className="space-y-1">
                      <span className="font-medium">Array Copying</span>
                      <CollapsibleSection title="Details" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="/apcs/homeworks/APCS_Homework_ArrayCopying.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Details</a></li>
                          <li><a href="/apcs/resources/ArrayPractice_Copying_Skeleton.java" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Skeleton</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li><a href="/apcs/homeworks/APCS_Homework_RoachPopulation.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Roach Population</a></li>
                    <li><a href="/apcs/homeworks/APCS_Homework_PaintBullsEyeHouse.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Paint BullsEye and Scalable House</a></li>
                    <li><a href="/apcs/homeworks/APCS_Homework_InheritanceHierarchy.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Inheritance Hierarchy</a></li>
                    <li><a href="/apcs/homeworks/APCSHomework_Coffee_SellerV2.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Coffee Seller</a></li>
                    <li><a href="/apcs/homeworks/APCS_Homework_ENIAC.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">ENIAC Essay</a></li>
                    <li><a href="/apcs/homeworks/APCS_Homework_Graphics_Patterns.pdf" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Graphics Patterns</a></li>
                  </ul>
                </CollapsibleSection>
              </div>
            </TabsContent>
          </Tabs>

          {/* Watermark */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground/50">Created by Ishan Swali, Class of 2023</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default APCS;
