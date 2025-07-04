
import React from 'react';
import Layout from '@/components/Layout';
import CollapsibleSection from '@/components/CollapsibleSection';

const References = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10">
        <div className="content-section">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center references-text">References</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-references-accent">Websites</h2>
              <ul className="space-y-3">
                <li className="border-b border-border pb-2">
                  <a href="https://www.w3schools.com/java/" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-references-secondary transition-colors">
                    W3Schools
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <a href="https://www.sololearn.com/learn/java" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-references-secondary transition-colors">
                    SoloLearn
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <a href="https://www.programiz.com/java-programming" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-references-secondary transition-colors">
                    Programiz
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <a href="https://www.codecademy.com/learn/learn-java" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-references-secondary transition-colors">
                    Code Academy
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="bg-card p-6 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-references-secondary">Videos</h2>
              <ul className="space-y-3">
                <li className="border-b border-border pb-2">
                  <span className="text-lg">
                  <a href="https://www.youtube.com/channel/UCQ-KjZ-dBpmaEoXp-1JyF3Q?pbjreload=102" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-references-secondary transition-colors">
                    Mr. Hanley
                  </a>
                  </span>
                </li>
                <li className="border-b border-border pb-2">
                  <a href="https://www.youtube.com/watch?v=eIrMbAQSU34" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-references-secondary transition-colors">
                    APCS in 60 Minutes
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <span className="text-lg">
                    <a href="https://www.youtube.com/watch?v=FHdU8zpnIY4&list=PLoGgviqq4845xKOY11PnkE7aqJC7-bYrd" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-references-secondary transition-colors">
                    AP Review 2020
                  </a>
                  </span>
                </li>
                <li className="border-b border-border pb-2">
                  <span className="text-lg">
                    <a href="https://www.youtube.com/user/CalebTheVideoMaker2" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-references-secondary transition-colors">
                    Caleb Curry
                  </a>
                  </span>
                </li>
                <li className="border-b border-border pb-2">
                  <a href="https://www.youtube.com/channel/UC_fFL5jgoCOrwAVoM_fBYwA" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-references-secondary transition-colors">
                    Alex Lee Java
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <span className="text-lg">
                    <a href="https://www.youtube.com/channel/UCJbPGzawDH1njbqV-D5HqKw?pbjreload=102" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-references-secondary transition-colors">
                    TheNewBoston
                  </a>
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card p-6 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-references-accent">Practice</h2>
              <ul className="space-y-3">
                <li className="border-b border-border pb-2">
                  <a href="https://www.hackerrank.com/domains/java" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-references-secondary transition-colors">
                    HackerRank
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <a href="https://codingbat.com/java" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-references-secondary transition-colors">
                    CodingBat
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <a href="https://www.codechef.com/problems/school/" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-references-secondary transition-colors">
                    CodeChef
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <a href="https://www.codewars.com/kata/search/java" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-references-secondary transition-colors">
                    CodeWars
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="bg-card p-6 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-references-secondary">IDEs</h2>
              <ul className="space-y-3">
                <li className="border-b border-border pb-2">
                  <a href="https://replit.com/languages/java10" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-references-secondary transition-colors">
                    Repl.it
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <a href="https://www.python.org/shell/" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-references-secondary transition-colors">
                    Python Tutor
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <a href="https://ideone.com/" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-references-secondary transition-colors">
                    IDE One
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <a href="https://www.codechef.com/ide" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-references-secondary transition-colors">
                    CodeChef IDE
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <a href="https://www.codiva.io/" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-references-secondary transition-colors">
                    Codiva.io
                  </a>
                </li>
                <li className="border-b border-border pb-2">
                  <span className="text-lg">
                    <a href="https://rextester.com/l/java_online_compiler" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-references-secondary transition-colors">
                    RexTester
                  </a>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Watermark */}
          <div className="mt-12 text-center">
            <p className="text-xs text-muted-foreground/50">Created by Hassaan Vani, Class of 2027</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default References;
