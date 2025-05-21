import React, { useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import CollapsibleSection from '@/components/CollapsibleSection';
import { useLocation } from 'react-router-dom';

const Java = () => {
  const location = useLocation();
  const variablesRef = useRef<HTMLDivElement>(null);
  const arraysRef = useRef<HTMLDivElement>(null);
  const controlFlowRef = useRef<HTMLDivElement>(null);
  const methodsRef = useRef<HTMLDivElement>(null);

  // Handle scrolling to specific section based on URL parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get('section');
    
    if (section) {
      let targetRef = null;
      
      switch (section) {
        case 'variables':
          targetRef = variablesRef;
          break;
        case 'arrays':
          targetRef = arraysRef;
          break;
        case 'control-flow':
          targetRef = controlFlowRef;
          break;
        case 'methods':
          targetRef = methodsRef;
          break;
        default:
          break;
      }
      
      if (targetRef && targetRef.current) {
        // Add a small delay to ensure the DOM is fully rendered
        setTimeout(() => {
          targetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
          // Add highlight effect
          targetRef.current?.classList.add('highlight-section');
          
          // Remove highlight after animation completes
          setTimeout(() => {
            targetRef.current?.classList.remove('highlight-section');
          }, 2000);
        }, 300);
      }
    }
  }, [location.search]);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-10">
        <div className="content-section">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center tech-text">Java Programming</h1>
          
          <div className="space-y-12">
            {/* Variables Section */}
            <div ref={variablesRef} className="transition-all duration-500">
              <CollapsibleSection title="Variables & Data Types">
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Primitives:</strong> 
                    <code>int</code>, <code>float</code>, <code>double</code>, <code>boolean</code>, <code>char</code>
                  </li>
                  <li>
                    <strong>Objects:</strong> Instances of classes (e.g., <code>String</code>, <code>ArrayList</code>)
                  </li>
                  <li>
                    <strong>Declaration:</strong> 
                    <code>dataType variableName = value;</code>
                  </li>
                  <li>
                    <strong>Initialization:</strong> Assigning a value to a variable
                  </li>
                  <li>
                    <strong>Scope:</strong> Where a variable is accessible in the code
                  </li>
                </ul>
              </CollapsibleSection>
            </div>
            
            {/* Arrays Section */}
            <div ref={arraysRef} className="transition-all duration-500">
              <CollapsibleSection title="Arrays & Collections">
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Arrays:</strong> Fixed-size, ordered collections of elements of the same type
                  </li>
                  <li>
                    <strong>ArrayLists:</strong> Dynamically-sized, ordered collections of objects
                  </li>
                  <li>
                    <strong>Declaration:</strong> 
                    <code>dataType[] arrayName = new dataType[size];</code>
                  </li>
                  <li>
                    <strong>Accessing Elements:</strong> Using index numbers (starting from 0)
                  </li>
                  <li>
                    <strong>Common Operations:</strong> Adding, removing, and iterating through elements
                  </li>
                </ul>
              </CollapsibleSection>
            </div>
            
            {/* Control Flow Section */}
            <div ref={controlFlowRef} className="transition-all duration-500">
              <CollapsibleSection title="Control Flow">
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>If Statements:</strong> Executing code based on a condition
                  </li>
                  <li>
                    <strong>Loops:</strong> Repeating a block of code multiple times (<code>for</code>, <code>while</code>, <code>do-while</code>)
                  </li>
                  <li>
                    <strong>Switch Statements:</strong> Selecting one of several code blocks to execute
                  </li>
                  <li>
                    <strong>Break & Continue:</strong> Altering the flow of loops
                  </li>
                </ul>
              </CollapsibleSection>
            </div>
            
            {/* Methods Section */}
            <div ref={methodsRef} className="transition-all duration-500">
              <CollapsibleSection title="Methods & Functions">
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Declaration:</strong> 
                    <code>returnType methodName(parameterList) { /* code */ }</code>
                  </li>
                  <li>
                    <strong>Parameters:</strong> Input values passed to a method
                  </li>
                  <li>
                    <strong>Return Type:</strong> The type of value returned by the method
                  </li>
                  <li>
                    <strong>Calling Methods:</strong> Executing a method by its name
                  </li>
                  <li>
                    <strong>Overloading:</strong> Defining multiple methods with the same name but different parameters
                  </li>
                </ul>
              </CollapsibleSection>
            </div>
          </div>
          
          {/* Add some CSS for the highlight effect */}
          <style jsx>{`
            .highlight-section {
              box-shadow: 0 0 15px 3px rgba(124, 58, 237, 0.7);
              transform: scale(1.005);
            }
          `}</style>
        </div>
      </div>
    </Layout>
  );
};

export default Java;
