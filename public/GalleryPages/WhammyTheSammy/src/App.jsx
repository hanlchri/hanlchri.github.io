import React, { useState, useEffect } from 'react';
import TitleScreen from './components/TitleScreen';
import WhackGame from './components/WhackGame';
import WalkScene from './components/WalkScene';
import Cutscene from './components/Cutscene';
import Jumpscare from './components/Jumpscare';
import { useAudio } from './hooks/useAudio';

const STATE = {
  TITLE: 0,
  WHACK: 1,
  WALK: 2,
  CUTSCENE: 3,
  END: 4,
  JUMPSCARE: 5
};

export default function App() {
  const [gameState, setGameState] = useState(STATE.TITLE);
  const [mode, setMode] = useState('story'); // 'story' or 'endless'
  const [fade, setFade] = useState(0); // 0 = transparent, 1 = black
  const { unlockAudio } = useAudio();

  // Fade transition helper
  const transitionTo = (newState) => {
    setFade(1);
    setTimeout(() => {
      setGameState(newState);
      setTimeout(() => setFade(0), 100);
    }, 600);
  };

  const handleStart = () => {
    unlockAudio();
    setMode('story');
    transitionTo(STATE.WHACK);
  };

  const handleStartEndless = () => {
    unlockAudio();
    setMode('endless');
    transitionTo(STATE.WHACK);
  };

  const handleWhackTransition = () => {
    if (mode === 'story') {
      transitionTo(STATE.WALK);
    } else {
      // Endless game over
      transitionTo(STATE.TITLE);
    }
  };

  const handleGameOver = (score) => {
    // For endless mode mainly
    alert(`GAME OVER\nSCORE: ${score}`);
    transitionTo(STATE.TITLE);
  };

  return (
    <div className="game-container">
      <div className="game-frame">
        {gameState === STATE.TITLE && (
          <TitleScreen onStart={handleStart} onStartEndless={handleStartEndless} />
        )}
        {gameState === STATE.WHACK && (
          <WhackGame
            mode={mode}
            onTransition={handleWhackTransition}
            onGameOver={handleGameOver}
          />
        )}
        {gameState === STATE.WALK && (
          <WalkScene onTransition={() => transitionTo(STATE.CUTSCENE)} />
        )}
        {gameState === STATE.CUTSCENE && (
          <Cutscene onTransition={() => transitionTo(STATE.END)} />
        )}
        {gameState === STATE.END && (
          <div className="end-screen" onClick={() => transitionTo(STATE.JUMPSCARE)}>
            <p style={{ color: '#e0e0e0' }}>YOU CAN'T WHAMMY THE SAMMY</p>
            <p style={{ color: '#ff004d', fontSize: '10px', marginTop: '10px' }}>CLICK TO CONTINUE</p>
          </div>
        )}
        {gameState === STATE.JUMPSCARE && (
          <Jumpscare onTransition={() => transitionTo(STATE.TITLE)} />
        )}
      </div>

      {/* CRT Overlay */}
      <div className="crt-scanlines"></div>

      {/* Fade Overlay */}
      <div
        className="fade-overlay"
        style={{ opacity: fade, transition: 'opacity 0.6s ease' }}
      ></div>
    </div>
  );
}
