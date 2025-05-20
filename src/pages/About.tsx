import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import Layout from '@/components/Layout';

const About = () => {
  // State to hold the randomly selected image source
  const [randomHanleyImageSrc, setRandomHanleyImageSrc] = useState('');

  useEffect(() => {
    // Array of possible Hanley image filenames
    // Ensure these files are located in base/public/pictures/
    const hanleyImageNames = [
      'Hanley2.jpeg',
      'Hanley3.jpeg',
      'Hanley4.jpeg',
      'Hanley5.jpeg',
      'Hanley6.jpeg',
    ];

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * hanleyImageNames.length);

    // Get the random image filename
    const selectedImageName = hanleyImageNames[randomIndex];

    // Construct the full public path to the image
    setRandomHanleyImageSrc(`/pictures/${selectedImageName}`);
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10">
        <div className="content-section backdrop-blur-sm bg-black/50 border border-purple-500/20">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            About Chris Hanley
          </h1>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              {/* Conditionally render the image once the source is set */}
              {randomHanleyImageSrc && (
                <img
                  src={randomHanleyImageSrc}
                  alt="Chris Hanley - Random Portrait" // Updated alt text for clarity
                  className="rounded-lg border-2 border-tech-purple/30 shadow-lg shadow-tech-purple/20 w-full max-w-md mx-auto"
                />
              )}
            </div>

            <div className="md:w-1/2">
              <p className="text-lg mb-4 font-sans">
                Mr. Chris Hanley is a Java, AP Computer Science, and Digital Electronics teacher
                at Shenendehowa High School. He has taught at Shen for 25 years.
              </p>

              <p className="text-lg mb-4 font-sans">
                He attended Gordon College and majored in Math and Computer Science.
              </p>

              <p className="text-lg font-sans">
                Mr. Hanley enjoys playing tennis, Smash Ultimate, and Minecraft.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
