
import React from 'react';
import Layout from '@/components/Layout';
import CollapsibleSection from '@/components/CollapsibleSection';

const References = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10 px-4">
        <div className="content-section">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center tech-text">
            References
          </h1>
          
          <div className="space-y-6">
            <CollapsibleSection title="Research Papers & Citations">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  This section contains academic references and research papers that have influenced the curriculum design and teaching methodologies used in our computer science courses.
                </p>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-tech-cyan">Object-Oriented Programming Education</h3>
                    <p className="text-sm text-muted-foreground">
                      Research on effective methods for teaching OOP concepts to introductory programming students.
                    </p>
                  </div>
                  
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-tech-cyan">Computational Thinking Framework</h3>
                    <p className="text-sm text-muted-foreground">
                      Studies on developing problem-solving skills through computational thinking approaches.
                    </p>
                  </div>
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Educational Standards">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Our curriculum aligns with established educational standards and best practices in computer science education.
                </p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>College Board AP Computer Science A Curriculum Framework</li>
                  <li>CSTA K-12 Computer Science Standards</li>
                  <li>ACM Computing Curricula Guidelines</li>
                  <li>IEEE Computer Society Curriculum Guidelines</li>
                </ul>
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Technical Documentation">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Official documentation and resources used throughout the course.
                </p>
                
                <div className="grid gap-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Oracle Java Documentation</span>
                    <span className="text-xs text-muted-foreground">Official Reference</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Java Language Specification</span>
                    <span className="text-xs text-muted-foreground">Language Standards</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>OpenJDK Documentation</span>
                    <span className="text-xs text-muted-foreground">Implementation Guide</span>
                  </div>
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Pedagogical Resources">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Teaching methodologies and educational approaches that inform our instruction methods.
                </p>
                
                <div className="space-y-3">
                  <div className="border-l-4 border-tech-cyan pl-4">
                    <h4 className="font-medium">Active Learning Strategies</h4>
                    <p className="text-sm text-muted-foreground">
                      Hands-on programming exercises and collaborative problem-solving approaches.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-tech-purple pl-4">
                    <h4 className="font-medium">Project-Based Learning</h4>
                    <p className="text-sm text-muted-foreground">
                      Real-world application development to reinforce theoretical concepts.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-tech-cyan pl-4">
                    <h4 className="font-medium">Scaffolded Instruction</h4>
                    <p className="text-sm text-muted-foreground">
                      Progressive complexity building from basic syntax to advanced algorithms.
                    </p>
                  </div>
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Attribution & Acknowledgments">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  We acknowledge the contributions of educators, researchers, and organizations that have shaped computer science education.
                </p>
                
                <div className="bg-card border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Special Thanks</h4>
                  <p className="text-sm text-muted-foreground">
                    To the computer science education community for their continued research and development 
                    of effective teaching methodologies and curriculum frameworks.
                  </p>
                </div>
              </div>
            </CollapsibleSection>
          </div>

          {/* Discrete watermark */}
          <div className="mt-12 text-center">
            <p className="text-xs text-muted-foreground/50">Created by Hassaan Vani, Class of 2027</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default References;
