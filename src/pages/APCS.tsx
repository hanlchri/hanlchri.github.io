
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
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 mb-6 bg-secondary">
              <TabsTrigger value="assignments" className="text-sm md:text-base py-2 whitespace-normal h-auto">Assignments</TabsTrigger>
              <TabsTrigger value="lessons" className="text-sm md:text-base py-2 whitespace-normal h-auto">Lessons</TabsTrigger>
              <TabsTrigger value="resources" className="text-sm md:text-base py-2 whitespace-normal h-auto">Resources</TabsTrigger>
              <TabsTrigger value="homework" className="text-sm md:text-base py-2 whitespace-normal h-auto">Homework</TabsTrigger>
            </TabsList>
            
            <TabsContent value="assignments">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-tech-cyan">Assignments</h2>
                
                <CollapsibleSection title="Summer Assignment">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>1: Computer Components</li>
                    <li>2: Operations Calculator</li>
                    <li>3: Castle Stairs</li>
                    <li>4: Matrix Computer Store</li>
                    <li>5: Reusable Components</li>
                  </ul>
                </CollapsibleSection>
                
                <CollapsibleSection title="Advanced Topics">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>6: Group Presentations</li>
                    <li>7: Object Oriented Programming</li>
                    <li>8: Additional Class Features</li>
                    <li>9: String Methods</li>
                    <li>10: 2-Dimensional Arrays</li>
                    <li>11: List Management</li>
                    <li>12: Polymorphism</li>
                    <li>13: Why Software is So Bad</li>
                    <li>14: Stacks</li>
                    <li>15: Recursion</li>
                    <li>16: Intel Pentium Bug</li>
                    <li>17: Searching and Sorting</li>
                    <li>18: Hangman</li>
                  </ul>
                </CollapsibleSection>
              </div>
            </TabsContent>
            
            <TabsContent value="lessons">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-tech-cyan">Lessons</h2>
                
                <CollapsibleSection title="Unit 1 Review">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Review: Blank | Filled</li>
                    <li>Imports: Blank | Filled</li>
                    <li>Bases: Blank | Filled</li>
                    <li>Round Off Error: Blank | Filled</li>
                  </ul>
                </CollapsibleSection>
                
                <CollapsibleSection title="Unit 2 Math Operations">
                  <p>Math Operations: Blank | Filled</p>
                </CollapsibleSection>
                
                <CollapsibleSection title="Unit 3 Primitives/References/Short Circuits">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Objects: Blank | Filled</li>
                    <li>Parameter Passing: Blank | Filled</li>
                    <li>Short Circuit Evals: Blank | Filled</li>
                  </ul>
                </CollapsibleSection>
                
                <CollapsibleSection title="Unit 4 Object Oriented">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>OOP: Blank | Filled</li>
                    <li>OOP Part 2: Blank | Filled</li>
                    <li>Interfaces: Blank | Filled</li>
                  </ul>
                </CollapsibleSection>
                
                <CollapsibleSection title="Unit 5 Strings">
                  <p>Strings: Blank | Filled</p>
                </CollapsibleSection>
                
                <CollapsibleSection title="Unit 6 Arrays & ArrayLists">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Arrays: Blank | Filled</li>
                    <li>ArrayLists: Blank | Filled</li>
                    <li>ForEachLoop Blank | Filled</li>
                  </ul>
                </CollapsibleSection>
                
                <CollapsibleSection title="Midterm Review">
                  <p>Review: Blank | Filled</p>
                </CollapsibleSection>
                
                <CollapsibleSection title="Unit 7 File IO">
                  <p>File I/O: Blank | Filled</p>
                </CollapsibleSection>
                
                <CollapsibleSection title="Unit 8 Inheritance & Polymorphism">
                  <p>Content coming soon</p>
                </CollapsibleSection>
              </div>
            </TabsContent>
            
            <TabsContent value="resources">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-tech-cyan">Resources</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <h3 className="text-xl font-bold mb-3">Helpful Resources</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>The Cookbook</li>
                      <li>Printing from Netbeans</li>
                      <li>GUI Survival Guide</li>
                      <li>Sound Files</li>
                      <li>Making round buttons</li>
                      <li>References</li>
                    </ul>
                  </div>
                  
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <h3 className="text-xl font-bold mb-3">Bonuses</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>1st Quarter: Base Converter</li>
                      <li>1st Quarter: PNZ</li>
                      <li>3rd Quarter: Black Jack Description</li>
                      <li>Skeleton</li>
                      <li>Yahtzee Details</li>
                      <li>Allison Leonard Console Yahtzee</li>
                      <li>Hotel System</li>
                      <li>Risk</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="homework">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-tech-cyan">Homework</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CollapsibleSection title="Assignments">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Pythagorean Triples</li>
                      <li>Spread out the Stars</li>
                      <li>Array Copying</li>
                      <li>Roach Population</li>
                      <li>Paint BullsEye and Sealable House</li>
                      <li>Inheritance Hierarchy</li>
                      <li>Coffee Seller</li>
                      <li>ENIAC Essay</li>
                      <li>Graphics Patterns</li>
                    </ul>
                  </CollapsibleSection>
                  
                  <CollapsibleSection title="Useful Links">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>AP College Board</li>
                      <li>Practice Exams</li>
                      <li>Java Documentation</li>
                      <li>Stack Overflow</li>
                      <li>GitHub Student Developer Pack</li>
                    </ul>
                  </CollapsibleSection>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default APCS;
