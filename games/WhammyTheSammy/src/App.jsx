import React, { useState } from 'react';
import TitleScreen from './components/TitleScreen';
import WhackGame from './components/WhackGame';
import WalkScene from './components/WalkScene';
import Cutscene from './components/Cutscene';
import Jumpscare from './components/Jumpscare';
import EndScreen from './components/EndScreen';
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
  const [mode, setMode] = useState('story');
  const [fade, setFade] = useState(0);
  const audio = useAudio();

  const transitionTo = (newState) => {
    setFade(1);
    setTimeout(() => {
      setGameState(newState);
      setTimeout(() => setFade(0), 100);
    }, 600);
  };

  const handleStart = () => {
    audio.unlockAudio();
    setMode('story');
    transitionTo(STATE.WHACK);
  };

  const handleStartEndless = () => {
    audio.unlockAudio();
    setMode('endless');
    transitionTo(STATE.WHACK);
  };

  const handleWhackTransition = () => {
    if (mode === 'story') {
      transitionTo(STATE.WALK);
    } else {
      transitionTo(STATE.TITLE);
    }
  };

  const handleGameOver = (score) => {
    transitionTo(STATE.TITLE);
  };

  return (
    <div className="game-container">
      <div className="game-frame">
        {gameState === STATE.TITLE && (
          <TitleScreen onStart={handleStart} onStartEndless={handleStartEndless} />
        )}
        {gameState === STATE.WHACK && (
          <WhackGame mode={mode} onTransition={handleWhackTransition} onGameOver={handleGameOver} audio={audio} />
        )}
        {gameState === STATE.WALK && (
          <WalkScene onTransition={() => transitionTo(STATE.CUTSCENE)} audio={audio} />
        )}
        {gameState === STATE.CUTSCENE && (
          <Cutscene onTransition={() => transitionTo(STATE.END)} audio={audio} />
        )}
        {gameState === STATE.END && (
          <EndScreen onTransition={() => transitionTo(STATE.JUMPSCARE)} audio={audio} />
        )}
        {gameState === STATE.JUMPSCARE && (
          <Jumpscare onTransition={() => transitionTo(STATE.TITLE)} audio={audio} />
        )}
      </div>
      <div className="crt-scanlines" />
      <div className="crt-flicker" />
      <div className="fade-overlay" style={{ opacity: fade, transition: 'opacity 0.6s ease' }} />
    </div>
  );
}
