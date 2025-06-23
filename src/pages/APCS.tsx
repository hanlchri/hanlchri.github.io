
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
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Summer Assignment</a></li>
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">1: Computer Components</a></li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="2: Operations Calculator" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Details</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Run-through</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="3: Castle Stairs" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Details</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Run-through</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">4: Matrix Computer Store</a></li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="5: Reusable Components" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Details</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Tester</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Explosion.wav</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">6: Group Presentations</a></li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="7: Object Oriented Programming" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Details</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Skeleton</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">JUnit Tutorial</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Employee Class Example</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Car Class Example</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Student Class Example</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Planet and Custom Example</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Employee JUnit Class</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Car JUnit Class</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Student JUnit Class</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="8: Additional Class Features" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Details</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Submission Instructions</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Enhanced Car Example</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Enhanced Employee Example</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Enhanced Student Example</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="9: String Methods" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Details</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Skeleton</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="10: 2-Dimensional Arrays" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Details</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">JButton Array Tutorial Part 1</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">JButton Array Tutorial Part 2</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Columnar Encryption Example</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Movie Theater Example Part 1</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Movie Theater Example Part 2</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Ultimate Tic Tac Toe Runthrough</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">11: List Management</a></li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="12: Polymorphism" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Details</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Rectangle Example</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Polygon Vertex Calculator</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">RPG Example</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Polymorphic Quiz Example</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Polymorphic Monopoly Example</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">13: Why Software is So Bad</a></li>
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">14: Stacks</a></li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="15: Recursion" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Details</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Skeleton</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Real World Recursion Example</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">16: Intel Pentium Bug</a></li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="17: Searching and Sorting" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Details</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Skeleton</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="18: Hangman" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Details</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Skeleton</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Turn Based Strategy Game</a></li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Homework">
                  <ul className="list-disc pl-6 space-y-3">
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Pythagorean Triples</a></li>
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Spread out the Stars</a></li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="Array Copying" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Assignment Details</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Skeleton</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Roach Population</a></li>
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Paint BullsEye and Scalable House</a></li>
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Inheritance Hierarchy</a></li>
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Coffee Seller</a></li>
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">ENIAC Essay</a></li>
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Graphics Patterns</a></li>
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
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                    <li>
                      Imports: 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                    <li>
                      Bases: 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                    <li>
                      Round Off Error: 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 2 Math Operations">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Random: 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 3 Primitives/References/Short Circuit">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Objects: 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                    <li>
                      Parameter Passing: 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                    <li>
                      Short Circuit Evals: 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 4 Object Oriented">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      OOP: 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                    <li>
                      OOP Part 2: 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                    <li>
                      Interfaces: 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 5 Strings">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Strings: 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 6 Arrays & ArrayLists">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Arrays: 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                    <li>
                      ArrayLists: 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                    <li>
                      ForEachLoop: 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Midterm Review">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Review: 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 7 File IO">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      File I/O: 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 8 Inheritance & Polymorphism">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Inheritance: 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                    <li>
                      Polymorphism: 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
                    </li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Unit 9 Recursion">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Recursion: 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-2 text-tech-cyan hover:text-tech-purple transition-colors">Blank</a> | 
                      <a href="" target="_blank" rel="noopener noreferrer" className="ml-1 text-tech-cyan hover:text-tech-purple transition-colors">Filled</a>
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
                <h2 className="text-2xl font-bold mb-4 text-tech-cyan">Resources</h2>

                <CollapsibleSection title="Resources">
                  <ul className="list-disc pl-6 space-y-2">
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">The Cookbook</a></li>
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Printing from Netbeans</a></li>
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">GUI Survival Guide</a></li>
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Sound Files</a></li>
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Making round buttons</a></li>
                    <li><a href="" className="text-tech-cyan hover:text-tech-purple transition-colors">References</a></li>
                  </ul>
                </CollapsibleSection>
              </div>
            </TabsContent>

            <TabsContent value="bonuses">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-tech-cyan">Bonuses</h2>

                <CollapsibleSection title="Bonus Projects">
                  <ul className="list-disc pl-6 space-y-3">
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">1st Quarter: Base Converter</a></li>
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">1st Quarter: PNZ</a></li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="3rd Quarter: Black Jack" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Black Jack Description</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Skeleton</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li className="space-y-1">
                      <CollapsibleSection title="Yahtzee" isNested={true}>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Yahtzee Details</a></li>
                          <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Allison Leonard Console Yahtzee</a></li>
                        </ul>
                      </CollapsibleSection>
                    </li>
                    
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Hotel System</a></li>
                    <li><a href="" target="_blank" rel="noopener noreferrer" className="text-tech-cyan hover:text-tech-purple transition-colors">Risk</a></li>
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
