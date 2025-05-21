
import React, { useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import { useLocation } from 'react-router-dom';

const References = () => {
  const location = useLocation();
  const websitesRef = useRef<HTMLDivElement>(null);
  const videosRef = useRef<HTMLDivElement>(null);
  const practiceRef = useRef<HTMLDivElement>(null);
  const idesRef = useRef<HTMLDivElement>(null);

  // Handle scrolling to specific section based on URL parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get('section');
    
    if (section) {
      let targetRef = null;
      
      switch (section) {
        case 'websites':
          targetRef = websitesRef;
          break;
        case 'videos':
          targetRef = videosRef;
          break;
        case 'practice':
          targetRef = practiceRef;
          break;
        case 'ides':
          targetRef = idesRef;
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
      <div className="max-w-4xl mx-auto mt-10">
        <div className="content-section">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center tech-text">References</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div id="websites" ref={websitesRef} className="bg-card p-6 rounded-lg transition-all duration-500">
              <h2 className="text-3xl font-bold mb-4 text-tech-cyan">Websites</h2>
              <ul className="space-y-3">
                <li className="border-b border-border pb-2">
                  <a href="https://www.w3schools.com/java/" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-tech-purple transition-colors">
                    W3Schools
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <a href="https://www.sololearn.com/learn/java" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-tech-purple transition-colors">
                    SoloLearn
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <a href="https://www.programiz.com/java-programming" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-tech-purple transition-colors">
                    Programiz
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <a href="https://www.codecademy.com/learn/learn-java" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-tech-purple transition-colors">
                    Code Academy
                  </a>
                </li>
              </ul>
            </div>
            
            <div id="videos" ref={videosRef} className="bg-card p-6 rounded-lg transition-all duration-500">
              <h2 className="text-3xl font-bold mb-4 text-tech-purple">Videos</h2>
              <ul className="space-y-3">
                <li className="border-b border-border pb-2">
                  <span className="text-lg">
                  <a href="https://www.youtube.com/channel/UCQ-KjZ-dBpmaEoXp-1JyF3Q?pbjreload=102" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-tech-purple transition-colors">
                    Mr. Hanley
                  </a>
                  </span>
                </li>
                <li className="border-b border-border pb-2">
                  <a href="https://www.youtube.com/watch?v=eIrMbAQSU34" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-tech-purple transition-colors">
                    APCS in 60 Minutes
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <span className="text-lg">
                    <a href="https://www.youtube.com/watch?v=FHdU8zpnIY4&list=PLoGgviqq4845xKOY11PnkE7aqJC7-bYrd" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-tech-purple transition-colors">
                    AP Review 2020
                  </a>
                  </span>
                </li>
                <li className="border-b border-border pb-2">
                  <span className="text-lg">
                    <a href="https://www.youtube.com/user/CalebTheVideoMaker2" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-tech-purple transition-colors">
                    Caleb Curry
                  </a>
                  </span>
                </li>
                <li className="border-b border-border pb-2">
                  <a href="https://www.youtube.com/channel/UC_fFL5jgoCOrwAVoM_fBYwA" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-tech-purple transition-colors">
                    Alex Lee Java
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <span className="text-lg">
                    <a href="https://www.youtube.com/channel/UCJbPGzawDH1njbqV-D5HqKw?pbjreload=102" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-tech-purple transition-colors">
                    TheNewBoston
                  </a>
                  </span>
                </li>
              </ul>
            </div>
            
            <div id="practice" ref={practiceRef} className="bg-card p-6 rounded-lg transition-all duration-500">
              <h2 className="text-3xl font-bold mb-4 text-tech-cyan">Practice</h2>
              <ul className="space-y-3">
                <li className="border-b border-border pb-2">
                  <a href="https://www.hackerrank.com/domains/java" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-tech-purple transition-colors">
                    HackerRank
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <a href="https://codingbat.com/java" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-tech-purple transition-colors">
                    CodingBat
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <a href="https://www.codechef.com/problems/school/" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-tech-purple transition-colors">
                    CodeChef
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <a href="https://www.codewars.com/kata/search/java" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-tech-purple transition-colors">
                    CodeWars
                  </a>
                </li>
              </ul>
            </div>
            
            <div id="ides" ref={idesRef} className="bg-card p-6 rounded-lg transition-all duration-500">
              <h2 className="text-3xl font-bold mb-4 text-tech-purple">IDEs</h2>
              <ul className="space-y-3">
                <li className="border-b border-border pb-2">
                  <a href="https://replit.com/languages/java10" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-tech-purple transition-colors">
                    Repl.it
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <a href="https://www.python.org/shell/" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-tech-purple transition-colors">
                    Python Tutor
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <a href="https://ideone.com/" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-tech-purple transition-colors">
                    IDE One
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <a href="https://www.codechef.com/ide" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-tech-purple transition-colors">
                    CodeChef IDE
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <a href="https://www.codiva.io/" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-tech-purple transition-colors">
                    Codiva.io
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <span className="text-lg">
                    <a href="https://rextester.com/l/java_online_compiler" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-tech-purple transition-colors">
                    RexTester
                  </a>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Add some CSS for the highlight effect */}
          <style jsx>{`
            .highlight-section {
              box-shadow: 0 0 15px 3px rgba(124, 58, 237, 0.7);
              transform: scale(1.02);
            }
          `}</style>
        </div>
      </div>
    </Layout>
  );
};

export default References;
