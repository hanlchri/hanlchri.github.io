
import React from 'react';
import Layout from '@/components/Layout';
import CollapsibleSection from '@/components/CollapsibleSection';

const Java = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10">
        <div className="content-section">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center tech-text">Java</h1>
          
          <div className="space-y-8">
            <CollapsibleSection title="Course Overview" defaultOpen={true}>
              <p className="mb-4">
                The Java course covers fundamental programming concepts using the Java language.
                Students learn about variables, control structures, methods, object-oriented programming,
                and more through hands-on coding exercises and projects.
              </p>
              <p>
                This course is designed to prepare students for AP Computer Science A and
                to develop essential programming skills useful in further education and careers.
              </p>
            </CollapsibleSection>

            <CollapsibleSection title="Course Materials">
              <ul className="list-disc pl-6 space-y-2">
                <li>Introduction to Java Programming</li>
                <li>Basic Control Structures</li>
                <li>Methods and Parameters</li>
                <li>Object-Oriented Programming Concepts</li>
                <li>Arrays and ArrayLists</li>
                <li>Inheritance and Polymorphism</li>
              </ul>
            </CollapsibleSection>
            
            <CollapsibleSection title="Tools and Resources">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-tech-cyan/20 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">Websites</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>W3Schools</li>
                    <li>SoloLearn</li>
                    <li>Programiz</li>
                    <li>Code Academy</li>
                  </ul>
                </div>
                
                <div className="p-4 border border-tech-purple/20 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">Practice</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>HackerRank</li>
                    <li>CodingBat</li>
                    <li>CodeChef</li>
                    <li>CodeWars</li>
                  </ul>
                </div>
                
                <div className="p-4 border border-tech-purple/20 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">IDEs</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Repl.it</li>
                    <li>IDE One</li>
                    <li>CodeChef IDE</li>
                    <li>Codiva.io</li>
                  </ul>
                </div>
                
                <div className="p-4 border border-tech-cyan/20 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">Videos</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Mr. Hanley</li>
                    <li>Alex Lee Java</li>
                    <li>TheNewBoston</li>
                  </ul>
                </div>
              </div>
            </CollapsibleSection>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Java;
